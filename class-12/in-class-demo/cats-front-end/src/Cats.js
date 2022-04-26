import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';

class Cats extends React.Component {
  // something in state?
  render () {
    let cats = this.props.cats.map(cat => (
      <Cat key={cat._id} cat={cat} deleteCat={this.props.deleteCat}/>
    ));

    return (

      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}


class Cat extends React.Component {



  render () {
    return (
      <ListGroup.Item key={this.props.cat._id}>
        {this.props.cat.name} is {this.props.cat.color}
        <Button 
          variant="dark" 
          onClick={() => this.props.deleteCat(this.props.cat._id)}
        >
          delete
        </Button>
      </ListGroup.Item>
    )
  }
}

export default Cats;
