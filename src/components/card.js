import React from 'react';
import './card.css';

const Card = (props) => {
    
    return (<div className="pokecard">
                <div className="left">
                    <img className="icon" src={`https://img.pokemondb.net/sprites/sun-moon/icon/${props.value.toLowerCase()}.png`} alt={props.value.toLowerCase() + '.png'}/>
                    <div className="pokename">{props.name}</div>
                </div>
                <div className="pokeID"># {props.index}</div>
            </div>)
}

export default Card;