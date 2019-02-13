import React, {Component} from 'react';
import './profile.css';
import Movelist from '../containers/movelist';
import Typelist from '../containers/typelist';
import Sprites from '../containers/sprites';
import Stats from '../containers/stats';
import Axios from 'axios';


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
                display:false,
                data:{}
            },
        }
    }

    onClickMove = (e) => {
        Axios.get(`https://pokeapi.co/api/v2/move/${e.target.getAttribute('value')}`)
            .then((data) => {
                console.log(data.request.response)
            })
            .then(() => {

            })
    }

    toggleModal = () => {
        const nuModal = {...this.state.modal}

        if(nuModal.display) nuModal.display = false
        else nuModal.display = true
        
        this.setState({modal: nuModal})
    }

    sendMoveData = (data) => {
        this.setState({modal:data})
    }

    render(){

        const pkmn = this.props.pokemon

        return <>
            <div>
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
            </div>
            <div className="center d-flex">
                <Stats data={pkmn.stats}/>
            </div>
            <Movelist data={pkmn.moves} sendMoveData={this.sendMoveData} onClickMove={this.onClickMove}/>
        </>
    }

}


export default Profile;