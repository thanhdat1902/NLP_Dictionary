import React, { useState } from "react"
import { HeaderContainer } from "./styled";
import { NavLink } from "react-router-dom"
const Header = () => {
    const [active, setActive] = useState('H');
    const handleActive = (tool) => {
        setActive(tool);
    }
    return (
        <HeaderContainer>
            <NavLink to="/" onClick={() => handleActive('H')}>PARACOR</NavLink>
            <nav>
                <ul>
                    <li className={active==='H'?'active': ''}><NavLink to="/" onClick={() => handleActive('H')}>Home</NavLink></li>
                    <li className={active==='S'?'active': ''}><NavLink to="/search" onClick={() => handleActive('S')}>Search</NavLink></li>
                    <li className={active==='ST'?'active': ''}><NavLink to="/statistics" onClick={() => handleActive('ST')}>Statistics</NavLink></li>
                    <li className={active==='A'?'active': ''}><NavLink to="/about" onClick={() => handleActive('A')}>About</NavLink></li>
                </ul>
            </nav>
        </HeaderContainer>
    )
}

export default Header;
