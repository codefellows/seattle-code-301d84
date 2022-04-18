import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starWarsData: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // get the data
    try {
      let swData = await axios.get('https://swapi.dev/api/people/?page=1');
      // proof of life:
      // console.log(swData.data.results);
      // save it to state
      this.setState({
        starWarsData: swData.data.results
      });
    } catch (error) {
      console.log('error: ', error.response);
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`
      })
    }
  }

  handleCityInput = (e) => {
    // console.log(e.target.value);
    this.setState({
      city: e.target.value
    })
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    // console.log('In State: ', this.state.city);
    // get city data?
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    let cityData = await axios.get(url);
    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0]
    })
  }

  render() {
    console.log(this.state);
    let swListItems = this.state.starWarsData.map((char, idx) => {
      return <li key={idx}>{char.name}</li>
    })

    // example of an image url:
    // https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=14
    return (
      <>
        <h1>Data from an API</h1>
        <form onSubmit={this.handleSubmit}>
          <button>Display Star Wars data</button>
        </form>
        <form onSubmit={this.handleCitySubmit}>
          <label>Pick a city:
            <input type="text" name="city" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>
        {
          this.state.error
            ?
            <p>{this.state.errorMessage}</p>
            :
            <ul>
              {swListItems}
            </ul>
        }

      </>
    );
  }
}

export default App;
