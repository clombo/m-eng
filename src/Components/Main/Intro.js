import React from 'react';
import './Intro.css';

function Intro(){
    return(
        <div className="container Intro">

            <h3>This online calculator is a free tool.</h3>

            <p className="introduction">
                You are invited to contribute to this service with your technical ingenuity, and thus help keeping this a free service.
                <br></br>
                You can add value by suggesting the sizing calculators or features you want to see next, or just by identifying bugs.
                <br></br>
                Please email your input to: <a href="mailto:engineer@metengineer.com" >engineer@metengineer.com</a>
            </p>

        </div>
    )
}

export default Intro;