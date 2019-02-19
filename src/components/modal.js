import React from 'react';
import './modal.css';
import Typelist from '../containers/typelist'

const Modal = (props) => {
    const move = props.move
    const type = move.type
    const category = move.category
    return (
        <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{move.name}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        {move.type !== null ? <Typelist data={[{'name':`${type}`}, {'name':`${category}`}]}/> : <></>}
                        {move.power !== null ? <p><b>Power</b>: {move.power}</p> : <></>}
                        {move.accuracy ? <p><b>Accuracy</b>: {move.accuracy}</p> : <></>}
                        <p><b>Base PP</b>: {move.pp}</p>
                        <p><b>Max PP</b>: {move.pp * 1.6}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Modal;

{/* // move.name = arr.join(" ")
// move.accuracy = res.accuracy;
// move.category = res['damage_class'].name;
// move.type = res.type.name;
// move.power = res.power;
// move.pp = res.pp;
// move.priority = res.priority; */}