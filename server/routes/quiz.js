const express = require('express');
const Sequelize = require('sequelize');
const _ = require('lodash');

const models = require('../models'); 

const router = express.Router();

function getPassageCategories(section) {
  let categories;
  switch (section) {
    case 'psf':
      categories = { "section": 'psf' };
      break;
    case 'bbf':
      categories = { "section": 'bbf' };
      break;
    case 'cpf':
      categories = { "section": 'cpf' };
      break;
    default:
      categories = { "section": 'cars' };
  }

  return categories;
}

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

module.exports = router;
