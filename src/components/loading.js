import React from 'react';
import Loader from '../assets/pokeball.png';
import './loading.css';

const Loading = () => {
  return (<div className="loading-box">
    <div>
      <img className="spin" src={Loader} alt="loading..." style={{width:'200px','height':'auto'}}/>
    </div>
  </div>)
}

export default Loading;