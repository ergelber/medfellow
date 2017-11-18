import React, { PureComponent as Component } from 'react';
import { Button } from 'react-bootstrap';

import './ButtonGroup.css';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(change) {
    const { submitQuiz, changeIdx, idx, 
      questions, history, match } = this.props;

    if (idx === questions.length - 1) {
      submitQuiz();
      return history.push(`/solutions/${match.params.section}/${match.params.quizId}`);
    }
    changeIdx(change);
  }

  render() {
    const { idx, questions } = this.props;

    return (
      <div className='quiz-button-group'>
        {
          idx > 0 ? <Button className="next-question" onClick={() => this.clickHandler(-1)}>Back</Button> : null
        }
        
        <Button className="next-question" onClick={() => this.clickHandler(1)}>{ idx === questions.length - 1 ? 'Submit' : 'Next' }</Button>
      </div>
    );
  }
}

export default ButtonGroup;