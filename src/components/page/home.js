
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Layout
import SearchFilter from '../layout/search-filter';


// Helpers
import { fetchApi } from '../helpers/fetch-api';


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
    -webkit-box-shadow: 0px 10px 5px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 5px -8px rgba(0,0,0,0.75);
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
-webkit-box-shadow: 0px 15px 5px -8px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 15px 5px -8px rgba(0,0,0,0.75);
box-shadow: 0px 15px 5px -8px rgba(0,0,0,0.75);
    }
`;

// component
class home extends Component {

    constructor(props){
        super(props);

        this.state = {
            albums: [],
            filter: "",
            sortDirection: "",
            sortType: "alphabet"
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.alphabetHandler = this.alphabetHandler.bind(this);
        this.playcountHandler = this.playcountHandler.bind(this);
        this.addFavorites = this.addFavorites.bind(this);
    }

    searchHandler(value){
        this.setState({filter: value});
    }

    sortHandler(direction){
        this.setState({sortDirection: direction});
    }

    alphabetHandler(){
        this.setState({sortType: "alphabet"});
    }
    playcountHandler(){
        this.setState({sortType: "count"});

    }

    addFavorites(id){
        this.props.favoritesHandler(id);

    }

    componentDidMount(){
        fetchApi('De la soul')
            .then(albumsJson => {
                console.log(albumsJson);
                this.setState({albums: albumsJson.topalbums.album});
            });
    }

    render() {
        const { albums, filter, sortDirection, sortType } = this.state;

        const sortedAlbums = albums.sort( (a, b) =>{
            // alphabet
            if(sortType == "alphabet") {
                const isDesc = ( sortDirection === "asc") ? 1 : -1;
                return isDesc * a.name.localeCompare(b.name);
            }

            // number
            // If i where to sort by date's I would use something like : https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
            else if(sortType == "count"){
                const isDesc = ( sortDirection === "asc") ? 1 : -1;
                return isDesc * (a.playcount - b.playcount);
            }
        });


        const filteredAlbums = sortedAlbums.filter(album => {
            return album.name.toLowerCase().includes(filter);
        });
        return (
            <React.Fragment>
                <SearchFilter searchHandler={this.searchHandler} sortHandler={this.sortHandler} alphabetHandler={this.alphabetHandler} playcountHandler={this.playcountHandler} />
                <UnorderdList>
                    {filteredAlbums.filter(album => album.name !== "(null)").map((album, i) =>

                        <li key={i}>
                            <Link to={`/detail/${album.artist.name}/${album.name}/`}>
                                <AlbumContainer>
                                    <h2>{album.name}</h2>
                                    <p>Play count: {album.playcount}</p>
                                    {album.image[3]["#text"] != "" &&
                                    <img src={album.image[3]["#text"]} alt={"Album cover of " + album.name} />
                                    }
                                    {/* TODO placeholder image if there is no album cover */}
                                </AlbumContainer>
                            </Link>
                            {/* TODO make this button into a component */}
                            <button onClick={() => {
                                this.addFavorites(album);
                            }}> Add to favorites </button>
                        </li>
                    )}
                </UnorderdList>
            </React.Fragment>

        );
    }
}

export default home;