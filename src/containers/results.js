import React from 'react';
import { Link } from 'react-router-dom';
import Result from '../components/result';
import './results.css'


const Results = (props) => {

  return(
    props.results.length > 0 ?
    <div className="results-box">
      {props.results.map((e, i) => {

        let pkmn = e;
        if (pkmn === "Nidoran♂") pkmn = "nidoran-m";
        else if (pkmn === "Nidoran♀") pkmn = "nidoran-f";
        else if (pkmn.includes(" ")) pkmn = pkmn.split(" ").join("-");
        else if (pkmn.includes(":")) pkmn = pkmn.split(":").join("-");
        if (pkmn === "Nidoran♂") pkmn = "nidoran-m";
        else if (pkmn === "Nidoran♀") pkmn = "nidoran-f";
        else if (pkmn.includes(" ")) pkmn = pkmn.split(" ").join("-");
        else if (pkmn.includes("Null")) pkmn = "type-null";
        else if (pkmn.includes("Mr")) pkmn = "mr-mime";
        else if (pkmn.includes("jr.")) pkmn = "mime-jr";
        else if (pkmn.includes("Farfetch")) pkmn = "farfetchd";

        pkmn = pkmn.toLowerCase();
        if(i === props.results.length -1) return <Link to={`/${pkmn}`} key={i} onClick={props.close}><Result name={e} last={true} close={props.close}/></Link>;
        return <Link to={`/${pkmn}`} key={i} onClick={props.close}><Result name={e} close={props.close}/></Link>
      })}
    </div> : <></>
  )

}

export default Results;