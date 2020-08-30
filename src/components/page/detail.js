
import React, { Component } from 'react';
import styled from 'styled-components';

// Helpers
import { fetchAlbum } from '../helpers/fetch-api';


// Component Styling
const AboutAlbum = styled.div`
    display: grid;

    grid-template-rows: auto;
    grid-template-areas:  "titles album"
                           "about album";
  grid-template-columns: repeat(2, 1fr);

    margin: 40px 50px;
    
    img{
        grid-area: album;
        justify-self: center;
    }

    @media(max-width: 768px) {
            grid-template-areas:  "album album"
            "titles titles"
                           "about about";
    }
`;

const AlbumTitles = styled.div`
    grid-area: titles;
`;

const AlbumDetails = styled.div`
    grid-area: about;

`;

const AlbumTaggs = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    li{
        border: solid 1px #2b65d9;
        border-radius: 5px;
        color: #2b65d9;
        padding: 5px 15px;
    }
`;


const PlayStats = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-evenly;
`;

const AlbumTracks = styled.div`
    display: block;
    margin: auto;
    max-width: 500px;
    ul{
    max-height: 500px;
    overflow-Y: scroll;
    li{
        font-weight: bolder;
        display: flex;
        justify-content: space-between;
    }
    }
`;



// Compnent
class detail extends Component {

    constructor(props){
        super(props);

        this.state = {
            artist: "",
            image: "",
            listeners: 0,
            playcount: 0,
            name: "",
            tracks: [],
            wiki: [],
            tags: []
        };
    }

    componentDidMount(){
        fetchAlbum(this.props.match.params.artist, this.props.match.params.id)
            .then(result =>{
                console.log(result);
                this.setState({
                    artist: result.album.artist,
                    image: result.album.image[5]["#text"],
                    listeners: result.album.listeners,
                    playcount: result.album.playcount,
                    name: result.album.name,
                    tracks: result.album.tracks.track,
                    wiki: result.album.wiki,
                    tags: result.album.tags.tag
                });
            });

    }

    render() {
        const { tracks, tags } = this.state;
        return (
            <div>
                <AboutAlbum>
                    <AlbumTitles>
                        <h1>{this.state.name}</h1>
                        <div>{this.state.artist}</div>
                    </AlbumTitles>

                    <img src={this.state.image} alt={"album cover of " + this.state.name} />

                    <AlbumDetails>
                        { this.state.wiki != undefined &&
                        <div>
                            <p><b>Published:</b> {this.state.wiki.published}</p>
                            <p dangerouslySetInnerHTML={{__html: this.state.wiki.summary}}></p>
                        </div>
                        }

                        <AlbumTaggs>
                            {tags.map((tag, i) =>
                                <li key={i}>
                                    {tag.name}
                                </li>
                            )}
                        </AlbumTaggs>
                    </AlbumDetails>
                </AboutAlbum>
                <PlayStats>
                    <p> <b>Listeners:</b> {this.state.listeners}</p>
                    <p> <b>Times played:</b>  {this.state.playcount} </p>
                </PlayStats>
                <AlbumTracks>
                    <h2>tracks</h2>
                    <ul>
                        {tracks.map((track, i) =>
                            <li key={i}>
                                <p>{track.name}</p> <p> {track.duration}s </p>
                            </li>
                        )}
                    </ul>
                </AlbumTracks>



            </div>
        );
    }
}

export default detail;