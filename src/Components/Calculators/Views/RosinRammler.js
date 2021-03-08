import React, { useState } from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'

class RosinRammler extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cutsize: 10, sharpness: 5.846, feed: 1000, oversize: 0, undersize: 0,
            dynamicFields: [{sieve: 0, feed: 0, oversize: 0, undersize: 0}]
        }

        this.handleFormChange = this.handleFormChange.bind(this);
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);

    }


    addField = () =>{
        this.setState((prevState) => ({
            dynamicFields: [...prevState.dynamicFields, {sieve: 0, feed: 0, oversize: 0, undersize: 0}]
        }))        
    }

    removeField = (index) => {

        if(this.state.dynamicFields.length > 1){
            let values = [
                ...this.state.dynamicFields.slice(0, index),
                ...this.state.dynamicFields.slice(index + 1)
              ]
    
           this.setState(() => ({
                dynamicFields: values
            }))
        }

    }

    handleFormChange(event){

        this.setState({[event.target.name] : event.target.value })

    }

    formCalculation(){
        
    }

    handleDynFormChange(i, event){

        let values = [...this.state.dynamicFields];
        
        switch(event.target.name){
            case "sieve":
                values[i].sieve = event.target.value
                break;
            case "feed":
                values[i].feed = event.target.value
            default:
                break;
        }

        this.setState({ values });
    }

    render() {

        return (
        <div>
            <div className="container">
                <h1 className="pageHeading">ROSIN-RAMMLER</h1>
            </div>
            <BackButton/>
            <Form>
                <div className="container">

                    <div className="row divHeading">
                        <div className="col-md">
                        <h3>Screen Cut Mass-Split</h3>
                        </div>
                    </div>
                    <div className="row justify-content-center itemHeading">
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <p><strong>Cutsize [mm]:</strong></p>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <p><strong>Sharpness of cut:</strong></p>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                    </div>

                    <div className="itemContent">


                        <Form.Group as={Row} className="justify-content-center">

                            <Col md={2} lg={2}>
                                <Form.Control type="number" name="cutsize" value={this.state.cutsize} onChange={this.handleFormChange}/>
                            </Col>
                            <Col md={2} lg={2}>
                                <Form.Control type="number" name="sharpness" value={this.state.sharpness} onChange={this.handleFormChange}/>
                            </Col>

                        </Form.Group>

                    </div>

                    <div className="row justify-content-center itemHeading">
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <p><strong>Feed</strong> <br/>[t/h]</p>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <p><strong>Oversize</strong> <br/>[t/h]</p>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <p><strong>Undersize</strong> <br/>[t/h]</p>
                        </div>
                        <div className="col-md-2 col-lg-2">
                            <label htmlFor="blank"></label>
                        </div>
                    </div>

                    <div className="itemContent">


                        <Form.Group as={Row} className="justify-content-center">
 
                            <Col md={2} lg={2}>
                                <Form.Control type="number" name="feed" value={this.state.feed} onChange={this.handleFormChange}/>
                            </Col>

                            <Col md={2} lg={2}>
                                <Form.Control type="number" disabled/>
                            </Col>
                            <Col md={2} lg={2}>
                                <Form.Control type="number" disabled/>
                            </Col>

                        </Form.Group>

                    </div>

                    <div className="row justify-content-center itemHeading">
                        <div className="col-2 col-md-2 col-lg-2">
                            <p><strong>Sieve Size</strong> <br/>[mm]</p>
                        </div>
                        <div className="col-2 col-md-2 col-lg-2">
                            <p><strong>Feed</strong> <br/>[% Passing]</p>
                        </div>
                        <div className="col-2 col-md-2 col-lg-2">
                            <p><strong>Oversize</strong> <br/>[% Passing]</p>
                        </div>
                        <div className="col-2 col-md-2 col-lg-2">
                            <p><strong>Undersize</strong> <br/>[% Passing]</p>
                        </div>
                    </div>
                    
                    {this.state.dynamicFields.map((field,index) => (
                        
                    <div className="itemContent" key={index}>


                        <Form.Group as={Row} >
                            <Col md={2}>
                                <Button variant="dark" onClick={this.addField}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                                <Button variant="dark" onClick={() => this.removeField(index)}><FontAwesomeIcon icon={faMinusSquare} /></Button>
                            </Col>
                            <Col md={2}>
                                <Form.Control type="number" name="sieve" min="0"   value={field.sieve} onChange={this.handleDynFormChange.bind(this,index)}/>
                            </Col>
                            <Col md={2}>
                                <Form.Control type="number" name="feed" min="0" max="100"value={field.feed} onChange={this.handleDynFormChange.bind(this,index)}/>
                            </Col>
                            <Col md={2}>
                                <Form.Control type="number" name="oversize" value={field.oversize} disabled/>
                            </Col>
                            <Col md={2}>
                                <Form.Control type="number" name="undersize" value={field.undersize} disabled/>
                            </Col>
                        </Form.Group>

                    </div>

                    ))}

                </div>
            </Form>
        </div>
    );
        
    }
}

// function RosinRammler() {

//     const [inputFields,setInputField] = useState([
//         {sieve: 0, feed: 0, oversize: 0, undersize: 0}
//     ]);

//     const addField = () => {
//         setInputField([...inputFields, {sieve: 0, feed: 0, oversize: 0, undersize: 0}]);
//     };

//     const removeField = (index) => {
//         const values = [...inputFields];
//         values.splice(index,1);
//         setInputField(values);
//     }
    

// }

export default RosinRammler;

