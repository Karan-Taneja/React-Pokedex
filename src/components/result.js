import React from 'react';
import './result.css';

const Result = (props) => {
  return(
    props.last === true ? 
    <div className="result last-result" onClick={props.close}>{props.name}</div> :
    <div className="result" onClick={props.close}>{props.name}</div>
  );
};

export default Result;