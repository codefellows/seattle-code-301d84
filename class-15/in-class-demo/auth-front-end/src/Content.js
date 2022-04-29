import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class Content extends React.Component {

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      // get a token
      // JSON Web Token _ (pronounced JOT)
      const res = await this.props.auth0.getIdTokenClaims();

      // MUST remember the double underscore in __raw
      const jwt = res.__raw;
      console.log(jwt); // this is a far as you need to go for the lab.
      // Get that jwt to log in the console

      // from the axios docs, we can send a config object to make our axios requests
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {'Authorization': `Bearer ${jwt}`}
      }
      console.log('config', config);
      const bookResults = await axios(config);

      // // the way we used to make axios requests:
      // let url = `${process.env.REACT_APP_SERVER}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user);
    return (
      <>
        <h2>Content page </h2>
      </>
    )
  }
}

export default withAuth0(Content);
