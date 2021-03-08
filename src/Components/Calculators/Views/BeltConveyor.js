import React from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';


class BeltConveyor extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            MaterialThrough: 800, BulkDensity: 1.65, MaxLumpSize_in: 200, MaxLumpSize_drop: 1, ConveyingSpeed: 1.4, 
            RollerThroughAngle: 35, MaterialStructureAngle: 25,

            EdgeDistance: 0, MinimumBeltWidth: 0
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.BeltConvCalc());
    }

    handleFormChange(event){
        this.setState(this.BeltConvCalc({name: event.target.name, value: event.target.value}));

    }

    BeltConvCalc(data){

        var _MaterialThrough = parseFloat(this.state.MaterialThrough); 
        var _BulkDensity = parseFloat(this.state.BulkDensity);
        var _MaxLumpSize_in = parseFloat(this.state.MaxLumpSize_in); 
        var _MaxLumpSize_drop = this.state.MaxLumpSize_drop;
        var _ConveyingSpeed = parseFloat(this.state.ConveyingSpeed);
        var _RollerThroughAngle = parseFloat(this.state.RollerThroughAngle);
        var _MaterialStructureAngle = parseFloat(this.state.MaterialStructureAngle);
        
        if(data){
            switch(data.name){
                case "MaterialThrough":
                    _MaterialThrough = parseFloat(data.value);
                    break;
                case "BulkDensity":
                    _BulkDensity = parseFloat(data.value);
                    break;
                case "MaxLumpSize_in":
                    _MaxLumpSize_in = parseFloat(data.value);
                    break;
                case "MaxLumpSize_drop":
                    _MaxLumpSize_drop= data.value;
                    break;
                case "ConveyingSpeed":
                    _ConveyingSpeed = parseFloat(data.value);
                    break;
                case "RollerThroughAngle":
                    _RollerThroughAngle = parseFloat(data.value);
                    break;
                case "MaterialStructureAngle":
                    _MaterialStructureAngle = parseFloat(data.value);
                    break;
                default:
                    break;
            }
        }

        var _ConveyingSpeedHour = _ConveyingSpeed*60*60;
        var section_area_m2_var = (_MaterialThrough/_BulkDensity)/_ConveyingSpeedHour;
        
        var beltwidth_min_throughput_m_var = 
            1.1*Math.pow((section_area_m2_var/(0.1084*((-0.0002*_RollerThroughAngle+0.0219)*_MaterialStructureAngle + 0.0408*Math.pow(_RollerThroughAngle, 0.7903)))), 1/2.1473);

        var beltwidth_min_throughput_mm_var = beltwidth_min_throughput_m_var*1000;
        var beltwidth_min_lump_mm_var

        if (_MaxLumpSize_drop === 1) {
            beltwidth_min_lump_mm_var = (_MaxLumpSize_in + 10)/0.21;
            // console.log(beltwidth_min_lump_mm_var)
          } 
        else {
            beltwidth_min_lump_mm_var = (_MaxLumpSize_in + 30)/0.40;
          }

        //console.log(beltwidth_min_throughput_mm_var, beltwidth_min_lump_mm_var);
        
        var beltwidth_min_mm_var = Math.max(beltwidth_min_throughput_mm_var, beltwidth_min_lump_mm_var);
            //
        
        var edgedistance_mm_var = 0.055*beltwidth_min_mm_var + 23;

        edgedistance_mm_var = Math.round(edgedistance_mm_var*1 + Number.EPSILON) / 1
        beltwidth_min_mm_var = Math.round(beltwidth_min_mm_var*1 + Number.EPSILON) / 1


        return {
            MaterialThrough: _MaterialThrough, 
            BulkDensity: _BulkDensity, 
            MaxLumpSize_in: _MaxLumpSize_in,
            MaxLumpSize_drop: _MaxLumpSize_drop, 
            ConveyingSpeed: _ConveyingSpeed, 
            RollerThroughAngle: _RollerThroughAngle, 
            MaterialStructureAngle: _MaterialStructureAngle,
            EdgeDistance: edgedistance_mm_var,
            MinimumBeltWidth: beltwidth_min_mm_var,
        }
    }

    render(){
        return (
            <div>
                <div className="container">
                    <h1 className="pageHeading">BELT CONVEYOR</h1>
                    <strong>Conveyor Belt Size Calculator</strong>

                    <br />
                </div>
                <BackButton/>

                <Form>

                    <div className="container">

                        <div className="row row_alt">
                            <div className="col-8 nox_padding">

                                <div className="row divHeading">
                                    <div className="col-md">
                                    <h3>Process Parameters</h3>
                                    </div>
                                </div>

                                <div className="row justify-content itemHeading alignLeft">
                                    <div className="col-4 col-md-4 col-sm">
                                        <p><strong>Parameters</strong></p>
                                    </div>
                                    <div className="col-4 col-md-4 col-sm">
                                        <p><strong>Input Value</strong></p>
                                    </div>
                                    <div className="col-4 col-md-4 col-sm">
                                        <p><strong>Units</strong></p>
                                    </div>
                                </div>

                                <div className="itemContent">

                                <Form.Group as={Row} controlId="MaterialThrough">
                                    <Form.Label column md={4}>
                                        Material Throughput:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="MaterialThrough" value={this.state.MaterialThrough} onChange={this.handleFormChange}/>           
                                    </Col>
                                    <Col md={4}>            
                                        <Form.Text id="helpText" muted>
                                            t/h]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="BulkDensity">
                                    <Form.Label column md={4}>
                                        Bulk Density:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="BulkDensity" value={this.state.BulkDensity} step="0.05" onChange={this.handleFormChange}/>
                                        
                                    </Col>
                                    <Col md={4}>
                                        
                                        <Form.Text id="helpText" muted>
                                            [t/m^3]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="MaxLumpSize_in">
                                    <Form.Label column md={4}>
                                        Max. Lump Size:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="MaxLumpSize_in" value={this.state.MaxLumpSize_in} step="10" max="600" onChange={this.handleFormChange}/>
                                        <br/>
                                        <Form.Control as="select" value={this.state.MaxLumpSize_drop} onChange={this.handleFormChange} name="MaxLumpSize_drop">
                                            <option value="1">Sized</option>
                                            <option value="2">Unsized</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md={4}>    
                                        <Form.Text id="helpText" muted>
                                            [mm]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="ConveyingSpeed">
                                    <Form.Label column md={4}>
                                        Conveying Speed:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="ConveyingSpeed" value={this.state.ConveyingSpeed} step="0.1" onChange={this.handleFormChange}/>
                                        
                                    </Col>
                                    <Col md={4}>
                                        
                                        <Form.Text id="helpText" muted>
                                            [m/s]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="RollerThroughAngle">
                                    <Form.Label column md={4}>
                                        Roller Trough Angle:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="RollerThroughAngle" value={this.state.RollerThroughAngle} step="5" onChange={this.handleFormChange}/>
                                        
                                    </Col>
                                    <Col md={4}>
                                        
                                        <Form.Text id="helpText" muted>
                                            [degrees]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="MaterialStructureAngle">
                                    <Form.Label column md={4}>
                                        Material Surcharge Angle:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="MaterialStructureAngle" value={this.state.MaterialStructureAngle} step="1" onChange={this.handleFormChange}/>
                                        
                                    </Col>
                                    <Col md={4}>
                                        
                                        <Form.Text id="helpText" muted>
                                            [degrees]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>

                                </div>

                            </div>
                            <div className="col-4 col_for_image">
                                <img src = "./img/Conveyor Section.png" alt = "Debate" width = "100%"/>
                            </div>
                        </div>
                        
     

                    </div>

                    <br/>
                    <br/>

                    <div className="container">

                        <div className="row divHeading">
                            <div className="col-md">
                            <h4>Conveyor Belt Width</h4>
                            </div>
                        </div>

                        <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Discription</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Value</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Units</strong></p>
                            </div>
                        </div>

                        <div className="itemContent">

                        <Form.Group as={Row} controlId="EdgeDistance">
                                <Form.Label column md={4}>
                                    Edge Distance:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="EdgeDistance" value={this.state.EdgeDistance} disabled/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="MinimumBeltWidth">
                                <Form.Label column md={4}>
                                    Minimum Belt Width:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="MinimumBeltWidth" value={this.state.MinimumBeltWidth} disabled/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>

                        </div>

                    </div>

                    <br/>
                    <hr/>
                    <br/>

                    <button className="backButtonStyle">SAVE RESULTS</button>

                </Form>
            </div>

        );
    }

}

export default BeltConveyor;