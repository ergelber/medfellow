import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Grid, Row, Button, Col } from 'react-bootstrap';

import Categories from '../../../../helpers/categorization';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.history.push(`/quiz/${id}`);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {
            _.map(Categories, (cat) => {
              return (
                <Col className='section-container' xs={12} md={6} key={cat.id}>
                  <div className='section-title'>{cat.title}</div>
                  <div className='section-button-container'>
                    { cat.id === 'cars' ?
                      <Button className='button-coming-soon' disabled>Coming soon</Button> :
                      <Button className='section-button' onClick={() => this.handleClick(cat.id)}>Start Quiz</Button>
                    }
                    </div>
                </Col>
              );
            })
          }
        </Row>
      </Grid>
    );
  }
}

export default withRouter(connect()(Dashboard));
