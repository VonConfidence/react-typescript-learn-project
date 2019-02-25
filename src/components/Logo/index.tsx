import * as React from 'react';
import logoImg from './lf.jpg';

import './logo.less';

class Logo extends React.Component {
  public render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt="logo" />
      </div>
    );
  }
}

export default Logo;
