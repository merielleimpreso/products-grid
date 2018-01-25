import React from 'react';

class Ads extends React.Component {
  render() {
    let randomNumber = Math.floor(Math.random()*1000);
    let sourceUrl = (this.props.source) ? this.props.source : `http://localhost:3000/ads/?r=${randomNumber}`;
    return (
      <img
        alt={randomNumber}
        style={{alignSelf: 'center', justifyContent: 'space-around', alignItems:'center', height:200}}
        src={sourceUrl}
      />
    );
  }
}

export default Ads;
