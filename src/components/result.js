import React from 'react';
import './result.css';

const Result = (props) => {
  return(
    props.last === true ? 
    <div className={'result last-result'} pos={props.pos} onClick={props.close} value={props.name}>{props.name}</div> 
    :
    <div className={'result'} pos={props.pos} onClick={props.close} value={props.name}>{props.name}</div>);
};

export default Result;