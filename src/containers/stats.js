import React from 'react';
import './stats.css'

const Stats = (props) => {
    const {data} = props;

    return (<div className = "statsBox d-flex">
        {data.map((stat, i) => {

            let name = ""

            if(stat.name === "hp") name = "HP"
            else{
                const arr = stat.name.split("-")

                for(let i = 0; i < arr.length; i++){

                    if(arr[i].includes("special")) arr[i] = "Sp."
                    else if(i > 0 && arr[i] === "attack") arr[i] = "Atk"
                    else if(i > 0 && arr[i] === "defense") arr[i] = "Def"
                    else arr[i] = arr[i].slice(0, 1).toUpperCase()+arr[i].slice(1);
                }
                
                name = arr.join(" ")
            }

            return <div className="stat" key={i}>
                        <div className="statName">{name}</div>
                        <div className="statVal">{stat.value}</div>
                   </div>
        })}
    </div>)
}

export default Stats;