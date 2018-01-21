import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Grid, Row, Button, Table } from 'react-bootstrap';

import './PassageQuestions.css';

class PassageQuestions extends Component {

  handleClick(id) {
    const { history } = this.props;
    history.push(`/editor/edit/discrete/${id}`);
  }
  
  render() {
    const { questions, addQuestionToPassage, questionMode } = this.props;
    return (
      <Grid>
        <Row>
          <Button onClick={addQuestionToPassage}>{ !questionMode ? 'New Passage Question' : 'Return To Passage'}</Button>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Published</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              { _.map(questions, (question) => {
                  return (
                    <tr>
                      <td>{question.id}</td>
                      <td>{question.prompt}</td>
                      <td>{question.is_published ? 'True' : 'False'}</td>
                      <td><Button onClick={this.handleClick.bind(this, question.id)}>Edit</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(connect()(PassageQuestions));
