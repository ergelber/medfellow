import React, { PureComponent as Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import Markdown from 'react-remarkable';

import { Question } from '../../Quiz';
import { renderMath } from '../../../../helpers/util';

import './Solution.css';

class Solution extends Component {
  constructor(props) {
    super(props);

    this.launchModal = this.launchModal.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  componentDidMount() {
    renderMath(this.shortExplanationText);
  }

  startQuiz() {
    const { history, match } = this.props;
    history.push(`/quiz/${match.params.section}`);
  }
  
  launchModal() {
    const { showLongExplanation, question } = this.props;
    showLongExplanation(question);
  }

  render() {
    const { question } = this.props;

    return (
      <Col xs={12} md={6} className='solution-container'>
        <Question currentQuestion={question} solution={true} /> 
        <div ref={ (text) => this.shortExplanationText = text }>
          <div className='solution-explanation-title'>Explanation:</div>
          <Markdown>{question.short_explanation}</Markdown>
        </div>
        <div className='solution-button-container'>
          <Button className='more-info' onClick={this.launchModal}>Full Explanation</Button>
          <Button className='solution-new-quiz' onClick={this.startQuiz}>New Quiz</Button>
        </div>
      </Col>
    );
  }
}

export default Solution;