import React, { useState, useEffect } from "react";
import styled from "styled-components";


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

function SearchFilter(props){
    const [ sortType, setSortType ] = useState("alphabet");
    const [ sort, setSort ] = useState("asc");

    function updateParent(){
        props.sortHandler(sort, sortType);
    }

    useEffect(() => {
        updateParent();
    }, );

    return(
        <SearchWrapper>
            <input name="actor" placeholder="Seach album" type="text" onChange={ e => this.props.searchHandler(e.target.value)}/>
            <ButtonWrapper>
                <button onClick={ () => setSortType("alphabet") }>Sort by Alphabet </button>
                <button onClick={ () => setSortType("count")}>Sort by play count </button>
                <button onClick={ () => sort === "asc" ? setSort("desc") : setSort("asc")}>{sort}</button>
            </ButtonWrapper>
        </SearchWrapper>
    );
}

export default SearchFilter;