import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
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

  handleTitleClick = () => {
    this.props.showModalHandler(this.props.name);
  }

  // Ternary
  // WTF = What ? true : false;
  // statement to be evaluated ? true do this : false do this;

  render() {
    // console.log(this.props.name);
    // console.log(this.props);
    return (
      <Col className="mb-5">
        <Card className="h-100">
          <Card.Img
            src={this.props.imgURL}
            alt={this.props.name}
            onClick={this.props.addHearts}
          />
          <Card.Header>
            <h3 onClick={this.handleTitleClick}>{this.props.name}</h3>
            <Card.Text>👋 {this.state.waves} greetings</Card.Text>
            <Card.Text onClick={this.handleWaves}>Say hello!</Card.Text>
          </Card.Header>
          <Card.Body>
            <div>{this.state.helpMe ? 'I need help' : ''}</div>
            <Button
              className="article-button"
              onClick={this.needsHelp}
            >
              Help
            </Button>
            <Button
              className="article-button"
              variant="success"
              onClick={this.gotHelp}
            >
              I got help
            </Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default Person
