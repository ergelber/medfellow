import React, { PureComponent as Component } from 'react';
import _ from 'lodash';
import { Grid, Row, Button, Col } from 'react-bootstrap';

import Categories from '../../helpers/categorization';

import './EditorMain.css';

class EditorMain extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getSubcategories = this.getSubcategories.bind(this);
  }

  handleClick(id, type) {
    const { history } = this.props;
    history.push(`/editor/view/${type}/${id}`);
  }

  getSubcategories(subcategories) {
    return _.map(subcategories, (subcat) => {
      return (
        <div className='subcat-container' key={subcat.id}>
          <div className='editor-subcat-title'>{subcat.title}</div>
          <div>
            <Button onClick={() => this.handleClick(subcat.id, 'discrete')}>View</Button>
          </div>
        </div>
      );
    });
  }

  getPassageCategories() {
    return _.map(Categories, (cat) => {
      return (
        <Button key={cat.id} onClick={() => this.handleClick(cat.id, 'passage')}>
          {cat.title}
        </Button>
      );
    });
  }

  render() {
    return (
      <div className='editor-main-container'>
        <div className='editor-main-title'>Editor Home</div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={6}>
              <div className='dash-header-title'>Discretes</div>
              {
                _.map(Categories, (cat) => {
                  return (
                    <div key={cat.id}>
                      <div>{cat.title}</div>
                      { this.getSubcategories(cat.subcategories) }
                    </div>
                  );
                })
              }
            </Col>
            <Col xs={12} md={6} className='editor-passages-dash-container'>
              <div className='dash-header-title'>Passages</div>
              { this.getPassageCategories() }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditorMain;
