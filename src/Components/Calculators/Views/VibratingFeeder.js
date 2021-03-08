import React from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';

class VibratingFeeder extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            //Vibrating Feeder
            throughWidth: 500,throughLenght: 2000,throughDepth: 250,conveyingSpeed:200,materialThroughput: 100, bulkDensity: 1.7,
            //Feeder Utilization
            bedDepth: 0, throughDepthUtilized: 0
        }
        
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    componentDidMount(){
        this.setState(this.FeederBedDepth());
    }

    handleInputChange(event){
            this.setState({[event.target.name]: event.target.value})
            this.FeederBedDepth();
    }

    FeederBedDepth(data) {

        //Inputs
        var _throughWidth = this.state.throughWidth;
        var _throughLength = this.state.throughLength;
        var _throughDepth = this.state.throughDepth;
        var _conveyingSpeed = this.state.conveyingSpeed;
        var _materialThroughput = this.state.materialThroughput;
        var _bulkDensity = this.state.bulkDensity;

        //Outputs
        var _bedDepth = this.state.bedDepth;
        var _throughDepthUtil = this.state.throughDepthUtilized;

        if(data){
            switch(data.name){
                case "throughWidth":
                    _throughWidth = data.value;
                    break;
                case "throughLength":
                    _throughLength = data.value;
                    break;
                case "throughDepth":
                    _throughDepth = data.value;
                    break;
                case "conveyingSpeed":
                    _conveyingSpeed = data.value;
                    break;
                case "materialThroughput":
                    _materialThroughput = data.value;
                    break;
                case "bulkDensity":
                    _bulkDensity = data.value;
                    break;
                default:
                    break;
            }
        }

        //Calc
        // Units conversion to ISO
        var W = _throughWidth/1000;
        // var L = _throughLength/1000;
        var D = _throughDepth/1000;
        var V = _conveyingSpeed/1000; // m/s
            V = V*(60*60); // m/h

        // In ISO units
        var SectionArea = (_materialThroughput/_bulkDensity)/V;
        var BD = (SectionArea/W); // m
        var BDU = BD/D; // %

        // Units output conversion
        BD = BD*1000; // mm

        _bedDepth = BD.toFixed(3);
        _throughDepthUtil = BDU.toFixed(3);


        return {
            throughWidth: _throughWidth,
            throughLenght: _throughLength,
            throughDepth: _throughDepth,
            conveyingSpeed:_conveyingSpeed,
            materialThroughput: _materialThroughput, 
            bulkDensity: _bulkDensity,
            bedDepth: _bedDepth, 
            throughDepthUtilized: _throughDepthUtil
        }


        
    }

    render(){
        return (
            <div>
                <div className="container">
                    <h1 className="pageHeading">VIBRATING FEEDER</h1>

                    <br />
                </div>
            <BackButton/>
            <Form>
                <div className="container">
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Vibrating Feeder</h3>
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
                        <Form.Group as={Row} controlId="throughWidth">
                                <Form.Label column md={4}>
                                    Trough Width:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.throughWidth} name="throughWidth" min="50" max="5000" step="100" onChange={this.handleInputChange}/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="throughLenght">
                                <Form.Label column md={4}>
                                    Trough Length:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.throughLenght} name="throughLenght"  step="100" onChange={this.handleInputChange} />
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="throughDepth">
                                <Form.Label column md={4}>
                                    Trough Depth:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.throughDepth} name="throughDepth"  step="50" onChange={this.handleInputChange}/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="conveyingSpeed">
                                <Form.Label column md={4}>
                                    Conveying Speed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.conveyingSpeed} name="conveyingSpeed"  step="10" onChange={this.handleInputChange}/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [mm/s]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="materialThroughput">
                                <Form.Label column md={4}>
                                    Material Throughput:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.materialThroughput} name="materialThroughput"  onChange={this.handleInputChange}/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [t/h]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="bulkDensity">
                                <Form.Label column md={4}>
                                    Bulk Density:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.bulkDensity} name="bulkDensity" step="0.1" onChange={this.handleInputChange}/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [t/m^3]
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
                            <h3>Feeder Utilization</h3>
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
                        <Form.Group as={Row} controlId="bedDepth">
                                <Form.Label column md={4}>
                                    Bed Depth:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.bedDepth} name="bedDepth" disabled/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [mm]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="throughDepthUtilized">
                                <Form.Label column md={4}>
                                    Trough Depth Utilized:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" value={this.state.throughDepthUtilized} name="throughDepthUtilized" disabled/>
                                    
                                </Col>
                                <Col md={4}>
                                    
                                    <Form.Text id="helpText" muted>
                                    [%]
                                    </Form.Text>
                                </Col>
                        </Form.Group>
                        
                    </div>
                </div>
            </Form>
        </div>
        )
    }
}

export default VibratingFeeder;

