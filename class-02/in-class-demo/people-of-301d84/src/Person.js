import React from 'react';
import Button from 'react-bootstrap/Button';
import './Person.css';


class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waves: 0,
      helpMe: false
    };
  }

  handleWaves = () => {
    this.setState({
      waves: this.state.waves + 1
    });
  }

  needsHelp = () => {
    this.setState({
      helpMe: true
    })
  }

  gotHelp = () => {
    this.setState({
      helpMe: false
    })
  }

  // Ternary
  // WTF = What ? true : false;
  // statement to be evaluated ? true do this : false do this;

  render() {
    console.log(this.props.name);
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.waves} greetings</p>
        <p onClick={this.handleWaves}>Say hello!</p>
        <img
          src={this.props.imgURL}
          alt={this.props.name}
        />
        <div>{this.state.helpMe ? 'I need help' : ''}</div>
        <Button 
          className="article-button"
          onClick={this.needsHelp}
        >
          help request
        </Button>
        <Button
          className="article-button"
          variant="success"
          onClick={this.gotHelp}
        >
          I got help
        </Button>
      </article>
    )
  }
}

export default Person
