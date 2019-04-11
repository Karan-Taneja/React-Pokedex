import React, {Component} from 'react';
import './list.css';
import { Link } from 'react-router-dom';
import Pokemon from '../components/pokemon';
import Card from '../components/card';
import InfiniteScroll from 'react-infinite-scroller';

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

    render() {
        const {pokemon} = this.state;

        let button = <div className="row" key={0}>
            <div className="button" onClick={this.onClickMore}>Loading</div>
        </div>

        if(this.state.hidden){
            button = <></>
        }

        return (<div>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.onClickMore}
                hasMore={!this.state.hidden}
                loader={button}
            >
            {pokemon.map((item, i) => {
                let id = "";
                if(i < 9) id = `00${i+1}`;
                else if(i >= 9 && i < 99) id = `0${i+1}`;
                else id = `${i+1}`;
                let name = item;
                if(name === "Nidoran♂") name = "nidoran-m";
                else if(name === "Nidoran♀") name = "nidoran-f";
                else if(name.includes("Null")) name = "type-null";
                else if(name.includes("Mr")) name = "mr-mime";
                else if(name.includes("Jr.")) name = "mime-jr";
                else if(name.includes("Farfetch")) name = "farfetchd";
                else if(name.includes(" ")) name = name.split(" ").join("-");
                return <Link to={`/${name}`} key={i}><Card value={name} name={item} index={id}/></Link>
            })}  
            </InfiniteScroll>
         </div>)
    }

}

export default List;