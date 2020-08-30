import React, { Component } from 'react';
import styled from 'styled-components';


// Component Styling
const SearchWrapper = styled.div`
    padding: 15px 0;

    input{
        margin: 15px auto;
        display: block;
        background: #000;
        color: #fff;
        padding: 15px;
        font-size: 18px;
        border: none;
        border-radius: 5px;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    button{
        background-color: #fb0;
        color: #222;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        transition: .4s;
        &:hover{
            background-color: #ffc900;
            cursor: pointer;
        }
    }
`;


// Component
class SearchFilter extends Component{

    constructor(props){
        super(props);

        this.state = {
            sort: "asc"
        };

        this.sortDirection = this.sortDirection.bind(this);
        this.alphabetSort = this.alphabetSort.bind(this);
        this.playcountSort = this.playcountSort.bind(this);
    }

    alphabetSort(){
        this.props.alphabetHandler();
    }

    playcountSort(){
        this.props.playcountHandler();
    }

    sortDirection(){
        switch(this.state.sort){
        case "asc":
            this.setState({sort: "desc"});
            break;
        case "desc":
            this.setState({sort: "asc"});
            break;
        default:
            this.setState({sort: "asc"});
        }
        this.props.sortHandler(this.state.sort);
    }

    componentDidMount(){
        this.sortDirection();
    }


    render(){
        return(
            <SearchWrapper>
                <input name="actor" placeholder="Seach album" type="text" onChange={ e => this.props.searchHandler(e.target.value)}/>
                <ButtonWrapper>
                    <button onClick={this.alphabetSort}>Sort by Alphabet </button>
                    <button onClick={this.playcountSort}>Sort by play count </button>
                    <button onClick={this.sortDirection}>{this.state.sort}</button>
                </ButtonWrapper>
            </SearchWrapper>
        );
    }
}

export default SearchFilter;