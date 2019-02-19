import React from 'react';
import './card.css';

const Card = (props) => {
    return (<div className="pokecard" onClick={props.onClick} name={props.name} value={props.value}>
                <div className="left" name={props.name} value={props.value}>
                    <img className="icon" name={props.name} value={props.value} src={`https://img.pokemondb.net/sprites/sun-moon/icon/${props.value.toLowerCase()}.png`}/>
                    <div className="pokename" name={props.name} value={props.value}>{props.name}</div>
                </div>
                <div className="pokeID" name={props.name} value={props.value}># {props.index}</div>
            </div>)
}

export default Card;