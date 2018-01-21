import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Grid, Col } from 'react-bootstrap';
import _ from 'lodash';

import { editContent, updateContent, reset } from '../actions';
import { Passage } from '../../quiz/components/Quiz';
import { getEditingActiveQuestion, getEditingActivePassage } from '../../reducer';
import flatCategorization from '../../helpers/flatCategorization';
import { Solution } from '../../quiz/components/Results';
import DiscreteForm from './DiscreteForm';
import PassageForm from './PassageForm';
import PassagesQuestions from './PassageQuestions';

import './EditForm.css';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: { 
        prompt: '',
        answers: ['', '', '', ''],
        answer: null,
        long_explanation: '',
        short_explanation: '',
        subcategory: null,
        subject: null,
        topic: null,
        is_published: false,
        deleted: false,
        saved: ''
      },
      passage: {
        section: null,
        title: '',
        content: '',
        type: null,
        is_published: false,
        deleted: false,
        questions: [],
        saved: '',
        questionMode: false
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.getSubcategories = this.getSubcategories.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSubjects = this.getSubjects.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.addQuestionToPassage = this.addQuestionToPassage.bind(this);
  }

  componentWillMount() {
    const { editContent, id, passageId, questionType } = this.props;
    // if there are no ids, then it is new content which relies on nothing from db
    if (!id && !passageId) return;
    // if there is a passageId, it must be a new question being added to a passage
    if (passageId) {
      editContent('passage', passageId)
        .then(res => {
          this.setInitialPassageState(res);
        });
    } 
    // else we need to fetch the question or passage for updating
    else {
      editContent(questionType, id)
        .then(({ passage, question, questions }) => {
          const type = this.getQuestionType();
          const newState = this.setInitialState((passage || question), type, questions);
          this.setState({ [type]: newState });
          if(question && question.passage_id) {
            editContent('passage', question.passage_id)
              .then(res => {
                this.setInitialPassageState(res);
              });
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editContent, id, questionType, passageId } = nextProps; 
    if (this.props.match.url !== nextProps.match.url) {
      if (!id && !passageId) return;
      editContent(questionType, id)
        .then(({ passage, question, questions }) => {
          const type = this.getQuestionType();
          const newState = this.setInitialState((passage || question), type, questions);
          if (type === 'passage') {
            newState.questionMode = false;
            newState.questions = questions;
          }
          this.setState({ [type]: newState });
          if (question && question.passage_id) {
            editContent('passage', question.passage_id)
              .then(res => {
                this.setInitialPassageState(res);
              });
          }
        });
    }
  }

  getQuestionType() {
    return this.props.questionType === 'discrete' ? 'question' : 'passage'
  }

  setInitialState(data, type, questions) {
    const { saved, questionType } = this.props;
    const newState = _.assign({}, this.state[type], _.pick(data, _.keys(this.state[type])));
    if (questions) newState.questions = questions;
    if (saved) newState.saved = `Saved successfully: ${questionType} id: ${data.id}`;
    return newState;
   }

  setInitialPassageState(res) {
    const { questionType } = this.props;
    const passageState = _.assign({}, this.state.passage, _.pick(res.passage, _.keys(this.state.passage)));
    passageState.questions = res.questions;
    passageState.questionMode = questionType === 'discrete';
    this.setState({ passage: passageState });
  }

  handleCheckbox(type, value) {
    const questionType = this.getQuestionType();
    return this.state[questionType][type] === value;
  }

  handleInputChange(type, value, i) {
    const questionType = this.getQuestionType();
    const newState = _.assign({}, this.state[questionType]);
    if(type === 'answers') {
      const newAnswers = _.assign([], this.state.question.answers);
      newAnswers[i] = value;
      value = newAnswers;
      newState.answers = newAnswers;
    } else {
      newState[type] = value;
    }
    newState.saved = '';
    this.setState({ [questionType]: newState });
  }

  handleChange(e, cat) {
    const cats = ['subject', 'subcategory', 'topic'];
    const newState = _.assign({}, this.state.question);
    newState[cat] = e.target.value;
    for (let i = cats.indexOf(cat) + 1; i < cats.length; i++) {
      newState[cats[i]] = null;
    }
    newState.saved = '';
    this.setState({ question: newState });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { updateContent, passageId, match, id, history } = this.props;
    const questionType = this.getQuestionType();
    const stateValidation = _.omit(this.state[questionType], ['saved', 'deleted', 'is_published', 'questions', 'questionMode']);
    const data = _.omit(this.state[questionType], ['saved', 'questionMode']);
    const isNewContent = match.url.includes('new');
    
    // add passage id to new ONLY passage question properties to send to server if exists
    if(passageId && isNewContent) data.passage_id = passageId;
    
    // make sure no missing fields
    let validated = true;
    _.forEach(stateValidation, (value, key) => {
      if(!value && value !== 0) validated = false;
    });

    // validate answers
    if(questionType === 'question') {
      _.forEach(stateValidation.answers, (answer) => {
        if (!answer) validated = false;
      });
    }
    
    if (!validated) {
      const newState = _.assign({}, this.state[questionType]);
      newState.saved = 'Missing Fields';
      return this.setState({[questionType]: newState});
    }

    updateContent(this.props.questionType, id, data)
      .then(({ success, id }) => {
        if(isNewContent) {
          return history.push(`/editor/edit/${this.props.questionType}/${id}/saved`);
        }
        const newState = _.assign({}, this.state[questionType]);
        newState.saved = success ? `Saved successfully: ${questionType} id: ${id}` : 'Error saving';
        this.setState({ [questionType]: newState });
      })
  }

  getSubjects() {
    const section = ['bbf', 'cpf', 'psf', 'cars'];
    return _.map(flatCategorization, (cat) => {
      if (_.indexOf(section, cat.parentId) !== -1) {
        return (
          <option key={`subject-${cat.id}`} value={cat.id}>{cat.title}</option>
        );
      }
    });
  }

  getSubcategories() {
    const subject = this.state.question.subject;
    return _.map(flatCategorization, (cat) => {
      if(cat.parentId === subject) {
        return (
          <option key={`subcat-${cat.id}`}  value={cat.id}>{cat.title}</option>
        );
      }
    })
  }

  getTopics() {
    const subcategory = this.state.question.subcategory;
    return _.map(flatCategorization, (cat) => {
      if (cat.parentId === subcategory) {
        return _.map(cat.id, (topic) => (
          <option key={`topic-${topic}`} value={topic}>{topic}</option>
        ));
      }
    })
  }

  renderDisplay() {
    const { history, match, questionType } = this.props;
    const isPassage = questionType === 'passage';
    const passage = <Passage passages={this.state.passage} />;
    const solution = <Solution
      question={this.state.question}
      showLongExplanation={true}
      longExplanation={this.state.question.long_explanation}
      history={history}
      match={match}
      editor={true} 
    />;
    const buffer = [];
    if(this.state.passage.questionMode) {
      buffer.push(passage);
      buffer.push(solution);
    } 
    else if(isPassage) {
      buffer.push(passage);
    } 
    else {
      buffer.push(solution);
    }
    return buffer;
  }

  addQuestionToPassage() {
    const { history, activePassage } = this.props;
    if(!this.state.passage.questionMode) {
      history.push(`/editor/new/discrete/${activePassage.id}`);
    } else {
      history.push(`/editor/edit/passage/${activePassage.id}`);
    }
  }

  render() {
    const { history, questionType, id, passageId } = this.props;
    const isPassage = questionType === 'passage';
    return (
      <Grid>
        <Button onClick={() => history.push('/editor')}>Back to Menu</Button>
        <Row>
          { this.renderDisplay() }
          <Col xs={12} md={6}>
            { isPassage && !this.state.passage.questionMode ?
              <PassageForm {...this.state.passage}
                handleChange={this.handleChange}
                handleCheckbox={this.handleCheckbox}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
              /> :
              <DiscreteForm {...this.state.question}
                getSubcategories={this.getSubcategories}
                getTopics={this.getTopics}
                getSubjects={this.getSubjects}
                handleChange={this.handleChange}
                handleCheckbox={this.handleCheckbox}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit} /> }
          </Col>
        </Row>
        {(isPassage || this.state.passage.questionMode) && (id || passageId) ? 
            <PassagesQuestions 
              addQuestionToPassage={this.addQuestionToPassage}
              questions={this.state.passage.questions} 
              questionMode={this.state.passage.questionMode}
            /> : null }
      </Grid>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  id: match.params.id,
  passageId: match.params.passageId,
  saved: match.params.saved,
  questionType: match.params.questionType,
  activeQuestion: getEditingActiveQuestion(state),
  activePassage: getEditingActivePassage(state)
});

export default connect(mapStateToProps, {
  editContent,
  updateContent,
  reset
})(EditForm);
