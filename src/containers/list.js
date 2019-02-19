import React, {Component} from 'react';
import './list.css';
import Pokemon from '../components/pokemon';
import Card from '../components/card';
import Axios from 'axios';

class List extends Component {

    state = {
        pokemon: Pokemon.slice(0, 20),
        hidden: false,
    }

    onClickMore = () => {
        const {pokemon} = this.state;
        const s = pokemon.length;
        let e = pokemon.length + 20;
        if(Pokemon.length < pokemon.length + 20){
            e = pokemon.length + (Pokemon.length - pokemon.length);
        };
        const newMons = pokemon.concat(Pokemon.slice(s,e))
        
        if(Pokemon.length < pokemon.length + 20){
            this.setState({pokemon: newMons, hidden: true})
        }
        else{
            this.setState({pokemon: newMons, hidden: false})
        }

    }

    onClickCard = (e) => {
        const pkmn = e.target.getAttribute('value').toLowerCase();
        const name = e.target.getAttribute('name');

        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn}`)
            .then((data) => {

                const res = JSON.parse(data.request.response)

                const mon = {}

                const spriteRes = Object.values(res.sprites);
                const movesRes = res.moves;
                const typesRes = res.types;
                const statsRes = res.stats;
                const idRes = res.id
                const sprites = [];
                const moves = [];
                const types = [];
                const stats = [];

                const fourI = [2, 3, 0, 1]

                let counter = 0;

                for(let i = 0; i < spriteRes.length; i++){
                    if(spriteRes[i] !== null){
                        if(spriteRes[i].includes('female') === false){
                            sprites[fourI[counter]] = spriteRes[i];
                            counter++
                        }
                    }
                };
                for(let i = 0; i < movesRes.length; i++){
                    moves.push(movesRes[i].move);
                };
                for(let i = 0; i < typesRes.length; i++){
                    types.unshift(typesRes[i].type);
                };
                for(let i = 0; i < statsRes.length; i++){
                    const stat = {name: statsRes[i].stat.name,value: statsRes[i].base_stat};
                    stats.unshift(stat);
                };

                mon.name = name;

                if(idRes < 10) mon.id = `00${res.id}`
                else if (idRes >= 10 && idRes < 100) mon.id = `0${res.id}`
                else mon.id = `${res.id}`
                mon.stats = stats;
                mon.sprites = sprites;
                mon.types = types;
                mon.moves = moves;

                console.log(mon.types)

                this.props.sendPokemon(mon)
            })
            .then(() => {
                this.props.toggle();
            })
    }

    render() {
        const {pokemon} = this.state;

        let button = <div className="row">
            <div className="button" onClick={this.onClickMore}>Load More</div>
        </div>

        if(this.state.hidden){
            button = <div className="row hidden">
            <div className="button" onClick={this.onClickMore}>Load More</div>
            </div>
        }

        return (<>
            {pokemon.map((item, i) => {
                let id = ""
                if(i < 9) id = `00${i+1}`;
                else if(i >= 9 && i < 99) id = `0${i+1}`;
                else id = `${i+1}`;
                let name = item;

                if(name === "Nidoran♂") name = "nidoran-m"
                else if(name === "Nidoran♀") name = "nidoran-f"
                else if(name.includes(" ")) name = name.split(" ").join("-")

                return <Card onClick={this.onClickCard} key={i} value={name} name={item} index={id}/>
            })}
            {button}
         </>)
    }

}

export default List;