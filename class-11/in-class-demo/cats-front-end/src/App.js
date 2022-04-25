import React from 'react';
import axios from 'axios';
import './App.css';

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cats: []
    }
  }

  getCats = async () => {
    try {
      let url = `${SERVER}/cats`
      // let urlWithParams = `${SERVER}/cats?location=Seattle`;
      let results = await axios.get(url);

      this.setState({
        cats: results.data
      })
    } catch(error){
      console.log('we have an error: ', error.response.data)
    }
  }

  // net effect: when the component loads it has all it needs. the data will be put in state and render
  componentDidMount() {
    this.getCats();
  }


  render() {

    let cats = this.state.cats.map(cat => (
      <p key={cat._id}>{cat.name} is {cat.color}</p>
    ));
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
        {
          this.state.cats.length > 0 &&
          <>
            {cats}
          </>
        }
        </main>
      </>
    );
  }
}

export default App;
