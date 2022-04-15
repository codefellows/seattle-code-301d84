import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
  }

  handleCityInput = (e) => {
    let city = e.target.value;
    this.setState({
      city: city
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.city);
  };


  render() {

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <label>Pick a city:
            <input type="text" name="city" onInput={this.handleCityInput}/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    )
  }
}

export default Main;
