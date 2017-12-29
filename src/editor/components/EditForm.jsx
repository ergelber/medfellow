import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Radio, FormControl, FormGroup,
  ControlLabel, Button, Row, Grid, Col } from 'react-bootstrap';
import _ from 'lodash';

import FieldGroup from '../../components/common/FieldGroup';
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
    const { editContent, questionId, questionType, reset, match, activePassage } = this.props;
    if (!match.params.passageId && !questionId) return;
    if (match.params.passageId && activePassage) {
      const newState = _.assign({}, this.state.passage, _.pick(activePassage, _.keys(this.state.passage)));
      newState.questions = activePassage.questions;
      newState.questionMode = true;
      this.setState({ passage: newState });
    } else {
      editContent(questionType, questionId)
        .then(({ passage, question, questions }) => {
          const type = questionType === 'discrete' ? 'question' : 'passage';
          const newState = _.assign({}, this.state[type], _.pick((passage || question), _.keys(this.state[type])));
          if (type === 'passage') newState.questions = questions;
          this.setState({ [type]: newState });
          if(question && question.passage_id) {
            editContent('passage', question.passage_id)
              .then(res => {
                const passageState = _.assign({}, this.state.passage, _.pick(res.passage, _.keys(this.state.passage)));
                passageState.questions = res.questions;
                passageState.questionMode = true;
                this.setState({ passage: passageState });
              });
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { editContent, questionId, questionType, reset } = nextProps; 
    if (this.props.match.url !== nextProps.match.url) {
      reset();
      if (!questionId) return;
      editContent(questionType, questionId)
        .then(({ passage, question, questions }) => {
          const type = questionType === 'discrete' ? 'question' : 'passage';
          const newState = _.assign({}, this.state[type], _.pick((passage || question), _.keys(this.state[type])));
          if (type === 'passage') newState.questions = questions;
          this.setState({ [type]: newState });
        });
    }
  }

  handleCheckbox(type, value) {
    const questionType = this.props.questionType === 'discrete' ? 'question' : 'passage';
    return this.state[questionType][type] === value;
  }

  handleInputChange(type, value, i) {
    const questionType = this.props.questionType === 'discrete' ? 'question' : 'passage';
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
    const questionType = this.props.questionType === 'discrete' ? 'question' : 'passage';
    const stateValidation = _.omit(this.state[questionType], ['saved', 'deleted', 'is_published', 'questions', 'questionMode']);
    
    // make sure no missing fields
    let validated = true;
    _.forEach(stateValidation, (value, key) => {
      if(!value) validated = false;
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

    const { updateContent, questionId, match } = this.props;
    const data = this.state[questionType];
    // add passage id to properties to send to server if exists
    if(match.params.passageId) data.passage_id = match.params.passageId;
    updateContent(this.props.questionType, questionId, data)
      .then(({ success, id }) => {
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
    const { history, match, activePassage, questionType, addQuestionToPassage } = this.props;
    const isPassage = questionType === 'passage';
    if(this.state.passage.questionMode) {
      return (
        <div>
          <Passage passages={this.state.passage} />
          <Solution
            question={this.state.question}
            showLongExplanation={true}
            longExplanation={this.state.question.long_explanation}
            history={history}
            match={match}
            editor={true} />
        </div>
      );
    } 
    if(isPassage) {
      return <Passage passages={this.state.passage} />;
    } 
    else {
      return (
        <Solution
          question={this.state.question}
          showLongExplanation={true}
          longExplanation={this.state.question.long_explanation}
          history={history}
          match={match}
          editor={true} />
      );
    }
  }

  addQuestionToPassage() {
    const { history, activePassage } = this.props;
    history.push(`/editor/new/discrete/${activePassage.id}`);
  }

  render() {
    const { history, match, activePassage, questionType } = this.props;
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
        {(isPassage || this.state.passage.questionMode) && match.params.questionId ? 
            <PassagesQuestions 
              addQuestionToPassage={this.addQuestionToPassage}
              questions={this.state.passage.questions} 
            /> : null }
      </Grid>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  questionId: match.params.questionId,
  questionType: match.params.questionType,
  activeQuestion: getEditingActiveQuestion(state),
  activePassage: getEditingActivePassage(state)
});

export default connect(mapStateToProps, {
  editContent,
  updateContent,
  reset
})(EditForm);
