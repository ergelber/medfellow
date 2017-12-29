import React, { PureComponent as Component } from 'react';
import _ from 'lodash';
import Markdown from 'react-remarkable';

import { renderMath } from '../../../../helpers/util';

import './Question.css';

class Question extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    if(this.questionText) renderMath(this.questionText);
  }

  componentDidUpdate() {
    if (this.questionText) renderMath(this.questionText);
  }

  clickHandler(userAnswer) {
    const { setUserChoice, idx } = this.props;
    setUserChoice(userAnswer, idx);
  }

  render() {
    let { questions, idx, currentQuestion, solution } = this.props;
    currentQuestion = currentQuestion || questions[idx];

    if (!currentQuestion) return <div className='loader' />;

    return (
      <div ref={(input) => { this.questionText = input; }}>
        <div className='question-stem markdown'>
          <Markdown>
              {currentQuestion.prompt}
          </Markdown>
        </div>
        <ol className="answer-choices" type="A">
          { _.map(currentQuestion.answers, (answer, i) => {
            if(!solution)
              return (
                <li key={i} 
                  className={ currentQuestion.userChoice === i ? 'answered' : null }
                  onClick={() => this.clickHandler(i)}>
                  <Markdown>{answer}</Markdown>
                </li> 
              );
            if(currentQuestion.answer === i )
              return (
                <li className={'correct'} key={i}>
                  <Markdown>{answer}</Markdown>
                </li>
              );
            if(currentQuestion.userChoice === i)
              return (
                <li className={'incorrect'} key={i}>
                  <Markdown>{answer}</Markdown>
                </li> 
              );
            return <li key={i}><Markdown>{answer}</Markdown></li> 
          })}
        </ol>
      </div>
    );
  }
}

export default Question;