import React from 'react';
import Person from './Person.js';
import Header from './Header.js';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <>
        <Header/>
        <main>
          <Person 
             name="Sheyna" 
             haircolor="brown" 
             hometown="Seattle"
          />
          <Person name="Chad"/>
          <Person name="Michael"/>
          <Person name="Roger"/>
        </main>
      </>
    )
  }
}

export default App;
