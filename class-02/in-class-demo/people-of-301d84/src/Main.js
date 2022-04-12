import React from 'react';
import Person from './Person.js';
import data from './data.json';
import './Main.css';

class Main extends React.Component {
  render() {

    let people = [];
    data.forEach((student, idx) => {
      people.push(
        <Person
          name={student.name}
          imgURL={student.imgURL}
          key={idx}
        />
      )
    });

    return (
      <main>
        {people}
      </main>
    )
  }
}

export default Main;
