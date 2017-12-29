const express = require('express');
const Sequelize = require('sequelize');
const _ = require('lodash');

const getQuestionCategories = require('../helpers/util').getQuestionCategories;
const transformQuestionProps = require('../helpers/util').transformQuestionProps;
const models = require('../../models'); 

const router = express.Router();

router.route('/questions/:section').get(function(req, res) {
  const questions = models.questions.findAll({ 
    attributes: [ 'topic', 'subject', 'subcategory' ],
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
      [Sequelize.fn('RANDOM')],
      [models.question_revisions, 'created', 'DESC'],
      [models.question_revisions, models.answers, 'ordering', 'DESC']
    ],
    where: { 
      subject: getQuestionCategories(req.params.section),
      is_published: true,
      passage_id: null 
    },
    limit: 10 
  }).then(function (questions) {
    const filteredQuestions = _.map(questions, function(question) {
      return transformQuestionProps(question);
    })
    res.send({ questions: filteredQuestions });
  })
});

router.route('/passages/:section').get(function(req, res) {
  models.passages.findAll({
    attributes: ['id', 'section', 'type'],
    include: [{
      model: models.passage_revisions,
      attributes: ['passage_id', 'title', 'content'],
    },
    {
      model: models.questions,
      attributes: ['id', 'topic', 'subject', 'subcategory'],
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
      [Sequelize.fn('RANDOM')],
      [models.passage_revisions, 'created', 'DESC'],
      [models.questions, models.question_revisions, 'created', 'DESC'],
      [models.questions, models.question_revisions, models.answers, 'ordering', 'DESC']
    ],
    where: {
      section: req.params.section,
      is_published: true,
      deleted: false
    },
    limit: 1
  })
  .then(function(passages) {
    const filteredPassages = _.map(passages, function(passage) {
      return passage.passage_revisions[0];
    });
    const questions = _.map(passages, function (passage) {
      return _.map(passage.questions, function(question) {
        return transformQuestionProps(question);
      });
    });
    res.send({ passages: filteredPassages[0], questions: questions[0] });
  })
});

module.exports = router;
