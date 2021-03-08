import  React from 'react';
import './Header.css';

function Header(){
    return (
        <div>
            <img src = {process.env.PUBLIC_URL +'/img/me10g_beta.png'} alt = "Debate" className="logoImg"></img>

            <br></br>

            <h4 className="tagline">The Metallurgical Engineer's Toolbox</h4>
        </div>
    );
}

export default Header;