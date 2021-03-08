import React  from 'react';
import { Form, Row, Col } from 'react-bootstrap';

class BulkFlow extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            solid_throughput: 100, solid_density: 2.76, bulk_density: 1.7, liquid_density: 1.0, moisture_content: 4,
            liquid_medium: 0, total_throughput: 0, bulk_vol_throughput: 0
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.bulkFlowCalc())
    };

    handleFormChange(event){       
        this.setState(this.bulkFlowCalc({name: event.target.name, value: event.target.value}));
    };

    bulkFlowCalc(data){
        
        var solidThroughput;
        var liquidDensity;
        var bulkDensity;
        var moistureContent;

        
        if(data){

            switch(data.name){

                case "solid_throughput":
    
                    solidThroughput = data.value;
                    liquidDensity = this.state.liquid_density;
                    bulkDensity = this.state.bulk_density;
                    moistureContent = this.state.moisture_content/100;
                    break;
    
                case "moisture_content":
    
                    solidThroughput = this.state.solid_throughput;
                    liquidDensity = this.state.liquid_density;
                    bulkDensity = this.state.bulk_density;
                    moistureContent = data.value/100;
                    break;
                    
                case "liquid_density":
    
                    solidThroughput = this.state.solid_throughput;
                    liquidDensity = data.value;
                    bulkDensity = this.state.bulk_density;
                    moistureContent = this.state.moisture_content/100;
                    break;
    
                case "bulk_density":
    
                    solidThroughput = this.state.solid_throughput;
                    liquidDensity = this.state.liquid_density;
                    bulkDensity = data.value;
                    moistureContent = this.state.moisture_content/100;
                    break;
    
                default:
                    liquidDensity = this.state.liquid_density;
                    bulkDensity = this.state.bulk_density;
                    moistureContent = this.state.moisture_content/100;
                    solidThroughput = this.state.solid_throughput;
                    break;
    
            }
        }else{

            liquidDensity = this.state.liquid_density;
            bulkDensity = this.state.bulk_density;
            moistureContent = this.state.moisture_content/100;
            solidThroughput = this.state.solid_throughput;
        }

            
        
        

        var totalThroughput = solidThroughput/(1-(moistureContent)); // bulk
        var liquidMedium = (totalThroughput - solidThroughput)/liquidDensity;
        var bulkVolThroughput = solidThroughput/bulkDensity;  // bulk

        if(data){
            return {
                [data.name]: data.value,
                liquid_medium: liquidMedium.toFixed(3), 
                total_throughput: totalThroughput.toFixed(3), 
                bulk_vol_throughput: bulkVolThroughput.toFixed(3)
            }
        }else{
            return {
                liquid_medium: liquidMedium.toFixed(3), 
                total_throughput: totalThroughput.toFixed(3), 
                bulk_vol_throughput: bulkVolThroughput.toFixed(3)
            }
        }

    };

    render(){
        return(
            <Form>
            <div className="container">

                <div className="row divHeading">
                    <div className="col-md">
                        <h3>Mass Balance - Bulk Flow</h3>
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
                        <Form.Control type="number" value={this.state.solid_throughput}  step="10" name="solid_throughput" onChange={this.handleFormChange}/>
                    </Col>
                    <Col md={2}>
                        <Form.Text id="helpText" muted>
                        [ft]
                        </Form.Text>
                    </Col>
                    <Col md={2}>
                        <Form.Label>
                        Solids Density
                        </Form.Label>
                        <Form.Label >
                        Bulk Density
                        </Form.Label>
                    </Col>

                    <Col md={2}>
                        <Form.Control type="number" value={this.state.solid_density}  step="0.1" name="solid_density" onChange={this.handleFormChange}/>
                        <Form.Control type="number" value={this.state.bulk_density}  step="0.1" name="bulk_density" onChange={this.handleFormChange}/>
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
                        Liquid Medium
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
                        <Form.Control type="number" value={this.state.liquid_density}  step="0.1" name="liquid_density" onChange={this.handleFormChange}/>
                    </Col>
                    <Col md={2}>
                        <Form.Text id="helpText" muted>
                        [t/m<sup>3</sup>]
                        </Form.Text>
                    </Col>

                </Form.Group>

                <Form.Group as={Row} controlId="total_throughput">
                    <Form.Label column md={2}>
                        Total Throughput
                    </Form.Label>
                    <Col md={2}>
                        <Form.Control type="number" value={this.state.total_throughput} name="total_throughput" disabled/>
                    </Col>
                    <Col md={2}>
                        <Form.Text id="helpText" muted>
                        [t/h]
                        </Form.Text>
                    </Col>
                    <Form.Label column md={2}>
                         Bulk Volumetric Throughput
                    </Form.Label>
                    <Col md={2}>
                        <Form.Control type="number" value={this.state.bulk_vol_throughput} name="bulk_vol_throughput" disabled/>
                    </Col>
                    <Col md={2}>
                        <Form.Text id="helpText" muted>
                        [m<sup>3</sup>/h]
                        </Form.Text> 
                    </Col>

                </Form.Group>

                <Form.Group as={Row} controlId="ShellInsideLength">
                    <Form.Label column md={2}>
                        
                    </Form.Label>
                    <Col md={2}>
                        
                    </Col>
                    <Col md={2}>

                    </Col>
                    <Form.Label column md={2}>
                        Moisture Content(m/m)
                    </Form.Label>
                    <Col md={2}>
                        <Form.Control type="number" value={this.state.moisture_content}  step="1" name="moisture_content" onChange={this.handleFormChange}/>
                    </Col>
                    <Col md={2}>
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

export default BulkFlow