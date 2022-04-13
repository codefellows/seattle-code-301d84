import React from 'react';
import Header from './Header.js';
import Main from './Main';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hearts: '',
      showModal: false,
      name: ''
    };
  }

  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '❤️'
    });
  };

  hideModalHandler = () => {
    this.setState({
      showModal: false
    });
  };

  showModalHandler = (name) => {
    this.setState({
      showModal: true,
      name: name
    });
  };

  render() {
    return (
      <>
        <Header hearts={this.state.hearts} />
        <Main 
          addHearts={this.addHearts} 
          showModalHandler={this.showModalHandler}
          data={data}
        />
        <Modal
          show={this.state.showModal}
          onHide={this.hideModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.name}
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </>
    )
  }
}

export default App;
