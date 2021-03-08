import React from 'react';
import '../NavSection.css';
import { Link } from 'react-router-dom';

function Section3(){
    return(
        <div className="row mainMenuTileRow justify-content-center">

            <div className="col-12 col-sm-6 col-md-6 col-xl-2 smallTile smallTile_trommel">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/trommel">
                    <div>
                        <p>Trommel Screen</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile smallTile_screening">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/screening">
                    <div>
                        <p>Screening Area</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-xl-2 smallTile smallTile_screening">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/rosin">
                    <div>
                        <p>Rosin-Rammler</p>
                    </div>
                </Link>
            </div>

        </div>
    );
}

export default Section3;