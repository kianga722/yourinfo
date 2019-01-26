import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class InfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: ''
    };
  }

  componentDidMount() {
    fetch('https://api.ipify.org')
      .then(data => data.text())
      .then(data =>
        this.setState({
          ipAddress: data
        }));
  }

  render() {
    return (
      <div className='content'>
        <div className='title'>
          Your Info
        </div>
        <div className='userIP'>
          Your IP Address is: {this.state.ipAddress}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <InfoApp />,
  document.getElementById('root')
)
