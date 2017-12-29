import React, { PureComponent as Component } from 'react';
import {
  Checkbox, Radio, FormControl, FormGroup,
  ControlLabel, Button, Row, Grid, Col
} from 'react-bootstrap';
import _ from 'lodash';

import Categories from '../../helpers/categorization';
import PassageCategories from '../../helpers/passageCategories';
import FieldGroup from '../../components/common/FieldGroup';

import './PassageForm.css';

class PassageForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <FieldGroup
          id="formControlsTitle"
          type="text"
          componentClass="textarea"
          label="Title"
          value={this.props.title}
          onChange={(e) => this.props.handleInputChange('title', e.target.value)}
        />
        <FieldGroup
          id="formControlsContent"
          type="text"
          componentClass="textarea"
          label="Content"
          value={this.props.content}
          onChange={(e) => this.props.handleInputChange('content', e.target.value)}
        />

        <FormGroup controlId="formControlsSection">
          <ControlLabel>Section</ControlLabel>
          <FormControl value={this.props.section || ''} onChange={(e) => this.props.handleInputChange('section', e.target.value)} componentClass="select" placeholder="select">
            <option value=""></option>
            { _.map(Categories, (cat) => <option value={cat.id}>{cat.title}</option> )}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsType">
          <ControlLabel>Type</ControlLabel>
          <FormControl value={this.props.type || ''} onChange={(e) => this.props.handleInputChange('type', e.target.value)} componentClass="select" placeholder="select">
            <option value=""></option>
            {_.map(PassageCategories, (cat) => <option value={cat}>{cat}</option>)}
          </FormControl>
        </FormGroup>

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

export default PassageForm;
