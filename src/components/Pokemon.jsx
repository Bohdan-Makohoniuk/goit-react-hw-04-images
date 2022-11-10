import { Component } from 'react';

export default class Pokemon extends Component{
    state = {
        pokemon:null
    }
    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.pokemonName;
        const nextName = this.props.pokemonName;

        if (prevName !== nextName) {
            
        }
    }
    

    
}



