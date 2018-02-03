const _ = require('lodash');

const getQuestionCategories = function (section) {
  let categories = [];
  switch (section) {
    case 'psf':
      categories = ['fc6', 'fc7', 'fc8', 'fc9', 'fc10'];
      break;
    case 'bbf':
      categories = ['fc1', 'fc2', 'fc3'];
      break;
    case 'cpf':
      categories = ['fc4', 'fc5'];
      break;
    default:
      categories = [];
  }
  return categories;
} 

const transformPassageProps = function (passage, includeQuestions) {
  const filteredPassage = _.assign({}, passage.dataValues, passage.passage_revisions[0].dataValues);
  delete filteredPassage.passage_revisions;
  if (includeQuestions) {
    filteredPassage.questions = _.map(passage.questions, function (question) {
      return transformQuestionProps(question);
    });
  }
  else {
    delete filteredPassage.questions;
  }
  return filteredPassage;
}

const transformQuestionProps = function (question) {
  const filteredQuestion = _.assign({}, question.dataValues, question.dataValues.question_revisions[0].dataValues);
  const orderedAnswers = _.sortBy(filteredQuestion.answers, function(answer) { return answer.ordering; });
  filteredQuestion.answers = _.map(orderedAnswers, function (answer) { return answer.answer; });
  delete filteredQuestion.question_revisions;
  return filteredQuestion;
}

module.exports.getQuestionCategories = getQuestionCategories;
module.exports.transformQuestionProps = transformQuestionProps;
module.exports.transformPassageProps = transformPassageProps;