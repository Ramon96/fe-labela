
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Layout
import SearchFilter from "../layout/search-filter";


// Helpers
import { fetchApi } from "../helpers/fetch-api";
import { sortItems } from "../helpers/sort-items";
import { searchFilter } from "../helpers/search-filter";


// Component Styling
const UnorderdList = styled.ul`
    display: flex;
    list-style: none;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
    margin: 0;
    padding: 0;
    justify-content: center;

    li{
        min-width: 300px;
        min-height: 300px;
        flex-basis: 300px;
        flex-grow: 0;
    }
`;

const AlbumContainer = styled.div`
    position: relative;
    min-height: 100% ;
    transition: transform .3s;
    box-shadow: 0px 10px 5px -8px rgba(0,0,0,0.75);
    h2{
        position: absolute;
        background: rgba(0, 0, 0, .8);
        color: #fff;
        padding: 5px 10px;
        bottom: 5px;
        margin: 0;
    }
    p{
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-weight: bolder;
        background: rgba(0, 0, 0, .8);
        padding: 5px 10px;	
        margin: 0;
    }


    &:hover{
        transform: scale(1.02);
        box-shadow: 0px 15px 5px -8px rgba(0,0,0,0.75);
    }
`;

// component
function Home(){
    const [ albums, setAlbums ] = useState([]);
    const [ filteredAlbums, setFilteredAlbums ] = useState([]);
    const [ filterText, setFilterText ] = useState("");
    const [ sortDirection, setSortDirection ] = useState("");
    const [ sortType, setSortType ] = useState("");

    useEffect(() => {
        fetchApi("De la soul")
            .then(json => {
                setAlbums(json.topalbums);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if(albums.album !== undefined){
            setFilteredAlbums(
                sortItems(searchFilter(albums.album, filterText), sortDirection, sortType)
            );
        }
    }, [ albums, filterText, sortDirection, sortType ]);


    return(
        <React.Fragment>
            <SearchFilter searchHandler={e => setFilterText(e) } sortHandler={(direction, type) => {
                setSortDirection(direction); setSortType(type);
            } } />
            <UnorderdList>
                {filteredAlbums.filter(album => album.name !== "(null)").map((album, i) =>
                    <li key={i}>
                        <Link to={`/detail/${album.artist.name}/${album.name}/`}>
                            <AlbumContainer>
                                <h2>{album.name}</h2>
                                <p>Play count: {album.playcount}</p>
                                {album.image[3]["#text"] !== "" &&
                                 <img src={album.image[3]["#text"]} alt={"Album cover of " + album.name} />
                                }
                            </AlbumContainer>
                        </Link>
                    </li>
                )}
            </UnorderdList>
        </React.Fragment>
    );
}

export default Home;