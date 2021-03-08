import React from 'react';
import './NavSection.css';

function BackButton() {
    return (
        <div>
            <hr></hr>
            <div>
                <div>
                    <div className="backButton">
                        <a href="/">
                            <div>
                                <p className="backButtonStyle">Exit Calculator</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackButton;