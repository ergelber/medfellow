import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Grid, Row, Button, Col } from 'react-bootstrap';

import Categories from '../../../../helpers/categorization';
import { quizType } from '../../Quiz';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, type) {
    const { quizType, history } = this.props;
    quizType(type);
    history.push(`/quiz/${id}`);
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
                      <div>
                        <Button className='section-button' onClick={() => this.handleClick(cat.id, 'discrete')}>Discrete Quiz</Button>
                        <Button className='section-button' onClick={() => this.handleClick(cat.id, 'passage')}>Passage Quiz</Button>
                      </div>
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

export default withRouter(connect(null, { quizType })(Dashboard));
