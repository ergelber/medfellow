import React, { PureComponent as Component } from 'react';
import {
  Checkbox, FormControl, FormGroup,
  ControlLabel, Button
} from 'react-bootstrap';
import _ from 'lodash';

import FieldGroup from '../../components/common/FieldGroup';

import './DiscreteForm.css';

const transformAnswers = (num) => {
  switch (num) {
    case 0:
      return 'A';
    case 1:
      return 'B';
    case 2:
      return 'C';
    case 3:
      return 'D';
    default:
      break;
  }
}

class DiscreteForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <FieldGroup
          id="formControlsQuestion"
          type="text"
          componentClass="textarea"
          label="Question"
          value={this.props.prompt}
          onChange={(e) => this.props.handleInputChange('prompt', e.target.value)}
        />
        <div><b>Answer Choices</b></div>
        {
          _.map(this.props.answers, (answer, i) => (
              <FieldGroup
                key={`answer-${i}`}
                type="text"
                componentClass="textarea"
                label={transformAnswers(i)}
                value={answer}
                onChange={(e) => this.props.handleInputChange('answers', e.target.value, i)}
              />
          ))
        }
        <FieldGroup
          id="formControlsShort"
          type="text"
          componentClass="textarea"
          label="Short Explanation"
          value={this.props.short_explanation}
          onChange={(e) => this.props.handleInputChange('short_explanation', e.target.value)}
        />
        <FieldGroup
          id="formControlsLong"
          type="text"
          componentClass="textarea"
          label="Long Explanation"
          value={this.props.long_explanation}
          onChange={(e) => this.props.handleInputChange('long_explanation', e.target.value)}
        />

        <FormGroup>
          <ControlLabel>Answer</ControlLabel>
          <Checkbox inline
            checked={this.props.handleCheckbox('answer', 0)} 
            onChange={() => this.props.handleInputChange('answer', 0)}
          >
            A
          </Checkbox>
          {' '}
          <Checkbox inline
            checked={this.props.handleCheckbox('answer', 1)}
            onChange={() => this.props.handleInputChange('answer', 1)}
          >
            B
          </Checkbox>
          {' '}
          <Checkbox inline
            checked={this.props.handleCheckbox('answer', 2)}
            onChange={() => this.props.handleInputChange('answer', 2)}
          >
            C
          </Checkbox>
          {' '}
          <Checkbox inline
            checked={this.props.handleCheckbox('answer', 3)}
            onChange={() => this.props.handleInputChange('answer', 3)}
          >
            D
          </Checkbox>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Subject</ControlLabel>
          <FormControl value={this.props.subject || ''} onChange={(e) => this.props.handleChange(e, 'subject')} componentClass="select" placeholder="select">
            <option value=""></option>
            { this.props.getSubjects() }
          </FormControl>
        </FormGroup>

        {
          this.props.subject ? 
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Subcategory</ControlLabel>
            <FormControl value={this.props.subcategory} onChange={(e) => this.props.handleChange(e, 'subcategory')} componentClass="select" placeholder="select">
              <option value=""></option>
              { this.props.getSubcategories() }
            </FormControl>
          </FormGroup> : null
        }
        {
          this.props.subcategory ?
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Topic</ControlLabel>
              <FormControl value={this.props.topic} onChange={(e) => this.props.handleChange(e, 'topic')} componentClass="select" placeholder="select">
                <option value=""></option>
                { this.props.getTopics() }
              </FormControl>
            </FormGroup> : null
        }

        <FormGroup>
          <ControlLabel>Publish</ControlLabel>
          <Checkbox inline
            checked={this.props.handleCheckbox('is_published', true)}
            onChange={() => this.props.handleInputChange('is_published', true)}
          >
            True
          </Checkbox>
          {' '}
          <Checkbox inline
            checked={this.props.handleCheckbox('is_published', false)}
            onChange={() => this.props.handleInputChange('is_published', false)}
          >
            False
          </Checkbox>
        </FormGroup>
        <Button type="submit">
          Submit
        </Button>
        <span>{this.props.saved}</span>
      </form>
    );
  }
}

export default DiscreteForm;
