import React, { PureComponent as Component } from 'react';
import Markdown from 'react-remarkable';

import { renderMath } from '../../../../helpers/util';

class LongExplanationText extends Component {
  componentDidMount() {
    renderMath(this.longExplanationText);
  }

  componentDidUpdate() {
    renderMath(this.longExplanationText);
  }

  render() {
    return (
      <div ref={(text) => this.longExplanationText = text}>
        <Markdown>
          {this.props.explanation}
        </Markdown>
      </div>
    );
  }
}

export default LongExplanationText;