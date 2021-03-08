import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

class DensityFraction extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            solid_throughput: 100, solid_density: 2.76, bulk_density: 1.7, liquid_density: 1, solid_content_mm: 65,
            liquid_medium: 0, total_slurry_throughput: 0, vol_throughput: 0, relative_density: 0, solid_content_vv: 0
        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.DensFracCalc())
    }

    handleFormChange(event){
        this.setState(this.DensFracCalc({name: event.target.name, value: event.target.value}))
    }

    DensFracCalc(data){

        //Input
        var _SolidsThroughput = parseFloat(this.state.solid_throughput);
        var _SolidsDensity = parseFloat(this.state.solid_density);
        var _BulkDensity = parseFloat(this.state.bulk_density);
        var _LiquidDensity = parseFloat(this.state.liquid_density);
        var _SolidsContentMM = parseFloat(this.state.solid_content_mm);

        if(data){
            switch(data.name){
                case "solid_throughput":
                    _SolidsThroughput = data.value;
                    break;
                case "solid_density":
                    _SolidsDensity = data.value;
                    break;
                case "bulk_density":
                    _BulkDensity = data.value;
                    break;
                case "liquid_density":
                    _LiquidDensity = data.value;
                    break;
                case "solid_content_mm":
                    _SolidsContentMM = data.value;
                    break;
                default:
                    break;
            }
        }

        //Calc

        var _solidsContentMMCalc = _SolidsContentMM*0.01
        var relativeDensity = 1/(_solidsContentMMCalc*(1/_SolidsDensity + (1/_solidsContentMMCalc-1)/_LiquidDensity));

        var solids_vpv_var = relativeDensity*_solidsContentMMCalc/_SolidsDensity;
        var slurry_tph_var = _SolidsThroughput/_solidsContentMMCalc;
        var slurry_m3ph_var = (_SolidsThroughput/_SolidsDensity)/solids_vpv_var;
        var liquid_m3ph_var = (_SolidsThroughput/_SolidsDensity)/solids_vpv_var - (_SolidsThroughput/_SolidsDensity);

        var solids_vpvperc_var = 100*solids_vpv_var;

        var liquidMedium = Math.round(liquid_m3ph_var * 100 + Number.EPSILON ) / 100;
        var totalSlurryThroughput = Math.round(slurry_tph_var * 100 + Number.EPSILON ) / 100;
        var volThroughput = Math.round(slurry_m3ph_var * 100 + Number.EPSILON ) / 100;
        var solidContentVV = Math.round(solids_vpvperc_var * 10 + Number.EPSILON ) / 10;

        
        //Return for state change
        return {
            solid_throughput: _SolidsThroughput,
            solid_density: _SolidsDensity,
            bulk_density: _BulkDensity,
            liquid_density: _LiquidDensity,
            solid_content_mm: _SolidsContentMM,
            liquid_medium: liquidMedium,
            total_slurry_throughput: totalSlurryThroughput,
            vol_throughput: volThroughput,
            relative_density: relativeDensity.toFixed(3),
            solid_content_vv: solidContentVV
        }
    }

    render(){
        return (
            <Form>
                <div className="container">
    
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Mass Balance - Density Fraction</h3>
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
                        <Form.Group as={Row} controlId="solid_throughput">
                        <Form.Label column md={2}>
                            Solids Throughput
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.solid_throughput} name="solid_throughput" step="10" onChange={this.handleFormChange} />
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [ft]
                            </Form.Text>
                        </Col>
                        <Col md={2}>
                            <Form.Label >
                            Solids Density
                            </Form.Label>
                            <Form.Label >
                            Bulk Density
                            </Form.Label>
                        </Col>
    
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.solid_density} name="solid_density" step="0.1" onChange={this.handleFormChange}/>
                            <Form.Control type="number" value={this.state.bulk_density} name="bulk_density" step="0.1" onChange={this.handleFormChange}/>
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
    
                    <Form.Group as={Row} controlId="liquid_medium">
                        <Form.Label column md={2}>
                            Liquid Medium Throughput
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.liquid_medium} name="liquid_medium" disabled/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [m<sup>3</sup>/h]
                            </Form.Text>
                        </Col>
                        <Form.Label column md={2}>
                            Liquid Density
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.liquid_density} name="liquid_density" step="0.01" onChange={this.handleFormChange}/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [t/m<sup>3</sup>]
                            </Form.Text>
                        </Col>
    
                    </Form.Group>
    
                    <Form.Group as={Row} controlId="ShellInsideLength">
                        <Form.Label column md={2}>
                            Total Slurry Throughput
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.total_slurry_throughput} name="total_slurry_throughput" disabled/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [t/h]
                            </Form.Text>
                        </Col>
                        <Form.Label column md={2}>
                            Volumetric Throughput
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.vol_throughput} name="vol_throughput" disabled/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [m<sup>3</sup>/h]
                            </Form.Text> 
                        </Col>
    
                    </Form.Group>
    
                    <Form.Group as={Row} controlId="relative_density">
                        <Form.Label column md={2}>
                            Relative Density
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.relative_density} name="relative_density" disabled/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [t/m<sup>3</sup>]
                            </Form.Text> 
                        </Col>
                        <Col md={2}>
    
                            <Form.Label>
                            Solids Content (m/m)
                            </Form.Label>
                            <Form.Label>
                            Solids Content (v/v)
                            </Form.Label>
                        
                        </Col>
                        <Col md={2}>
                            <Form.Control type="number" value={this.state.solid_content_mm} name="solid_content_mm" step="1" onChange={this.handleFormChange}/>
                            <Form.Control type="number" value={this.state.solid_content_vv} name="solid_content_vv" disabled/>
                        </Col>
                        <Col md={2}>
                            <Form.Text id="helpText" muted>
                            [%]
                            </Form.Text>
                            <Form.Text id="helpText" muted>
                            [%]
                            </Form.Text>
                        </Col>
    
                    </Form.Group>
                    </div>
    
                </div>
    
            </Form>
        );
    }
}

export default DensityFraction;