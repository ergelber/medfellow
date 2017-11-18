import React, { PureComponent as Component } from 'react';
import _ from 'lodash';

import './QuestionCircles.css';

class QuestionCircles extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div className="quiz-progress-circles">
        { 
          _.map(questions, (curr, i) => (
            <div key={i} className={curr.userChoice === null ? 
              'question-circle' : 
              'question-answered question-circle' }></div>
          ))}
      </div>
    );
  }
}

export default QuestionCircles;