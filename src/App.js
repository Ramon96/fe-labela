
// Dependencies
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import OpenSans from './fonts/OpenSans-Regular.ttf';

// Pages
import Home from './components/page/home';
import Detail from './components/page/detail';

// Layout
import Header from './components/layout/header';

// Component styling

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSans});
        font-weight: normal;
        font-style: normal;
    }

    body{
        margin: 0;
    }
`;

const Body = styled.div`
    font-family: "Open Sans";
`;


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            favorites: []
        };

        this.favoritesHandler = this.favoritesHandler.bind(this);

    }

    favoritesHandler(album){
        // if the album is not in the favorites array yet.
        if(this.state.favorites.indexOf(album) === -1){
            console.log('add favorite');
            // add to favorites
            this.state.favorites.push(album);
        }
        // if the album is in the favorites album
        else{
            // remove from favorites

            this.setState({favorites: this.state.favorites.filter(item => item.name == album.name)});

            // const favoritesArr = [...this.state.favorites];
            // console.log('remove ' + album.name)
            // favoritesArr.filter(item => {
            //     console.log(item.name)
            //    return item.name == album.name
            // });
            // console.log(favoritesArr)
            // this.setState({favorites: favoritesArr});
        }

        console.log(this.state.favorites);
    }


    render(){

        return (
            <Body className='App'>
                <GlobalStyles />
                <Router basename="/">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={ () => <Home favoritesHandler={this.favoritesHandler} />} ></Route>
                        <Route path="/detail/:artist/:id" component={ Detail }></Route>
                    </Switch>
                </Router>
            </Body>

        );
    }
}

export default App;