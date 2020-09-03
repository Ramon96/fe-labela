
// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Images
import Logo from "../../img/logo.png";


// Component styling
const HeaderNav = styled.nav`
    background-color: #000;
    display: flex;
    justify-content: center;
    padding: 15px 0;
`;

function Header() {
    return (
        <HeaderNav>
            <Link to="/">
                <img src={Logo} alt="Last.fm Logo" />
            </Link>
        </HeaderNav>
    );
}

export default Header;