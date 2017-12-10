const express = require('express');
const Sequelize = require('sequelize');
const _ = require('lodash');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const models = require('../../models'); 

const router = express.Router();

function getQuestionCategories(section) {
  let categories = [];
  switch (section) {
    case 'psf':
      categories = ['fc6', 'fc7', 'fc8', 'fc9', 'fc10'];
      break;
    case 'bbf':
      categories = ['fc1',  'fc2',  'fc3'];
      break;
    case 'cpf':
      categories = ['fc4',  'fc5'];
      break;
    default:
      categories = [];
  }
  return categories;
}

// router.all('*', ensureLoggedIn);

router.route('/questions/:section').get(function(req, res) {
  const questions = models.questions.findAll({ 
    attributes: [ 'topic', 'subject', 'subcategory' ],
    order: [ Sequelize.fn('RANDOM') ],
    include: [{
      model: models.question_revisions,
      attributes: ['question_id', 'answer', 'short_explanation', 'long_explanation', 'prompt'],
      order: [[ 'created', 'DESC' ]],
      limit: 1,
      include: [{
        model: models.answers,
        as: 'answers',
        order: [[ 'ordering', 'DESC' ]],
        attributes: ['answer']
      }]
    }],
    where: { 
      subject: getQuestionCategories(req.params.section),
      is_published: true,
      passage_id: null 
    },
    limit: 10 
  }).then(function (questions) {
    res.send({ questions: questions });
  })
});

router.route('/passages/:section').get(function(req, res) {
  models.passages.findAll({
    attributes: ['id', 'section', 'type'],
    order: [Sequelize.fn('RANDOM')],
    include: [{
      model: models.passage_revisions,
      attributes: ['passage_id', 'title', 'content'],
      order: [['created', 'DESC']],
      limit: 1
    },
    {
      model: models.questions,
      attributes: ['id', 'topic', 'subject', 'subcategory'],
      include: [{
        model: models.question_revisions,
        attributes: ['question_id', 'answer', 'short_explanation', 'long_explanation', 'prompt'],
        order: [['created', 'DESC']],
        limit: 1,
        include: [{
          model: models.answers,
          as: 'answers',
          order: [['ordering', 'DESC']],
          attributes: ['answer']
        }]
      }]
    }],
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
      return passage.questions;
    });

    res.send({ passages: filteredPassages[0], questions: questions[0] });
  })
});

module.exports = router;
