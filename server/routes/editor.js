const express = require('express');
const Sequelize = require('sequelize');
const _ = require('lodash');

const getQuestionCategories = require('../helpers/util').getQuestionCategories;
const transformQuestionProps = require('../helpers/util').transformQuestionProps;
const transformPassageProps = require('../helpers/util').transformPassageProps;
const models = require('../../models');

const router = express.Router();

router.route('/questions/:section').get(function (req, res) {
  models.questions.findAll({
    attributes: ['id', 'topic', 'subject', 'subcategory', 'is_published'],
    include: [{
      model: models.question_revisions,
      attributes: ['question_id', 'answer', 'short_explanation', 'long_explanation', 'prompt'],
      include: [{
        model: models.answers,
        as: 'answers',
        attributes: ['answer']
      }],
    }],
    order: [
      [ models.question_revisions, 'created', 'DESC' ],
      [ models.question_revisions, models.answers, 'ordering', 'DESC' ]
    ],
    where: {
      subject: [req.params.section],
      passage_id: null
    },
  }).then(function (questions) {
    const filteredQuestions = _.map(questions, function(question){
      return transformQuestionProps(question);
    });
    res.send({ questions: filteredQuestions });
  })
});

router.route('/question/:questionId').get(function (req, res) {
  const questions = models.questions.findOne({
    attributes: ['topic', 'subject', 'subcategory', 'is_published', 'id', 'passage_id'],
    include: [{
      model: models.question_revisions,
      attributes: ['created', 'question_id', 'answer', 'short_explanation', 'long_explanation', 'prompt'],
      include: [{
        model: models.answers,
        as: 'answers',
        attributes: ['answer']
      }]
    }],
    order: [
      [models.question_revisions, 'created', 'DESC'],
      [models.question_revisions, models.answers, 'ordering', 'DESC']
    ],
    where: {
      id: req.params.questionId,
    }
  }).then(function (question) {
    const filteredQuestion = transformQuestionProps(question);
    res.send({ question: filteredQuestion });
  })
});

router.route('/question/:questionId').put(function (req, res) {
  const props = parseBodyProps(req.body);
  props.question_revision.question_id = req.params.questionId;
  const questions = models.questions.update(props.question, { where: { id: req.params.questionId }})
    .then(function (question) {
      addRevisionAndAnswers(props, res);
  });
});

router.route('/question').post(function (req, res) {
  const props = parseBodyProps(req.body);
  const questions = models.questions.create(props.question, { returning: true })
    .then(function (question) {
      props.question_revision.question_id = question.dataValues.id;
      addRevisionAndAnswers(props, res);
    });
});

router.route('/passages/:section').get(function (req, res) {
  models.passages.findAll({
    attributes: ['id', 'section', 'type', 'is_published'],
    include: [{
      model: models.passage_revisions,
      attributes: ['passage_id', 'title', 'content'],
    },
    {
      model: models.questions,
      attributes: ['id', 'topic', 'subject', 'subcategory', 'is_published'],
      include: [{
        model: models.question_revisions,
        attributes: ['question_id', 'answer', 'short_explanation', 'long_explanation', 'prompt'],
        include: [{
          model: models.answers,
          as: 'answers',
          attributes: ['answer']
        }]
      }]
    }],
    order: [
      [models.passage_revisions, 'created', 'DESC'],
      [models.questions, models.question_revisions, 'created', 'DESC'],
      [models.questions, models.question_revisions, models.answers, 'ordering', 'DESC']
    ],
    where: {
      section: req.params.section,
      deleted: false
    }
  })
    .then(function (passages) {
      const filteredPassages = _.map(passages, function (passage) {
        return transformPassageProps(passage, true);
      });
      res.send({ passages: filteredPassages });
    })
});

router.route('/passage/:passageId').get(function (req, res) {
  const passages = models.passages.findOne({
    attributes: ['id', 'section', 'type', 'is_published'],
    include: [{
      model: models.passage_revisions,
      attributes: ['passage_id', 'title', 'content'],
    },
    {
      model: models.questions,
      attributes: ['id', 'is_published'],
      include: [{
        model: models.question_revisions,
        attributes: ['question_id', 'prompt'],
      }]
    }],
    order: [
      [models.passage_revisions, 'created', 'DESC'],
      [models.questions, models.question_revisions, 'created', 'DESC']    ],
    where: {
      id: req.params.passageId,
    }
  }).then(function (passage) {
    const filteredPassage = transformPassageProps(passage, false);
    const filteredQuestions = _.map(passage.questions, (question) => transformQuestionProps(question));
    res.send({ passage: filteredPassage, questions: filteredQuestions });
  })
});

router.route('/passage/:passageId').put(function (req, res) {
  const props = parsePassageProps(req.body);
  props.passage_revision.passage_id = req.params.passageId;
  models.passages.update(props.passage, { where: { id: req.params.passageId } })
    .then(function (passage) {
      addPassageRevision(props, res);
    });
});

router.route('/passage').post(function (req, res) {
  const props = parsePassageProps(req.body);
  models.passages.create(props.passage, { returning: true })
    .then(function (passage) {
      props.passage_revision.passage_id = passage.dataValues.id;
      addPassageRevision(props, res);
    });
});

const parsePassageProps = function (data) {
  return {
    passage: _.pick(data, ['section', 'type', 'is_published']),
    passage_revision: _.pick(data, ['title', 'content'])
  }
}

const parseBodyProps = function(data) {
  const questionProps = _.pick(data, ['topic', 'subject', 'subcategory', 'is_published', 'passage_id']);
  return { 
    question: questionProps,
    question_revision: _.pick(data, ['short_explanation', 'long_explanation', 'prompt', 'answer']),
    answers: _.map(data.answers, (data, i) => {
      return {
        ordering: +i,
        answer: data
      }
    })
  }
}

const addRevisionAndAnswers = function(props, res) {
  models.question_revisions.create(props.question_revision, { returning: true })
    .then(function (revision) {
      const revision_id = revision.dataValues.id;
      _.forEach(props.answers, function (answer) {
        answer.revision_id = revision_id;
      });
      models.answers.bulkCreate(props.answers, { returning: true })
        .then(function () {
          res.json({ success: true, id: revision.dataValues.question_id });
        });
    });
}

const addPassageRevision = function(props, res) {
  models.passage_revisions.create(props.passage_revision, { returning: true })
    .then(function(revision) {
      res.json({ success: true, id: revision.dataValues.passage_id });
    })
}

module.exports = router;