import React from "react"
import { HeaderContainer } from "./styled";
const Header = () => {
    return (
        <HeaderContainer>
            <a href="#abc">PARACOR</a>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="#abc">Statistics</a></li>
                    <li><a href="#abc">Term</a></li>
                    <li><a href="#abc">Help</a></li>
                    <li><a href="#abc">About</a></li>
                </ul>
            </nav>
        </HeaderContainer>
    )
}

export default Header;
