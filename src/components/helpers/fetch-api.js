// const url
// TODO move this to dotenv
// const apiKey = "4ad77daac96e29666e6e0ddbe6b2ac49";
const apiKey = "1aaad00b79616cd27e4831f557348ef1";

export async function fetchApi(artist){
    let request = fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${apiKey}&format=json`);

    let respons = await request;
    let handleRespons = await respons.json();

    return handleRespons;
}

async function fetchArtist(artist){
    let request = fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`);

    let respons = await request;
    let handleRespons = await respons.json();

    return handleRespons;
}

export async function fetchAlbum(artist, album){
    let request = fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artist}&album=${album}&format=json`);

    let respons = await request;
    let handleRespons = await respons.json();

    return handleRespons;
}