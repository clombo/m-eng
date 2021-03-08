import React, {useState} from 'react';
import BackButton from '../../../Main/NavSections/BackButton';
import '../../../Calculators/Calculators.css';
import { Link} from 'react-router-dom';
import MassPull from './MassPull';
import DensityFraction from './DensityFraction';
import BulkFlow from './BulkFlow';

function MassBalance() {

    const [components, setState] = useState({
        name: "massPull"
    });

    let handleLinkClick = (e) => {
        e.preventDefault();
        setState({
            name: e.target.name
        });
    }

    
    let renderComponent = () => {
        switch(components.name){
            case "massPull":
                return <MassPull/>
            case "bulkFlow":
                return <BulkFlow/>
            case "densityFraction":
                return <DensityFraction/>
            default:
                return "No component"
        }
    }

    return (
        <div>
            <div className="container">
            <h1 className="pageHeading">MASS BALANCES</h1>
            </div>
            <BackButton/>
            <div className="row mainMenuTileRow justify-content-center">
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile">
                    <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" name="massPull" to="#" onClick={handleLinkClick}>  
                        Mass Pull
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile">
                    <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" name="densityFraction" to="#" onClick={handleLinkClick}>
                        Density Fractions
                    </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-xl-2 smallTile">
                    <Link className="d-flex flex-column align-items-center justify-content-between p-3 block" name="bulkFlow" to="#" onClick={handleLinkClick}>
                        Bulk Flow
                    </Link>
                </div>
            </div>

            
            
            {renderComponent()}


        </div>
    );
}

export default MassBalance;