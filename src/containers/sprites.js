import React from 'react';
import './sprites.css'

const Sprites = (props) => {

    const {data} = props;

    return (<div className="sprites center">
        {data.map((sprite, i) => {
            if(sprite !== null)
            return (
            <div className="d-flex" key={i}>
                <img src={sprite}/>
            </div>)
            else return;
        })}
    </div>)
}

export default Sprites;