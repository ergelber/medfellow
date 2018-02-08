import React, { PureComponent as Component } from 'react';
import Markdown from 'react-remarkable';

import { renderMath } from '../../../../helpers/util';

import './Passage.css';

class Passage extends Component {
  componentDidMount() {
    renderMath(this.passageText);
  }

  componentDidUpdate() {
    renderMath(this.passageText);
  }

  render() {
    const { passages, solution } = this.props;

    return (
      <div 
        ref={(input) => { this.passageText = input; }} 
        className={solution ? 'passage-solution markdown' : 'passage-container markdown'}>
        <Markdown>{passages.content}</Markdown>
      </div>
    );
  }
}

export default Passage;