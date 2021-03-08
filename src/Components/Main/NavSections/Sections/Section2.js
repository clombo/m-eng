import React from 'react';
import '../NavSection.css';
import { Link } from 'react-router-dom';

function Section2(){
    return(
        <div className="row mainMenuTileRow justify-content-center">

            <div className="col-12 col-sm-6 col-md-6 col-xl-2 smallTile smallTile_vibratingfeeder">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/feeder">
                    <div>
                        <p>Vibrating Feeder</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-xl-2 smallTile smallTile_beltconveyor">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/belt-conv">
                    <div>
                        <p>Belt Conveyor</p>
                    </div>
                </Link>
            </div>

        </div>
    );
}

export default Section2;