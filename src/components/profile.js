import React, { Component } from 'react';
import './profile.css';
import Pokemon from './pokemon';
import Movelist from '../containers/movelist';
import Typelist from '../containers/typelist';
import Sprites from '../containers/sprites';
import Stats from '../containers/stats';
import Modal from './modal';
import Loading from './loading';
import Axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      id: null,
      type: [],
      sprites: [],
      stats: [],
      moves: [],
      chain: {},
      modal: {},
      isOpen: false,
      isLoading: true,
    }
  }

  onClickMove = (e) => {
    Axios.get(`https://pokeapi.co/api/v2/move/${e.target.getAttribute('value')}`)
      .then((data) => {
        const res = JSON.parse(data.request.response)
        const move = {}
        const arr = res.name.split("-")
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1);
        };
        move.name = arr.join(" ")
        move.power = res.power;
        move.accuracy = res.accuracy;
        move.pp = res.pp;
        move.category = res['damage_class'].name;
        move.type = res.type.name;
        move.priority = res.priority;

        for (let i = 0; i < res.flavor_text_entries.length; i++) {
          let c = res.flavor_text_entries[i];
          if (c.language.url === "https://pokeapi.co/api/v2/language/9/") {
            move.description = c.flavor_text;
            break;
          };
        };
        return move;
      })
      .then((move) => {
        this.setState({ modal: move, isOpen: true });
      });
  };

  closeModal = (e) => {
    let name = e.target.getAttribute('name');
    if (name !== "modal" && this.state.isOpen === true) this.setState({ isOpen: false });
  };

  getPokemon = () => {
    let pkmn = this.props.match.params.pokemon;
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

    return Axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn}`)
      .then((data) => {
        const res = JSON.parse(data.request.response);
        const mon = {};
        const spriteRes = Object.values(res.sprites);
        const movesRes = res.moves;
        const typesRes = res.types;
        const statsRes = res.stats;
        const idRes = res.id;
        const sprites = [];
        const moves = [];
        const types = [];
        const stats = [];
        const fourI = [2, 3, 0, 1];
        let counter = 0;

        for (let i = 0; i < spriteRes.length; i++) {
          if (spriteRes[i] !== null) {
            if (spriteRes[i].includes('female') === false) {
              sprites[fourI[counter]] = spriteRes[i];
              counter++;
            };
          };
        };
        for (let i = 0; i < movesRes.length; i++) {
          moves.push(movesRes[i].move);
        };
        for (let i = 0; i < typesRes.length; i++) {
          types.unshift(typesRes[i].type);
        };
        for (let i = 0; i < statsRes.length; i++) {
          const stat = { name: statsRes[i].stat.name, value: statsRes[i].base_stat };
          stats.unshift(stat);
        };
        if (idRes < 10) mon.id = `00${res.id}`;
        else if (idRes >= 10 && idRes < 100) mon.id = `0${res.id}`;
        else mon.id = `${res.id}`;
        mon.name = Pokemon[res.id - 1];
        mon.stats = stats;
        mon.sprites = sprites;
        mon.types = types;
        mon.moves = moves;
        return mon;
      })
      .then(mon => {
        return Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pkmn}`)
          .then((res) => {
            return Axios.get(res.data.evolution_chain.url);
          })
          .then((res) => {
            let data = res.data.chain;
            let chain = {};

            if (data.evolves_to.length > 0) {
              chain[0] = data.species.name;
              if (data.evolves_to.length > 0) chain[1] = data.evolves_to[0].species.name;
              let second = data.evolves_to[0].evolves_to;
              if (second.length > 0) chain[3] = second[0].species.name;
            }
            mon.chain = chain;
            return mon;
          });
      });
  };

  componentDidMount() {
    this.getPokemon()
    .then(mon => {
      this.setState({
        name: mon.name,
        id: mon.id,
        type: mon.types,
        sprites: mon.sprites,
        stats: mon.stats,
        moves: mon.moves,
        chain: mon.chain,
        modal: {},
        isOpen: false,
        isLoading: false,
      });
    });
  };

  componentDidUpdate(prevProps){
    if(prevProps.match.params.pokemon !== this.props.match.params.pokemon){
      this.getPokemon()
        .then(mon => {
          this.setState({
            name: mon.name,
            id: mon.id,
            type: mon.types,
            sprites: mon.sprites,
            stats: mon.stats,
            moves: mon.moves,
            chain: mon.chain,
            modal: {},
            isOpen: false,
          });
        });
    };
  };

  render() {
    let pkmn = this.state;
    return (
      this.state.isLoading ? <Loading /> :
      this.state.isOpen ?
      <div onClick={this.closeModal} className="max marginTop">
        <Modal move={this.state.modal} />
        <div className="d-flex center">
          <div>
            <h4># {pkmn.id} - {pkmn.name}</h4>
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pkmn.id}.png`} alt={pkmn.id + '.png'} />
            <Typelist data={pkmn.type} />
          </div>
          <Sprites data={pkmn.sprites} />
        </div>
        <div className="center d-flex">
          <Stats data={pkmn.stats} />
        </div>
        <Movelist data={pkmn.moves} onClickMove={this.onClickMove} />
      </div> :
      <div onClick={this.closeModal} className="max marginTop">
        <div>
          <div className="d-flex center">
            <div>
              <h4># {pkmn.id} - {pkmn.name}</h4>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pkmn.id}.png`} alt={pkmn.id + '.png'} />
              <Typelist data={pkmn.type} />
            </div>
            <Sprites data={pkmn.sprites} />
          </div>
        </div>
        <div className="center d-flex">
          <Stats data={pkmn.stats} />
        </div>
        <Movelist data={pkmn.moves} onClickMove={this.onClickMove} />
      </div>);
  };
};

export default Profile;