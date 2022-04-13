import React from 'react';
import Person from './Person.js';
import Row from 'react-bootstrap/Row';
import './Main.css';

class Main extends React.Component {
  render() {
    let people = this.props.data.map((student, idx) => {
      return (
        <Person
          name={student.name}
          imgURL={student.imgURL}
          key={idx}
          addHearts={this.props.addHearts}
          showModalHandler={this.props.showModalHandler}
        />
      )
    });

    return (
      <main>
        <Row xs={1} sm={3} md={4} lg={6}>
          {people}
        </Row>
      </main>
    )
  }
}

export default Main;
