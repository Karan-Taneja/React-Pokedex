import React, {Component} from 'react';
import './profile.css';
import Movelist from '../containers/movelist';
import Typelist from '../containers/typelist';
import Sprites from '../containers/sprites';
import Stats from '../containers/stats';
import Modal from './modal';
import Axios from 'axios';

const $ = window.$;

class Profile extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: "",
            type: [],
            sprites: [],
            stats:[],
            moves:[],
            modal:{
            },
        }
    }

    onClickMove = (e) => {
        Axios.get(`https://pokeapi.co/api/v2/move/${e.target.getAttribute('value')}`)
            .then((data) => {
                const res = JSON.parse(data.request.response)

                const move = {}

                const arr = res.name.split("-")
                for(let i = 0; i < arr.length; i++){
                    arr[i] = arr[i].slice(0,1).toUpperCase() + arr[i].slice(1)
                }

                move.name = arr.join(" ")
                move.power = res.power;
                move.accuracy = res.accuracy;
                move.pp = res.pp;
                move.category = res['damage_class'].name;
                move.type = res.type.name;
                move.priority = res.priority;

                return move;
            })
            .then((move) => {
                this.setState({modal:move})
            })
            .then(() => {
                $('#myModal').modal('toggle');
            })
    }

    render(){

        const pkmn = this.props.pokemon;

        return <>
            <Modal move={this.state.modal}/>
            <div>
                <div className="d-flex center">
                    <div>
                        <h4># {pkmn.id} - {pkmn.name}</h4>
                        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pkmn.id}.png`}/>
                        <Typelist data={pkmn.types}/>
                    </div>
                    <Sprites data={pkmn.sprites}/>
                </div>
            </div>
            <div className="center d-flex">
                <Stats data={pkmn.stats}/>
            </div>
            <Movelist data={pkmn.moves} onClickMove={this.onClickMove}/>
        </>
    }

}


export default Profile;