import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Grid, Row, Button, Table } from 'react-bootstrap';

import { getQuestionsOrPassages, setQuestionType, reset } from '../actions';
import { getEditingQuestions, getEditingPassages } from '../../reducer';

import './SectionOverview.css';

class SectionOverview extends Component {
  constructor(props) {
    super(props);

    this.newQuestion = this.newQuestion.bind(this);
  }

  componentWillMount() {
    const { reset, getQuestionsOrPassages, section, questionType } = this.props;
    reset();
    getQuestionsOrPassages(questionType, section);
  }

  handleClick(id) {
    const { questionType, history } = this.props;
    history.push(`/editor/edit/${questionType}/${id}`);
  }

  newQuestion() {
    const { questionType, history } = this.props;
    history.push(`/editor/new/${questionType}`);
  }

  getPassageQuestionCount(questions) {
    const publishedQuestions = _.reduce(questions, (acc, elem) => {
      if(elem.is_published) acc++;
      return acc;
    }, 0);
    return `${publishedQuestions} / ${questions.length}`;
  }

  render() {
    const { questions, passages, questionType } = this.props;
    const isPassage = questionType === 'passage';

    return (
      <Grid>
        <Row>
          <div>Sections</div>
          <Button onClick={this.newQuestion}>{ isPassage ? 'New Passage' : 'New Question'}</Button>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>{ isPassage ? 'Passage' : 'Question' }</th>
                { isPassage ? <th>Questions</th> : null }
                <th>Published</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                _.map((isPassage ? passages : questions), (data) => (
                    <tr key={`question-edit-${data.id}`}>
                      <td>{data.id}</td>
                      <td>{data.title || data.prompt}</td>
                      { isPassage ? <td>{this.getPassageQuestionCount(data.questions)}</td> : null }
                      <td>{data.is_published ? 'True' : 'False'}</td>
                      <td><Button onClick={this.handleClick.bind(this, data.id)}>Edit</Button></td>
                    </tr>
                  )
                )
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  section: match.params.section,
  questionType: match.params.questionType,
  questions: getEditingQuestions(state),
  passages: getEditingPassages(state)
});

export default withRouter(connect(mapStateToProps, {
  setQuestionType,
  getQuestionsOrPassages,
  reset
})(SectionOverview));
