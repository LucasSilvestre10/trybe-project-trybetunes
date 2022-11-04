import React, { Component } from 'react';
import '../Style/LoadingStyle.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="c-loader" />
        <div>Carregando...</div>
      </div>
    );
  }
}

export default Loading;
