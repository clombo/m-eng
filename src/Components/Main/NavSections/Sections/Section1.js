import React from 'react';
import '../NavSection.css';
import { Link } from 'react-router-dom';

function Section1() {
    return(

        <div className="row mainMenuTileRow justify-content-center">

            <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile smallTile_mill">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/mill">
                    <div>
                        <p>AG/SAG/Ball Mill</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile smallTile_hydrocyclone" >
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/hydro">
                    <div>
                        <p>Hydrocyclone</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile smallTile_thickener">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/thick">
                    <div>
                        <p>Thickener Calculator</p>
                    </div>
                </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile smallTile_generic">
                <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" to="/mass-bal">
                    <div>
                        <p>Mass Balance</p>
                    </div>
                </Link>
            </div>
            
        </div>
    );
}

export default Section1;