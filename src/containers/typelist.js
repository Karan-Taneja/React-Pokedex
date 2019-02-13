import React from 'react';
import './typelist.css';

const Typelist = (props) => {

   const {data} = props;
   return (<div className = "typeList center d-flex">
       {data.map((type, i) => {

            const typeName = type.name.slice(0,1).toUpperCase() + type.name.slice(1)

            return <div className={["type", type.name].join(" ")} key={i}>{typeName}</div>
       })}
   </div>)
}

export default Typelist;