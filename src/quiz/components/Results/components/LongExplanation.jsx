import React, { PureComponent as Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';

import { Question } from '../../Quiz';
import LongExplanationText from './LongExplanationText';
import { renderMath } from '../../../../helpers/util';

import './LongExplanation.css';


class LongExplanation extends Component {
  componentDidMount() {
    renderMath(this.longExplanationText);
  }

  componentDidUpdate() {
    renderMath(this.longExplanationText);
  }

  render() {
   
    return (
      <div ref={(text) => this.longExplanationText = text}>
      <Modal className='modal-container' {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.question.topic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <Question currentQuestion={this.props.question} solution={true} />
              </Col>
              <Col xs={12} md={6} className='long-explanation-text'>
                <LongExplanationText explanation={this.props.question.long_explanation} />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
};

export default LongExplanation;