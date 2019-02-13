import React from 'react';
import './movelist.css';

const Movelist = (props) => {

    const {data} = props;

    return (<div className="moveList">
        {data.map((move, i) => {
            let name = ""
            const arr = move.name.split("-")
            for(let i = 0; i < arr.length; i++){
                arr[i] = arr[i].slice(0,1).toUpperCase() + arr[i].slice(1)
            }
            name = arr.join(" ")
            return <div className="move" key={i} value={move.name} onClick={data.onClick}>{name}</div>
        })}
    </div>)
}

export default Movelist