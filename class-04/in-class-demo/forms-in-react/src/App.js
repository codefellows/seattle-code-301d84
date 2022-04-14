import React from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      howToSort: '',
      filteredData: data
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let firstName = event.target.firstName.value;
    let selected = event.target.select.value;
    let lastName = event.target.lastNameControlId.value;
    console.log(firstName, lastName, selected);
    this.setState({
      name: event.target.name.value,
      howToSort: selected
    });
    //console.log(this.state);
  }
  handleSelect = (e) => {
    let choice = e.target.value;
    console.log(choice);
    if (choice === 'even') {
      let newData = data.filter(num => num % 2 === 0);
      this.setState({filteredData: newData});
    } else if (choice === 'odd') {
      let newData = data.filter(num => num % 2 !== 0);
      this.setState({filteredData: newData});
    } else {
      this.setState({filteredData: data});
    }
  }

  render() {
    //console.log(this.state);
    let numbers = this.state.filteredData.map((num, idx) => {
      return <ListGroup.Item key={idx}>{num}</ListGroup.Item>
    })
    return (
      <>
        <header>
          <h1>Forms in React</h1>
          <main>
            <Form onSubmit={this.handleSubmit}>
              <Form.Label>Name of List
                <Form.Control type="text" name="name" />
              </Form.Label>

              <Form.Label htmlFor="firstNameId">First name</Form.Label>
              <Form.Control type="text" name="firstName" id="firstNameId"/>

              <Form.Group controlId='lastNameControlId'>
                <Form.Label>last name</Form.Label>
                <Form.Control type="text" name="lastName" />
              </Form.Group>

              <Form.Select name="select" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </Form.Select>
              <Button type="submit">Submit</Button>
            </Form>
            <ListGroup>
              {numbers}
            </ListGroup>
          </main>
        </header>
      </>
    )
  }
}

export default App;


/*

            <form onSubmit={this.handleSubmit}>
              <label>Name of List
                <input type="text" name="name" />
              </label>
              <fieldset>
              <legend>Select Numbers</legend>
              <select name="select" onChange={this.handleSelect}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
              </fieldset>
              <button type="submit">Submit</button>
            </form>

*/
