import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Heading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='header'>
        Your Info
      </div>
    )
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='loading'>
        <div className='lds-circle'><div></div></div>
      </div>
    )
  }
}

class Error extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='error'>
        <div>Error! Unable to retrieve information.</div>
        <div>Please check console for details...</div>
      </div>
    )
  }
}

class IP extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='ipAddress'>
        <div className='title'>IP Address</div>
        <div className='info'>{this.props.ipAddress}</div>
      </div>
    )
  }
}

class Location extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='location'>
        <div className='title'>Location</div>
        <div className='info'>
         {`${this.props.city}, ${this.props.regionName}, ${this.props.country} ${this.props.zip}`}
        </div>
      </div>
    )
  }
}

class ISP extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='isp'>
        <span className='more-title'>ISP:</span> {`${this.props.isp}`}
      </div>
    )
  }
}

class UserAgent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='userAgent'>
        {/* Easily spoofed? */}
        <div>
          <span className='more-title'>User-agent Header:</span> {navigator.userAgent}
        </div>
        <div>
          <span className='more-title'>Browser Version:</span> {navigator.appVersion}
        </div>
        <div>
          <span className='more-title'>Browser Language:</span> {navigator.language}
        </div>
        <div>
          <span className='more-title'>Cookies:</span> {navigator.cookieEnabled ? 'enabled' : 'disabled'}
        </div>
        <div>
          <span className='more-title'>OS:</span> {navigator.platform}
        </div>
      </div>
    )
  }
}

class Java extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='java'>
        <span className='more-title'>Java:</span> {navigator.javaEnabled() ? 'enabled' : 'disabled'}
      </div>
    )
  }
}

class ScreenSize extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='screen'>
        <div>
          <span className='more-title'>Screen Size:</span> {`${window.screen.width}x${window.screen.height} `}
        </div>
        <div>
          <span className='more-title'>Color Depth:</span> {`${window.screen.colorDepth} bits`}
        </div>
      </div>
    )
  }
}

class CurrentDate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='date'>
        <span className='more-title'>Date:</span> {Date()}
      </div>
    )
  }
}


class Data extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='data'>
        <IP ipAddress={this.props.ipAddress} />
        <Location 
          city={this.props.city}
          regionName={this.props.regionName}
          country={this.props.country}
          zip={this.props.zip}
        />
        <div className='more'>
          <ISP isp={this.props.isp} />
          <UserAgent />
          <Java />
          <ScreenSize />
          <CurrentDate />
        </div>
      </div>
    )
  }
}


class InfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: '',
      city: '',
      regionName: '',
      country: '',
      zip: '',
      isp: '',
      errorMsg: false
      }
    };
  

  componentWillMount() {
    fetch(`https://api.ipify.org`)
      .then(ip => ip.text())
      .then(ip =>
        this.setState({
          ipAddress: ip
        }))
      .then(() => fetch(`https://api.ipdata.co/${this.state.ipAddress}?api-key=test`))    
      .then(location => location.json())
      .then(location =>
        this.setState({
          city: location['city'],
          regionName: location['region'],
          country: location['country_name'],
          zip: location['postal'],
          isp: location['organisation']
        }))
      .catch(error => {
        console.log(error)
        this.setState({
          errorMsg: true
        })
      }) 
       
  }

  render() {
    const loaded = this.state.isp !== '';
    let component;
    if (loaded) {
      component = <Data 
                    ipAddress={this.state.ipAddress}
                    city={this.state.city}
                    regionName={this.state.regionName}
                    country={this.state.country}
                    zip={this.state.zip}
                    isp={this.state.isp}
                    errorMsg={this.state.errorMsg}
                  />
    } else if (this.state.errorMsg) {
      component = <Error />
    } else {
      component = <Loading />
    }

    return(
      <div className='content'>
        <Heading />
        {component}
      </div>
    );
  }
}

ReactDOM.render(
  <InfoApp />,
  document.getElementById('root')
)
