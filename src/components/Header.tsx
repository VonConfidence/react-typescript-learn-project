import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  public render() {
    return (
      <div>
        <h2>Header Component</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}
