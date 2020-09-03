import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Helpers
import { fetchAlbum } from "../helpers/fetch-api";

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

// Component
function Detail({match}){
    const [ album, setAlbum ] = useState([]);

    useEffect(() => {
        fetchAlbum( match.params.artist, match.params.id)
            .then(result => {
                // the use state setter is async.
                setAlbum(result.album);
            });
    }, []);

    useEffect(() => {
        // logging for development purposes
        console.log("album");
        console.log(album);
    }, [ album ]);

    return (
        <div>
            <AboutAlbum>
                <AlbumTitles>
                    <h1>{album.name}</h1>
                    <div>{album.artist}</div>
                </AlbumTitles>
                {/* null could be replaced with an placeholder img */}
                <img src={album.image ? album.image[5]["#text"] : null } alt={"album cover of " + album.name} />
                <AlbumDetails>
                    { album.wiki !== undefined &&
                         <div>
                             <p><b>Published:</b> {album.wiki.published}</p>
                             <p dangerouslySetInnerHTML={{__html: album.wiki.summary}}></p>
                         </div>
                    }
                    <AlbumTaggs>
                        {album.tags ? album.tags.tag.map((tag, i) =>
                            <li key={i}>
                                {tag.name}
                            </li>
                        ) : null}
                    </AlbumTaggs>
                </AlbumDetails>
            </AboutAlbum>
            <PlayStats>
                <p> <b>Listeners:</b> {album.listeners}</p>
                <p> <b>Times played:</b>  {album.playcount} </p>
            </PlayStats>
            <AlbumTracks>
                <h2>tracks</h2>
                <ul>
                    { album.tracks ? album.tracks.track.map((track, i) =>
                        <li key={i}>
                            <p>{track.name}</p> <p> {track.duration}s </p>
                        </li>
                    ) : null}
                </ul>
            </AlbumTracks>
        </div>
    );
}

export default Detail;