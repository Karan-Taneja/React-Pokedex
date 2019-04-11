import React from 'react';
import './modal.css';
import Typelist from '../containers/typelist'

const Modal = (props) => {
    const move = props.move
    const type = move.type
    const category = move.category
    return (
        <div className="max black-bg negMargin">
        <div className="moveModal" name="modal">
            <div className="modal-dialog" name="modal">
                <div className="modal-content" name="modal"> 
                    <div className="modal-header" name="modal">
                        <h4 className="modal-title" name="modal">{move.name}</h4>
                        <div className="close">&times;</div>
                    </div>
                    <div className="modal-body" name="modal">
                        {move.type !== null ? <Typelist data={[{'name':`${type}`}, {'name':`${category}`}]}/> : <></>}
                        {move.power !== null ? <p><b>Power</b>: {move.power}</p> : <></>}
                        {move.accuracy ? <p><b>Accuracy</b>: {move.accuracy}</p> : <></>}
                        <p><b>Priority</b>: {move.priority}</p>
                        <p><b>Base PP</b>: {move.pp}</p>
                        <p><b>Max PP</b>: {move.pp * 1.6}</p>
                        <p><b>Description</b>: {move.description}</p>
                    </div>
                    <div className="modal-footer" name="modal">
                        <div className="btn btn-default">Close</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
}

export default Modal;