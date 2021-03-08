import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { CSVLink } from "react-csv";

class Thickener extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            SolidFeed: 20, OverflowFlowrate: 200,
            RiseRate: 4.0, fluxRate_1: 0.4, fluxRate_2: 9.6, SolutionYeld_kf_in: 20, SolutionYeld_kf_drop: 0,
            thickenerDiameter: 0,

            diameter: 8, riseRate: 0, fluxRate: 0,
            driveMotorSpeed: 960, rakeTipSpeed: 7, rakeDrivetrainEff: 0.55, reqDrivetrainRR: 0, reqOperationalTorque: 0, reqOperationalPower: 0
        }

        this.handleFormChange1 = this.handleFormChange1.bind(this);

        this.csvData = [
            ["MetEngineer Thickener Sizing Sheet Results", "\n"],
            ["\n"],
            ["\n"],
            ["Property"," ", "Value", "Units", "\n"],
            ["\n"],
            ["Solids In Feed"," " , this.state.SolidFeed, "[t/h]", "\n"],
            ["Overflow Volumetric Flow"," " , this.state.OverflowFlowrate, "[m3/h]", "\n"],
            ["Solution Yield Strength"," " , this.state.SolutionYeld_kf_in, "-", "\n"],   // what are the units here??
            ["Thickener Diameter"," " , this.state.diameter, "[m]", "\n"],
            ["Minimum Rise Rate"," " , this.state.riseRate, "[m/h]", "\n"],
            ["Minimum Flux Rate"," " , this.state.fluxRate, "[(t/h)/m2]", "\n"],
            ["\n"],
            ["Operational Power Draw"," " , this.state.rakeTipSpeed, "[kW]", "\n"],
            ["Operational Torque (Rake)"," " , this.state.rakeTipSpeed, "[kN.m]", "\n"],
            ["Drivetrain Reduction Ratio"," " , this.state.rakeTipSpeed, "[kN.m]", "\n"],
            ["Drivetrain Efficiency"," " , this.state.rakeTipSpeed, "[frac]", "\n"],
            ["Rake Tip Speed"," " , this.state.rakeTipSpeed, "[m/min]", "\n"],
            ["Drive Motor Speed"," " , this.state.rakeTipSpeed, "[rpm]", "\n"],
            ["\n"],
            ["\n"],
            ["Calculator URL:"," " , "www.metengineer.com", "\n"],
            ["Contact:"," " , "engineer@metengineer.com", "\n"],
            ["\n"],

          ];


    }

    componentDidMount(){
        this.setState(this.CalculateSettlingProp())
    };

    handleFormChange1(event) {
        this.setState(this.CalculateSettlingProp({name: event.target.name, value: event.target.value}))
    }



    CalculateSettlingProp(data){


        var _OverflowFlowrate = this.state.OverflowFlowrate;
        var _SolidFeed = this.state.SolidFeed;
        var _RiseRate = parseFloat(this.state.RiseRate);
        var _fluxRate_1 = parseFloat(this.state.fluxRate_1);
        var _fluxRate_2 = parseFloat(this.state.fluxRate_2);
        var _SolutionYeld_kf_in = this.state.SolutionYeld_kf_in;
        var _SolutionYeld_kf_drop = this.state.SolutionYeld_kf_drop;
        var _ThicknerDiameter = this.state.thickenerDiameter;
        var _Diameter = this.state.diameter;
        var _RakeTipSpeed = this.state.rakeTipSpeed
        var _RakeDriveEff = parseFloat(this.state.rakeDrivetrainEff)
        var _DriveMotorSpeed = this.state.driveMotorSpeed
        var _ReqDriveRedRatio = parseFloat(this.state.reqDrivetrainRR)
        var _ReqOperationPower = parseFloat(this.state.reqOperationalPower)
        var _ReqOperationTorque = parseFloat(this.state.reqOperationalTorque)

        var FluxRateHolder = _fluxRate_1*24

        
        if(data){
            switch(data.name){
                case "driveMotorSpeed":
                    _DriveMotorSpeed = data.value;
                    break;
                case "rakeDrivetrainEff":
                    _RakeDriveEff = data.value;
                    break;
                case "rakeTipSpeed":
                    _RakeTipSpeed = data.value;
                    break;
                case "diameter":
                    _Diameter = data.value;
                    break;
                case "SolidFeed":
                    _SolidFeed = data.value;
                    break;
                case "OverflowFlowrate":
                    _OverflowFlowrate = data.value;
                    break;
                case "RiseRate":
                    _RiseRate = data.value;
                    break;
                case "fluxRate_1":
                    _fluxRate_1 = data.value;
                    FluxRateHolder = _fluxRate_1*24
                    break;
                case "fluxRate_2":
                    _fluxRate_2 = data.value;
                    FluxRateHolder = _fluxRate_2/24
                    break;
                case "SolutionYeld_kf_in":
                    _SolutionYeld_kf_in = data.value;
                    break;
                case "SolutionYeld_kf_drop":
                    _SolutionYeld_kf_drop = data.value;
                    break;
                default:
                    break;
            }
        }

        //Calculations
        var settlingAreaM2 = _OverflowFlowrate/_RiseRate;
        var setllingDiameterM = Math.sqrt(4*settlingAreaM2/(Math.PI));

        var fluxArea = _SolidFeed/FluxRateHolder;
        var FluxDiameter = Math.sqrt(4*fluxArea/(Math.PI));

        _ThicknerDiameter = Math.max(setllingDiameterM,FluxDiameter).toFixed(3);

        //ThickSelection calc
        // In ISO units
        var SectionAreaHolder = 0.25*Math.PI*Math.pow(_Diameter,2);
        var _RiseRate_min = (_OverflowFlowrate/SectionAreaHolder).toFixed(3); // m/h
        var _FluxRate_min = (_SolidFeed/SectionAreaHolder).toFixed(3); // (t/h)/m^2

        //Mechanical Design calc
        var RakeTorqueReq = 
        (1/_RakeDriveEff)*_SolutionYeld_kf_in*Math.pow(_Diameter/0.3048,2)*1.35;
        _ReqOperationTorque = (0.001*RakeTorqueReq).toFixed(3);

        var RakeSpeedRPM = _RakeTipSpeed/(_Diameter*Math.PI);
        var RakeSpeedRADPS = RakeSpeedRPM*2*Math.PI/60;
        var RakePowerW = RakeTorqueReq*RakeSpeedRADPS;
        _ReqOperationPower = (0.001*RakePowerW).toFixed(3);

        _ReqDriveRedRatio = (_DriveMotorSpeed/RakeSpeedRPM).toFixed(2);

        

        

        return {
            OverflowFlowrate: _OverflowFlowrate,
            SolidFeed : _SolidFeed,
            RiseRate: _RiseRate,
            fluxRate_1: _fluxRate_1,
            fluxRate_2: _fluxRate_2,
            SolutionYeld_kf_drop: _SolutionYeld_kf_drop,
            SolutionYeld_kf_in: _SolutionYeld_kf_in,
            thickenerDiameter: _ThicknerDiameter,
            riseRate: _RiseRate_min,
            fluxRate: _FluxRate_min,
            rakeTipSpeed: _RakeTipSpeed,
            rakeDrivetrainEff: _RakeDriveEff,
            driveMotorSpeed: _DriveMotorSpeed,
            reqDrivetrainRR: _ReqDriveRedRatio,
            reqOperationalPower: _ReqOperationPower,
            reqOperationalTorque: _ReqOperationTorque
        }

    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="pageHeading">Thickener Sizing</h1>
                    <strong>Calculator valid for settling thickeners, high rate thickeners, and clarrifiers</strong>
                </div>

                <BackButton />

                <Form>
                    <div className="container">

                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Process Input</h3>
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

                            <Form.Group as={Row} controlId="SolidFeed">
                                <Form.Label column md={4}>
                                    Solids Feed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="SolidFeed" value={this.state.SolidFeed} onChange={this.handleFormChange1} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [t/h]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="OverflowFlowrate">
                                <Form.Label column md={4}>
                                    Overflow Flowrate:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="OverflowFlowrate" value={this.state.OverflowFlowrate} onChange={this.handleFormChange1} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m3/h]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                        </div>

                    </div>

                    <div className="container">

                        <br />
                        <br />

                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Settling Properties</h3>
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
                                <p><strong>Value</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">

                            <Form.Group as={Row} controlId="RiseRate">
                                <Form.Label column md={4}>
                                    Rise Rate:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.RiseRate} step="0.1" onChange={this.handleFormChange1} name="RiseRate" />
                                    <Form.Text id="helpText" muted>
                                        [m/h]
                                    </Form.Text>
                                </Col>
                                <Col md={4}>

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="fluxRate_1">
                                <Form.Label column md={4}>
                                    Flux Rate:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="fluxRate_1" step="0.1" value={this.state.fluxRate_1} onChange={this.handleFormChange1} />
                                    <Form.Text id="helpText" muted>
                                        [(t/h)/m2]
                                    </Form.Text>
                                </Col>
                                <Col md={4}>
                                    <Form.Control type="number" name="fluxRate_2" step="0.1" value={this.state.fluxRate_2} onChange={this.handleFormChange1} />
                                    <Form.Text id="helpText" muted>
                                        [(t/day)/m2]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="SolutionYeld_kf_in">
                                <Form.Label column md={4}>
                                    Solution yield strength rheology (K factor):
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="SolutionYeld_kf_in" step="5" value={this.state.SolutionYeld_kf_in} onChange={this.handleFormChange1} />

                                </Col>
                                <Col md={4}>

                                    <Form.Control as="select" name="SolutionYeld_kf_drop" value={this.state.SolutionYeld_kf_drop} onChange={this.handleFormChange1}>
                                        <option value="0">Generic Values Range:</option>
                                        <option value="1">Light Duty (5 - 10)</option>
                                        <option value="2">Medium Duty (10 - 20)</option>
                                        <option value="3">Heavy Duty (20 - 35)</option>
                                        <option value="4">Extra Heavy Duty ({">"}35)</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                        </div>

                    </div>

                    <br />
                    <br />

                    <div className="container">

                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Minimum Thickener Size</h3>
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
                            <Form.Group as={Row} controlId="thickenerDiameter">
                                <Form.Label column md={4}>
                                    Thickener Diameter:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" disabled value={this.state.thickenerDiameter} name="thickenerDiameter" />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m]
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </div>

                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className="container">

                        <div className="row row_alt">
                            <div className="col-8">

                                <div className="row divHeading">
                                    <div className="col-md">
                                        <h4>Thickener Selection</h4>
                                    </div>
                                </div>

                                <div className="row justify-content itemHeading">
                                    <div className="col-4 col-md-4">
                                        <p><strong>Parameters</strong></p>
                                    </div>
                                    <div className="col-4 col-md-4">
                                        <p className="inputLeft"><strong>Value </strong></p>
                                    </div>
                                    <div className="col-4 col-md-4">
                                        <p className="inputLeft"><strong>Units </strong></p>
                                    </div>
                                </div>

                                <div className="itemContent">

                                    <Form.Group as={Row} controlId="diameter">
                                        <Form.Label column md={4}>
                                            Diameter:
                                        </Form.Label>
                                        <Col md={4}>
                                            <Form.Control type="number" name="diameter" value={this.state.diameter} onChange={this.handleFormChange1} />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Text id="helpText" muted>
                                                [m]
                                            </Form.Text>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="riseRate">
                                        <Form.Label column md={4}>
                                            Rise Rate - Minimum Required:
                                        </Form.Label>
                                        <Col md={4}>
                                            <Form.Control type="number" name="millShellInsideDiameter_m" value={this.state.riseRate} disabled />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Text id="helpText" muted>
                                                [m/h]
                                            </Form.Text>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="fluxRate">
                                        <Form.Label column md={4}>
                                            Flux Rate - Minimum Required:
                                        </Form.Label>
                                        <Col md={4}>
                                            <Form.Control type="number" name="fluxRate" value={this.state.fluxRate} disabled />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Text id="helpText" muted>[(t/h)/m<sup>2</sup>]</Form.Text>
                                        </Col>
                                    </Form.Group>


                                </div>
                            </div>

                            <div className="col-4">
                                <div className="row"></div>
                                <div className="row"></div>
                                <div className="row"></div>
                                <div className="row"></div>
                                <img src="./img/Stencils/Thickener.png" alt="Debate" width="100%" />
                            </div>

                        </div>
                    </div>


                    <div className="container">

                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Mechanical Design</h3>
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
                            <Form.Group as={Row} controlId="driveMotorSpeed">
                                <Form.Label column md={4}>
                                    Drive Motor Speed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.driveMotorSpeed} name="driveMotorSpeed" onChange={this.handleFormChange1} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [rpm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="rakeTipSpeed">
                                <Form.Label column md={4}>
                                    Rake Tip Speed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.rakeTipSpeed} name="rakeTipSpeed" onChange={this.handleFormChange1} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m/min]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="rakeDrivetrainEff">
                                <Form.Label column md={4}>
                                    Rake Drivetrain Efficiency:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.rakeDrivetrainEff} name="rakeDrivetrainEff" onChange={this.handleFormChange1} step="0.05" />

                                </Col>
                                <Col md={4}>

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="reqDrivetrainRR">
                                <Form.Label column md={4}>
                                    Required Drivetrain Reduction Ratio:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.reqDrivetrainRR} name="reqDrivetrainRR" disabled />

                                </Col>
                                <Col md={4}>

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="reqOperationalTorque">
                                <Form.Label column md={4}>
                                    Required Operational Torque:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.reqOperationalTorque} name="reqOperationalTorque" disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [kN.m]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="reqOperationalPower">
                                <Form.Label column md={4}>
                                    Required Operational Power:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.reqOperationalPower} name="reqOperationalPower" disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [kW]
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </div>

                    </div>

                    <br />
                    

                    <CSVLink className="backButtonStyle" data={this.csvData} separator={";"} filename="thickener_results.csv">
                        SAVE RESULTS
                    </CSVLink>


                </Form>

            </div>
        )
    }


}

export default Thickener;