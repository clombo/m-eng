import React from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';

class ScreeningArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DeckInstallAngle: 0, DeckNumber: 1, ScreeningEff: 90,
            ApertureWidht: 3, RoundApertures: 0, ApertureLength: 16, OpenArea: 31,

            SolidThroughput: 100, SolidDensity: 2.76, BulkDensity: 1.7, LiquidMedium: 0, LiquidDensity: 1, TotalThroughput: 0, BulkVolThroughput: 0, ProcessConditions: 1.3,
            MoistureContent: 4,

            Perc_FeedPassing3: 60, Perc_FeedPassing15: 40, GenericParticleShape: 1,

            ScreeningRate: 0, ScreeningAreaReq: 0, Deck_text: 'Horizontal'
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.ScreeningAreaCalc())
    };

    handleFormChange(event) {
        this.setState(this.ScreeningAreaCalc({name: event.target.name, value: event.target.value}))
    }

    ScreeningAreaCalc(data){

        var _DeckInstallAngle = this.state.DeckInstallAngle ; 
        var _DeckNumber = this.state.DeckNumber ;
        var _ScreeningEff = this.state.ScreeningEff ;
        var _ApertureWidht = this.state.ApertureWidht ;
        var _RoundApertures = this.state.RoundApertures ;
        var _ApertureLength = this.state.ApertureLength ; 
        var _OpenArea = this.state.OpenArea ;

        var _SolidThroughput = this.state.SolidThroughput ; 
        var _SolidDensity = this.state.SolidDensity ;
        var _BulkDensity = this.state.BulkDensity ;
        var _LiquidMedium = this.state.LiquidMedium ;
        var _LiquidDensity = this.state.LiquidDensity ; 
        var _TotalThroughput = this.state.TotalThroughput ;
        var _BulkVolThroughput = this.state.BulkVolThroughput ; 
        var _ProcessConditions = this.state.ProcessConditions ;
        var _MoistureContent = this.state.MoistureContent ;

        var _Perc_FeedPassing3 = this.state.Perc_FeedPassing3 ; 
        var _Perc_FeedPassing15 = this.state.Perc_FeedPassing15 ; 
        var _GenericParticleShape = this.state.GenericParticleShape ;

        var _ScreeningRate = this.state.ScreeningRate ; 
        var _ScreeningAreaReq = this.state.ScreeningAreaReq ;
        var _Deck_text = this.state.Deck_text;


        var halfsize_cfactor
        var aperture_cfactor
        var slot_ratio_cfactor
        var open_area_cfactor_var
        var wet_cfactor_var
        var moisture_content_cfactor_var
        var bulk_density_cfactor
        var undersize_cfactor
        var partile_shape_cfactor
        var stons_cfactor
        var ft2_cfactor

        if(data){
            switch(data.name){
                case "DeckInstallAngle":
                    _DeckInstallAngle = data.value
                    break;
                case "DeckNumber":
                    _DeckNumber = data.value
                    break;
                case "ScreeningEff":
                    _ScreeningEff = data.value
                    break;
                case "ApertureWidht":
                    _ApertureWidht = data.value
                    break;
                case "RoundApertures":
                    _RoundApertures = data.value
                    break;
                case "ApertureLength":
                    _ApertureLength = data.value
                    break;
                case "OpenArea":
                    _OpenArea = data.value
                    break;
                case "SolidThroughput":
                    _SolidThroughput = data.value
                    break;
                case "SolidDensity":
                    _SolidDensity = data.value
                    break;
                case "BulkDensity":
                    _BulkDensity = data.value
                    break;
                case "LiquidMedium":
                    _LiquidMedium = data.value
                    break;
                case "TotalThroughput":
                    _TotalThroughput = data.value
                    break;
                case "LiquidDensity":
                    _LiquidDensity = data.value
                    break;
                case "BulkVolThroughput":
                    _BulkVolThroughput = data.value
                    break;
                case "ProcessConditions":
                    _ProcessConditions = data.value
                    break;
                case "MoistureContent":
                    _MoistureContent = data.value
                    break;
                case "Perc_FeedPassing3":
                    _Perc_FeedPassing3 = data.value
                    break;
                case "Perc_FeedPassing15":
                    _Perc_FeedPassing15 = data.value
                    break;
                case "GenericParticleShape":
                    _GenericParticleShape = data.value
                    break;
                case "ScreeningRate":
                    _ScreeningRate = data.value
                    break;
                case "ScreeningAreaReq":
                    _ScreeningAreaReq = data.value
                    break;
                default:
                    break;
            }
        }

        var open_area_frac_var = _OpenArea/100;

        var deck_angle_cfactor = 1/(1 + 0.01*(20 - _DeckInstallAngle*(-1))); // Calculated as the downwards declined being a negative number - illustration required
        
        //CHANGE!!
        if (_DeckInstallAngle === 0) {
          _Deck_text = "Horizontal";
        } else if (_DeckInstallAngle < 0) {
            _Deck_text = "Material Flow Sloped Downwards (Max 30 degrees)";
        } else {
            _Deck_text = "Material Flow Slope Uphill (Max 10 degrees)";
        }

        // Deck - number
        var deck_no_cfactor = Math.pow(0.9,_DeckNumber - 1);

        // Efficiency is fixed with this method at 90%. Can be included later.
        var screening_efficiency_frac_var = _ScreeningEff/100;  // Efficiency definition only applicable between 70% and 98%
        var screening_efficiency_cfactor

        if (screening_efficiency_frac_var < 0.75 && screening_efficiency_frac_var >= 0.7) {
            screening_efficiency_cfactor = -3.47826086956521*screening_efficiency_frac_var + 4.08695652173913;
        } else if (screening_efficiency_frac_var < 0.80 && screening_efficiency_frac_var >= 0.75) {
            screening_efficiency_cfactor = -3.47826086956521*screening_efficiency_frac_var + 4.08695652173913;
        } else if (screening_efficiency_frac_var < 0.85 && screening_efficiency_frac_var >= 0.80) {
            screening_efficiency_cfactor = -2.60869565217391*screening_efficiency_frac_var + 3.39130434782609;
        } else if (screening_efficiency_frac_var < 0.90 && screening_efficiency_frac_var >= 0.85) {
            screening_efficiency_cfactor = -3.47826086956522*screening_efficiency_frac_var + 4.13043478260869;
        } else if (screening_efficiency_frac_var < 0.92 && screening_efficiency_frac_var >= 0.90) {
            screening_efficiency_cfactor = -3.04347826086956*screening_efficiency_frac_var + 3.7391304347826;
        } else if (screening_efficiency_frac_var < 0.94 && screening_efficiency_frac_var >= 0.92) {
            screening_efficiency_cfactor = -3.47826086956524*screening_efficiency_frac_var + 4.13913043478263;
        } else if (screening_efficiency_frac_var < 0.96 && screening_efficiency_frac_var >= 0.94) {
            screening_efficiency_cfactor = -2.17391304347826*screening_efficiency_frac_var + 2.91304347826087;
        } else if (screening_efficiency_frac_var <= 0.98 && screening_efficiency_frac_var >= 0.96) {
            screening_efficiency_cfactor = -2.17391304347826*screening_efficiency_frac_var + 2.91304347826087;
        }

        // Aperture Correction Factor
        if (_ApertureWidht < 25.4) {
            aperture_cfactor = 0.3186552 +0.3490635*_ApertureWidht -0.000334*Math.pow(_ApertureWidht,2) -0.000593*Math.pow(_ApertureWidht,3) +0.0000149*Math.pow(_ApertureWidht,4);
        } else {
            aperture_cfactor = 3.5469 +0.0733718*_ApertureWidht;
        }

        

        // Throughput feed rate per ft²  [(t/h)/ft²]
        var specific_throughput_tphpft2_var = deck_angle_cfactor*deck_no_cfactor * screening_efficiency_cfactor *
            aperture_cfactor * slot_ratio_cfactor * open_area_cfactor_var *
            wet_cfactor_var * moisture_content_cfactor_var * bulk_density_cfactor *
            undersize_cfactor * halfsize_cfactor * partile_shape_cfactor * stons_cfactor * ft2_cfactor;

        // Aperture Shape Slot ratio Correction Factor
        var slot_ratio_var = _ApertureLength/_ApertureWidht;
        

        if (slot_ratio_var < 1) {
            slot_ratio_cfactor = 0.2*slot_ratio_var + 0.8;
        } else if (slot_ratio_var >= 1 && slot_ratio_var < 2) {
            slot_ratio_cfactor = 0.15*slot_ratio_var + 0.85;
        } else if (slot_ratio_var >= 2 && slot_ratio_var < 3) {
            slot_ratio_cfactor = 0.05*slot_ratio_var + 1.05;
        } else if (slot_ratio_var >= 3 && slot_ratio_var < 4) {
            slot_ratio_cfactor = 0.05*slot_ratio_var + 1.05;
        } else {
            slot_ratio_cfactor = 1.25;
        }

        // Open Area Correction Factor
        if (_BulkDensity > 0.800923168698007) {
            open_area_cfactor_var = open_area_frac_var/0.5;
        } else {
            open_area_cfactor_var = open_area_frac_var/0.6;
        }

        // Wet screening correction factor - based on opening size

        if (_ApertureWidht < 0.79375) {
            wet_cfactor_var = 0.062992125984252*_ApertureWidht + 1.2;
        } else if (_ApertureWidht >= 0.79375 && _ApertureWidht < 3.175) {
            wet_cfactor_var = 0.0*_ApertureWidht + 1.25;
        } else if (_ApertureWidht >= 3.175 && _ApertureWidht < 4.7625) {
            wet_cfactor_var = 0.0944881889763779*_ApertureWidht + 0.95;
        } else if (_ApertureWidht >= 4.7625 && _ApertureWidht < 6.35) {
            wet_cfactor_var = 0.0*_ApertureWidht + 1.4;
        } else if (_ApertureWidht >= 6.35 && _ApertureWidht < 7.9375) {
            wet_cfactor_var = -0.125984251968504*_ApertureWidht + 2.2;
        } else if (_ApertureWidht >= 7.9375 && _ApertureWidht < 12.7) {
            wet_cfactor_var = 0.0*_ApertureWidht + 1.2;
        } else if (_ApertureWidht >= 12.7 && _ApertureWidht < 14.2875) {
            wet_cfactor_var = -0.0629921259842519*_ApertureWidht + 2;
        } else if (_ApertureWidht >= 14.2875 && _ApertureWidht < 25.4) {
            wet_cfactor_var = 0.0*_ApertureWidht + 1.1;
        } else if (_ApertureWidht >= 25.4 && _ApertureWidht < 28.575) {
            wet_cfactor_var = -0.031496062992126*_ApertureWidht + 1.9;
        } else {
            wet_cfactor_var = 1;
        }

        // Moisture content correction Factor
        var moisture_content_frac_var = _MoistureContent/100; // this is a duplicate isnt it!!!!!

        if (moisture_content_frac_var < 0.029) {
            moisture_content_cfactor_var = 1;
        } else if (moisture_content_frac_var >= 0.029 && moisture_content_frac_var < 0.031) {
            moisture_content_cfactor_var = -75*moisture_content_frac_var + 3.175;
        } else if (moisture_content_frac_var >= 0.031 && moisture_content_frac_var < 0.059) {
            moisture_content_cfactor_var = 0*moisture_content_frac_var + 0.85;
        } else if (moisture_content_frac_var >= 0.059 && moisture_content_frac_var < 0.061) {
            moisture_content_cfactor_var = -50*moisture_content_frac_var + 3.8;
        } else if (moisture_content_frac_var >= 0.061 && moisture_content_frac_var < 0.4) {
            moisture_content_cfactor_var = 0*moisture_content_frac_var + 0.75; // Note the maximum moisture restriction is defined here as 40%, thereafter the flow is considered wet.
        } else {
            moisture_content_cfactor_var = 1;
        }

        var condition_var = _ProcessConditions;
        if (condition_var !== 1) {
            wet_cfactor_var = 1; // var not required here...
            // Dry
        } else if (condition_var === 1) {
            moisture_content_cfactor_var = 1; // var not required here...
            // Wet
        } // the else case of "Wet deficient moist" can be defined here later


        // Bulk Density Correction Factor
        bulk_density_cfactor = _BulkDensity*0.624279605761446;

        // Undersize correction factor
        var undersize_frac_var = _Perc_FeedPassing3/100;
        var oversize_frac_var = 1 - undersize_frac_var;
        if (oversize_frac_var < 0.2) {
            undersize_cfactor = 0.266666666666666*oversize_frac_var + 0.914666666666667;
        } else if (oversize_frac_var < 0.35 && oversize_frac_var >= 0.20) {
            undersize_cfactor = 0.6*oversize_frac_var + 0.848;
        } else if (oversize_frac_var < 0.41 && oversize_frac_var >= 0.35) {
            undersize_cfactor = 0.7*oversize_frac_var + 0.813;
        } else if (oversize_frac_var < 0.45 && oversize_frac_var >= 0.41) {
            undersize_cfactor = 0.75*oversize_frac_var + 0.7925;
        } else if (oversize_frac_var < 0.50 && oversize_frac_var >= 0.45) {
            undersize_cfactor = 0.94*oversize_frac_var + 0.707;
        } else if (oversize_frac_var < 0.55 && oversize_frac_var >= 0.50) {
            undersize_cfactor = 1.16*oversize_frac_var + 0.597;
        } else if (oversize_frac_var < 0.57 && oversize_frac_var >= 0.55) {
            undersize_cfactor = 1.3*oversize_frac_var + 0.52;
        } else if (oversize_frac_var < 0.605 && oversize_frac_var >= 0.57) {
            undersize_cfactor = 1.525*oversize_frac_var + 0.39175;
        } else if (oversize_frac_var < 0.70 && oversize_frac_var >= 0.605) {
            undersize_cfactor = 2.375*oversize_frac_var -0.1225;
        } else if (oversize_frac_var < 0.80 && oversize_frac_var >= 0.70) {
            undersize_cfactor = 4.6*oversize_frac_var -1.68;
        } else if (oversize_frac_var < 0.875 && oversize_frac_var >= 0.80) {
            undersize_cfactor = 13.3333333333333*oversize_frac_var -8.66666666666667;
        } else if (oversize_frac_var < 0.91 && oversize_frac_var >= 0.875) {
            undersize_cfactor = 28.5714285714285*oversize_frac_var -22;
        } else if (oversize_frac_var < 1.00 && oversize_frac_var >= 0.91) {
            undersize_cfactor = 0.0*oversize_frac_var + 4.0;   // the maximum defined here as 1.000 (100%) or is it 91% ?????
        }




        // Halfsize correction factor
        var halfsize_frac_var = _Perc_FeedPassing15/100;
        
        if (halfsize_frac_var < 0.15) {
            halfsize_cfactor = 1.00933333333333*halfsize_frac_var + 0.4;
        } else if (halfsize_frac_var < 0.20 && halfsize_frac_var >= 0.15) {
            halfsize_cfactor = 1.2524*halfsize_frac_var + 0.36354;
        } else if (halfsize_frac_var < 0.25 && halfsize_frac_var >= 0.20) {
            halfsize_cfactor = 1.7196*halfsize_frac_var + 0.2701;
        } else if (halfsize_frac_var < 0.85 && halfsize_frac_var >= 0.25) {
            halfsize_cfactor = 2.0*halfsize_frac_var + 0.2;
        } else if (halfsize_frac_var <= 1.000 && halfsize_frac_var >= 0.85) {
           halfsize_cfactor = 2.0*halfsize_frac_var + 0.2; // the maximum defined here as 1.000 (100%)
        }

        // document.getElementById("half_aperture_return_id").innerHTML = _ApertureWidht/2;


        // Particle Shape Correction Factor
        partile_shape_cfactor = _GenericParticleShape;
        partile_shape_cfactor = parseFloat(partile_shape_cfactor);



        // Unit conversions:
        // Short tons correction factor
        stons_cfactor = 1/1.102311310924;
        // ft2 correction factor
        ft2_cfactor = 1/(Math.pow(0.3048,2));



        

        
        var screenDrainageArea_m2_var = _SolidThroughput/specific_throughput_tphpft2_var;
        

        // Calcs
        var slurry_tph_var = _SolidThroughput/(1-moisture_content_frac_var); // bulk
        var liquid_m3ph_var = (slurry_tph_var - _SolidThroughput)/_LiquidDensity;
        var slurry_m3ph_var = _SolidThroughput/_BulkDensity;  // bulk

        _LiquidMedium = liquid_m3ph_var.toFixed(3)
        _TotalThroughput = slurry_tph_var.toFixed(3)
        _BulkVolThroughput = slurry_m3ph_var.toFixed(3)

        _ScreeningRate = specific_throughput_tphpft2_var.toFixed(3)
        _ScreeningAreaReq = screenDrainageArea_m2_var.toFixed(3)



        // if (_ProcessConditions != 1) {
        //     document.getElementById("moisture_content_perc_id").style.display = "block";
        //     document.getElementById("liquid_m3ph_id").style.display = "block";
        //     document.getElementById("slurry_tph_id").style.display = "block";
        // } else {
        //     document.getElementById("moisture_content_perc_id").style.display = "none";
        //     document.getElementById("liquid_m3ph_id").style.display = "none";
        //     document.getElementById("slurry_tph_id").style.display = "none";
        // }

        return {
            DeckInstallAngle: _DeckInstallAngle, 
            DeckNumber: _DeckNumber, 
            ScreeningEff: _ScreeningEff,
            ApertureWidht: _ApertureWidht, 
            RoundApertures: _RoundApertures, 
            ApertureLength: _ApertureLength, 
            OpenArea: _OpenArea,

            SolidThroughput: _SolidThroughput, 
            SolidDensity: _SolidDensity, 
            BulkDensity: _BulkDensity, 
            LiquidMedium: _LiquidMedium, 
            LiquidDensity: _LiquidDensity, 
            TotalThroughput: _TotalThroughput, 
            BulkVolThroughput: _BulkVolThroughput, 
            ProcessConditions: _ProcessConditions,
            MoistureContent: _MoistureContent,

            Perc_FeedPassing3: _Perc_FeedPassing3, 
            Perc_FeedPassing15: _Perc_FeedPassing15, 
            GenericParticleShape: _GenericParticleShape,

            ScreeningRate: _ScreeningRate, 
            ScreeningAreaReq: _ScreeningAreaReq,
            Deck_text: _Deck_text
        }
    }

    render(){
        return (
        
            <div>

                <div className="container">
                    <h1 className="pageHeading">Screening Area</h1>
                </div>

                <BackButton/>
    
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Screen Deck</h3>
                        </div>
                    </div>

                    <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Parameters</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">

                        <Form.Group as={Row} controlId="DeckInstallAngle">
                                <Form.Label column md={4}>
                                   Deck Installation Angle:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="DeckInstallAngle" step="2.5" value={this.state.DeckInstallAngle} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text >
                                        {this.state.Deck_text}
                                    </Form.Text>
                                    <Form.Text id="helpText" muted>
                                        [degrees]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="DeckNumber">
                                <Form.Label column md={4}>
                                    Deck Number:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="DeckNumber" value={this.state.DeckNumber} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [#]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="ScreeningEff">
                                <Form.Label column md={4}>
                                    Screening Efficiency:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="ScreeningEff" value={this.state.ScreeningEff} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [%]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            

                        </div>
                </div>

                <br/>
    
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Apertures</h3>
                        </div>
                    </div>

                    <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Parameters</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">

                            
                        <Form.Group as={Row} controlId="ApertureWidht">
                                <Form.Label column md={4}>
                                    Aperture Width (Normal to Flow):
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="ApertureWidht" value={this.state.ApertureWidht} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="RoundApertures">
                                <Form.Label column md={4}>
                                    Round Apertures:
                                </Form.Label>
                                <Col md={4}>
                                    
                                    <Form.Check type="checkbox" value={this.state.RoundApertures} onChange={this.handleFormChange}/>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="ApertureLength">
                                <Form.Label column md={4}>
                                    Aperture Length (In-line With Flow):
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="ApertureLength" value={this.state.ApertureLength} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="OpenArea">
                                <Form.Label column md={4}>
                                    Open Area:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="OpenArea" value={this.state.OpenArea} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [%]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                        </div>
                </div>

                <br/>
    
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Process Data</h3>
                        </div>
                    </div>

                    <div className="row itemHeading">
                            <div className="d-none d-md-none d-lg-block col-lg-2">
                                <p><strong>Description</strong></p>
                            </div>
                            <div className="d-none d-md-none d-lg-block col-lg-2">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="d-none d-md-none d-lg-block col-lg-2">
                                <p><strong>Units</strong></p>
                            </div>
                            <div className="col-6 col-md-6 col-lg-2">
                                <p><strong>Description</strong></p>
                            </div>
                            <div className="col-6 col-md-6 col-lg-2">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="d-none d-md-none d-lg-block col-lg-2">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">
                        <Form.Group as={Row} controlId="SolidThroughput">
                            <Form.Label column md={2}>
                                Solids Throughput:
                            </Form.Label>
                            <Col md={2}>
                                <Form.Control type="number" name="SolidThroughput" value={this.state.SolidThroughput} step="10" onChange={this.handleFormChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/h]
                                </Form.Text>
                            </Col>
                            <Col md={2}>
                                <Form.Label >
                                Solids Density:
                                </Form.Label>
                                <Form.Label >
                                Bulk Density:
                                </Form.Label>
                            </Col>
    
                            <Col md={2}>
                                <Form.Control type="number" name="SolidDensity" value={this.state.SolidDensity} step="0.1" onChange={this.handleFormChange}/>
                                <Form.Control type="number" name="BulkDensity" value={this.state.BulkDensity} step="0.1" onChange={this.handleFormChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/m<sup>3</sup>]
                                </Form.Text>
                                <Form.Text id="helpText" muted>
                                [t/m<sup>3</sup>]
                                </Form.Text>
                            </Col>
    
                        </Form.Group>
    
                        <Form.Group as={Row} controlId="LiquidMedium">
                            {this.state.ProcessConditions !== 1 &&
                            <Form.Label column md={2}>
                                Liquid Medium:
                            </Form.Label>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>
                                <Form.Control type="number" name="LiquidMedium" value={this.state.LiquidMedium} disabled/>
                            </Col>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [m<sup>3</sup>/h]
                                </Form.Text>
                            </Col>
                            }
                            <Form.Label column md={2}>
                                Liquid Density:
                            </Form.Label>
                            <Col md={2}>
                                <Form.Control type="number" name="LiquidDensity" value={this.state.LiquidDensity} step="0.1" onChange={this.handleFormChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/m<sup>3</sup>]
                                </Form.Text>
                            </Col>
    
                        </Form.Group>
    
                        <Form.Group as={Row} controlId="TotalThroughput">
                            {this.state.ProcessConditions !== 1 &&
                            <Form.Label column md={2}>
                                Total Throughput:
                            </Form.Label>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>
                                <Form.Control type="number" name="TotalThroughput" value={this.state.TotalThroughput} disabled/>
                            </Col>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/h]
                                </Form.Text>
                            </Col>
                            }
                            <Form.Label column md={2}>
                                Bulk Volumetric Throughput:
                            </Form.Label>
                            <Col md={2}>
                                <Form.Control type="number" name="BulkVolThroughput" value={this.state.BulkVolThroughput} disabled/>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [m<sup>3</sup>/h]
                                </Form.Text> 
                            </Col>
    
                        </Form.Group>
    
                        <Form.Group as={Row} controlId="ProcessConditions">
                            <Form.Label column md={2}>
                                Process Conditions:
                            </Form.Label>
                            <Col md={2}>
                                
                                <Form.Control as="select" name="ProcessConditions" value={this.state.ProcessConditions} onChange={this.handleFormChange}>
                                    <option value = "1.3">Dry Process</option>
                                    <option value = "1">Wet Process</option>
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/m<sup>3</sup>]
                                </Form.Text> 
                            </Col>
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>

                            <Form.Label>
                                Moisture Content (m/m):
                            </Form.Label>
                        
                            </Col>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>
                                <Form.Control type="number" name="MoistureContent" value={this.state.MoistureContent}  onChange={this.handleFormChange}/>
                            </Col>
                            }
                            {this.state.ProcessConditions !== 1 &&
                            <Col md={2}>

                                <Form.Text id="helpText" muted>
                                [%]
                                </Form.Text>
                            </Col>
                            }
                        </Form.Group>
                        </div>
                </div>

                <br/>
    
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Particle Properties</h3>
                        </div>
                    </div>

                    <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Parameters</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">

                            
                        <Form.Group as={Row} controlId="Perc_FeedPassing3">
                                <Form.Label column md={4}>
                                % of feed passing 3mm:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="Perc_FeedPassing3" value={this.state.Perc_FeedPassing3} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [%]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="Perc_FeedPassing15">
                                <Form.Label column md={4}>
                                % of feed passing 1.5mm:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="Perc_FeedPassing15" value={this.state.Perc_FeedPassing15} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [%]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="GenericParticleShape">
                                <Form.Label column md={4}>
                                    Generic Particles Shape:
                                </Form.Label>
                                <Col md={4}>

                                    <Form.Control as="select" name="GenericParticleShape" value={this.state.GenericParticleShape} onChange={this.handleFormChange}>
                                        <option value = "1">Cubical</option>
                                        <option value = "0.9">Elongated (Slabby)</option>
                                    </Form.Control>

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        -
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </div>
                </div>
    
                <br/>
                <hr/>
                <br/>
    
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Screening Area</h3>
                        </div>
                    </div>

                    <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Parameters</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                    <div className="itemContent">
                        
                    <Form.Group as={Row} controlId="ScreeningRate">
                                <Form.Label column md={4}>
                                    Screening Rate:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="ScreeningRate" value={this.state.ScreeningRate} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                    [(t/h)/m²]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            
                        <Form.Group as={Row} controlId="ScreeningAreaReq">
                                <Form.Label column md={4}>
                                    Screening Area Required:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="ScreeningAreaReq" value={this.state.ScreeningAreaReq} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m²]
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                    </div>
                </div>
    
            </div>
        );
    }
    
}

export default ScreeningArea;