import React from 'react';

const Ads = ({source}) => {
  let randomNumber = Math.floor(Math.random()*1000);
  let sourceUrl = source || `http://localhost:3000/ads/?r=${randomNumber}`;
  return (
    <img
      alt={randomNumber}
      style={{alignSelf: 'center', justifyContent: 'space-around', alignItems:'center', height:200}}
      src={sourceUrl}
    />
  );
}

export default Ads;
