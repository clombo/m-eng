import React from 'react';
import '../../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';

class MassPull extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            solid_throughput: 100, solid_density: 2.76, bulk_density: 1.7, liquid_medium: 40, liquid_density: 1,
            total_slurry: 0, vol_throughput: 0, relative_density: 0, solid_content_mm: 0, solid_content_vv: 0
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.massBalCalc())
    }

    handleFormChange(event){
        this.setState(this.massBalCalc({name: [event.target.name],value: event.target.value}))
    }

    massBalCalc(data){


        //Inputs
        var liquidMedium;
        var liquidDensity;
        var solidThroughput;
        var solidDensity;
        var bulkDensity;


        //Outputs
        var totalSlurryThroughput;
        var volThroughput;
        var relativeDensity;
        var solidContentMM;
        var solidContentVV;

        if(data){
            
            switch(data.name){
                case "bulk_density":
                    bulkDensity = data.value;
                    liquidMedium = this.state.liquid_medium;
                    liquidDensity = this.state.liquid_density;
                    solidThroughput = this.state.solid_throughput;
                    solidDensity = this.state.solid_density;
                    break;
                case "solid_throughput":
                    liquidMedium = this.state.liquid_medium;
                    liquidDensity = this.state.liquid_density;
                    solidThroughput = data.value;
                    solidDensity = this.state.solid_density;
                    bulkDensity = this.state.bulk_density;
                    break;
                case "solid_density":
                    liquidMedium = this.state.liquid_medium;
                    liquidDensity = this.state.liquid_density;
                    solidThroughput = this.state.solid_throughput;
                    solidDensity = data.value;
                    bulkDensity = this.state.bulk_density;
                    break;
                case "liquid_medium":
                    liquidMedium = data.value;
                    liquidDensity = this.state.liquid_density;
                    solidThroughput = this.state.solid_throughput;
                    solidDensity = this.state.solid_density;
                    bulkDensity = this.state.bulk_density;
                    break;
                case "liquid_density":
                    liquidMedium = this.state.liquid_medium;
                    liquidDensity = data.value;
                    solidThroughput = this.state.solid_throughput;
                    solidDensity = this.state.solid_density;
                    bulkDensity = this.state.bulk_density;
                    break;
                default:
                    liquidMedium = this.state.liquid_medium;
                    liquidDensity = this.state.liquid_density;
                    solidThroughput = this.state.solid_throughput;
                    solidDensity = this.state.solid_density;
                    bulkDensity = this.state.bulk_density;
            }
        }else{

            liquidMedium = this.state.liquid_medium;
            liquidDensity = this.state.liquid_density;
            solidThroughput = this.state.solid_throughput;
            solidDensity = this.state.solid_density;
            bulkDensity = this.state.bulk_density;

        }

        
        // Calcs
        var liquid_tph_var = liquidMedium*liquidDensity;
        var solids_m3ph_var = solidThroughput/solidDensity;
        // var solids_bulk_m3ph_var = solidThroughput/bulkDensity;
        var slurry_tph_var = (solidThroughput - 0 + liquid_tph_var);
        var slurry_m3ph_var = (solids_m3ph_var + liquidMedium);
        var relative_density_var = slurry_tph_var/slurry_m3ph_var;
        var solids_mpm_var = solidThroughput/slurry_tph_var;
        var solids_vpv_var = solids_m3ph_var/slurry_m3ph_var;

        // Output Units
        var solids_mpmper_var = 100*solids_mpm_var;
        var solids_vpvper_var = 100*solids_vpv_var;

        totalSlurryThroughput =  Math.round(slurry_tph_var * 100 + Number.EPSILON ) / 100;
        volThroughput = Math.round(slurry_m3ph_var * 100 + Number.EPSILON ) / 100;
        relativeDensity =  Math.round(relative_density_var * 1000 + Number.EPSILON ) / 1000;
        solidContentMM = Math.round(solids_mpmper_var * 10 + Number.EPSILON ) / 10;
        solidContentVV = Math.round(solids_vpvper_var * 10 + Number.EPSILON ) / 10;

        
        //Return for state change
        if(data){

            return {
                [data.name]: data.value,
                total_slurry: totalSlurryThroughput, 
                vol_throughput: volThroughput.toFixed(2), 
                relative_density: relativeDensity.toFixed(3), 
                solid_content_mm: solidContentMM.toFixed(1), 
                solid_content_vv: solidContentVV.toFixed(1)

            }

        }else{
            return {
                total_slurry: totalSlurryThroughput, 
                vol_throughput: volThroughput.toFixed(2), 
                relative_density: relativeDensity.toFixed(3), 
                solid_content_mm: solidContentMM.toFixed(1), 
                solid_content_vv: solidContentVV.toFixed(1),
                bulk_density: bulkDensity
            }
        }


    } 

    render(){
        return (
            <Form>
                <div className="container">
    
                    <div className="row divHeading">
                        <div className="col-md">
                            <h3>Mass Balance - Mass Pull</h3>
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
                                <Form.Control type="number" name="solid_throughput" value={this.state.solid_throughput} step="10" onChange={this.handleFormChange}/>
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
                                <Form.Control type="number" name="solid_density" value={this.state.solid_density} step="0.1" onChange={this.handleFormChange}/>
                                <Form.Control type="number" name="bulk_density" value={this.state.bulk_density} step="0.1" onChange={this.handleFormChange}/>
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
                                <Form.Control type="number" name="liquid_medium" value={this.state.liquid_medium} step="10" onChange={this.handleFormChange}/>
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
                                <Form.Control type="number" name="liquid_density" value={this.state.liquid_density} step="0.1" onChange={this.handleFormChange}/>
                            </Col>
                            <Col md={2}>
                                <Form.Text id="helpText" muted>
                                [t/m<sup>3</sup>]
                                </Form.Text>
                            </Col>
    
                        </Form.Group>
    
                        <Form.Group as={Row} controlId="total_slurry">
                            <Form.Label column md={2}>
                                Total Slurry Throughput
                            </Form.Label>
                            <Col md={2}>
                                <Form.Control type="number" name="total_slurry" value={this.state.total_slurry} step="10" disabled/>
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
                                <Form.Control type="number" name="vol_throughput" value={this.state.vol_throughput} step="10" disabled/>
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
                                <Form.Control type="number" name="relative_density" value={this.state.relative_density} step="10" disabled/>
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
                                <Form.Control type="number" name="solid_content_mm" value={this.state.solid_content_mm} step="10" disabled/>
                                <Form.Control type="number" name="solid_content_vv" value={this.state.solid_content_vv} step="10" disabled/>
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

export default MassPull;