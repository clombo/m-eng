import React from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';

class TrommelScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            panelWidht: 610, panelLength: 610, panelThickness: 40, apertureWidth: 30, apertureLength: 30, openArea: 24,
            panelQtyCir: 16, panelQtyLen: 6,
            effecttiveScreenDia: 0, effectiveScreenLen: 0,
            exposedScreenFrac: 0.22,
            EffScreenArea: 0,
            OperationSpeed_1: 51, OperationSpeed_2: 11, OperationSpeed_3: 0,
            scrollModule: 8, scrollPitch: 0, solidAvgConSpeed: 0, materailAvg: 0,

            solid_throughput: 400, solid_density: 2.76, bulk_density: 1.7, liquid_medium: 400, liquid_density: 1,
            total_slurry: 0, vol_throughput: 0, relative_density: 0, solid_content_mm: 0, solid_content_vv: 0,

            screeningAreaReq: 0, screeningAreaUtil: 0

        }

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.TrommelCalcs())
    }


    handleFormChange(event) {
        this.setState(this.TrommelCalcs({name: [event.target.name],value: event.target.value}))
    }

    TrommelCalcs(data){
        var _panelWidht = this.state.panelWidht ;
        var _panelLength = this.state.panelLength ;
        var _panelThickness = this.state.panelThickness ;
        var _apertureWidth = this.state.apertureWidth ;
        var _apertureLength = this.state.apertureLength ;
        var _openArea = this.state.openArea ;
        var _panelQtyCir = this.state.panelQtyCir ;
        var _paneQtyLen = this.state.panelQtyLen ;
        var _effecttiveScreenDia = this.state.effecttiveScreenDia ;
        var _effectiveScreenLen = this.state.effectiveScreenLen ;
        var _exposedScreenFrac = this.state.exposedScreenFrac ;
        var _EffScreenArea = this.state.EffScreenArea ;
        var _OperationSpeed_1 = this.state.OperationSpeed_1 ;
        var _OperationSpeed_2 = this.state.OperationSpeed_2 ;
        var _OperationSpeed_3 = this.state.OperationSpeed_3 ;
        var _scrollModule = this.state.scrollModule ;
        var _scrollPitch = this.state.scrollPitch ;
        var _solidAvgConSpeed = this.state.solidAvgConSpeed ;
        var _materailAvg = this.state.materailAvg ;

        var _solid_throughput = this.state.solid_throughput ;
        var _solid_density = this.state.solid_density ;
        var _bulk_density = this.state.bulk_density ;
        var _liquid_medium = this.state.liquid_medium ;
        var _liquid_density = this.state.liquid_density ;
        var _total_slurry = this.state.total_slurry ;
        var _vol_throughput = this.state.vol_throughput ;
        var _relative_density = this.state.relative_density ;
        var _solid_content_mm = this.state.solid_content_mm ;
        var _solid_content_vv = this.state.solid_content_vv ;

        var _screeningAreaReq = this.state.screeningAreaReq ;
        var _screeningAreaUtil = this.state.screeningAreaUtil ;

        if(data){
            //console.log(data.name[])
            switch(data.name[0]){
                case "panelWidht":
                    _panelWidht = data.value;
                    break;
                case "panelLength":
                    _panelLength = data.value;
                    break;
                case "panelThickness":
                    _panelThickness = data.value;
                    break;
                case "apertureWidth":
                    _apertureWidth = data.value;
                    break;
                case "apertureLength":
                    _apertureLength = data.value;
                    break;
                case "openArea":
                    _openArea = data.value;
                    break;
                case "panelQtyCir":
                    _panelQtyCir = data.value;
                    break;
                case "panelQtyLen":
                    _paneQtyLen = data.value;
                    break;
                case "effecttiveScreenDia":
                    _effecttiveScreenDia = data.value;
                    break;
                case "effectiveScreenLen":
                    _effectiveScreenLen = data.value;
                    break;
                case "exposedScreenFrac":
                    _exposedScreenFrac = data.value;
                    break;
                case "EffScreenArea":
                    _EffScreenArea = data.value;
                    break;
                case "OperationSpeed_1":
                    _OperationSpeed_1 = data.value;
                    break;
                case "operationSpeed_2":
                    _OperationSpeed_2 = data.value;
                    break;
                case "operationSpeed_3":
                    _OperationSpeed_3 = data.value;
                    break;
                case "scrollModule":
                    _scrollModule = data.value;
                    break;
                case "scrollPitch":
                    _scrollPitch = data.value;
                    break;
                case "solidAvgConSpeed":
                    _solidAvgConSpeed = data.value;
                    break;
                case "materailAvg":
                    _materailAvg = data.value;
                    break;
                case "solid_throughput":
                    _solid_throughput = data.value;
                    break;
                case "solid_density":
                    _solid_density = data.value;
                    break;
                case "bulk_density":
                    _bulk_density = data.value;
                    break;
                case "liquid_medium":
                    _liquid_medium = data.value;
                    break;
                case "liquid_density":
                    _liquid_density = data.value;
                    break;
                case "total_slurry":
                    _total_slurry = data.value;
                    break;
                case "vol_throughput":
                    _vol_throughput = data.value;
                    break;
                case "relative_density":
                    _relative_density = data.value;
                    break;
                case "solid_content_mm":
                    _solid_content_mm = data.value;
                    break;
                case "solid_content_vv":
                    _solid_content_vv = data.value;
                    break;
                case "screeningAreaReq":
                    _screeningAreaReq = data.value;
                    break;
                case "screeningAreaUtil":
                    _screeningAreaUtil = data.value;
                    break;
                default:
                    break;
            }
        }

         // ISO Units
        var panel_width_m_var = 0.001*_panelWidht;
        var panel_length_m_var = 0.001*_panelLength;
        var panel_thickness_m_var = 0.001*_panelThickness;

         //Geometry Calculations
        var circ_centre_m = _panelQtyCir*panel_width_m_var;
        var dia_centre_m = circ_centre_m/Math.PI;
        var eff_idia_m = dia_centre_m - panel_thickness_m_var;

        var eff_screen_circ_m = eff_idia_m*Math.PI;
        var eff_screen_length_m = _paneQtyLen*panel_length_m_var;

        // Screening Surface
        var total_screening_surface_m2_var = eff_screen_circ_m*eff_screen_length_m;
        var eff_screening_surface_m2_var = _exposedScreenFrac*total_screening_surface_m2_var;

         // Rotational Speed
        var critical_speed_rads = Math.sqrt(2*9.807/eff_idia_m);
        // var critical_speed_rpm = critical_speed_rads*60/(2*Math.PI);
        var opp_speed_rads_var = _OperationSpeed_1*critical_speed_rads;
        var opp_speed_rpm_var = opp_speed_rads_var*60/(2*Math.PI);

        // Scroll
        var tangental_speed_mps_var = opp_speed_rads_var*(0.5*eff_idia_m);
        var conv_speed_mps_var = tangental_speed_mps_var/_scrollModule;
        var conv_speed_mmps_var = 1000*conv_speed_mps_var;

        var scroll_pitch_m_var = eff_screen_circ_m/_scrollModule;
        var retention_time_s_var = eff_screen_length_m/conv_speed_mps_var;

        // Calcs
        var liquid_tph_var = _liquid_medium*_liquid_density;
        var solids_m3ph_var = _solid_throughput/_solid_density;
        // var solids_bulk_m3ph_var = _solid_throughput/_bulk_density;
        var slurry_tph_var = (_solid_throughput - 0 + liquid_tph_var); // Error if - 0 is not used!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var slurry_m3ph_var = solids_m3ph_var + _liquid_medium;
        var relative_density_var = slurry_tph_var/slurry_m3ph_var;
        var solids_mpm_var = _solid_throughput/slurry_tph_var;
        var solids_vpv_var = solids_m3ph_var/slurry_m3ph_var;

        // Output Units
        var solids_mpmper_var = 100*solids_mpm_var;
        var solids_vpvper_var = 100*solids_vpv_var;

        var OAper = _openArea
        // ISO Units
        var OA = 0.01*OAper;
        var slotted_drainage_m3phm2_var = 36.648549 + 5.887052*OA + 2603.096002*Math.pow(OA,2);
        slotted_drainage_m3phm2_var = Math.min(455.5,slotted_drainage_m3phm2_var);

        var square_drainage_m3phm2_var = 0 + 1232.033246*OA -20084.118197*Math.pow(OA,2) +184136.986538*Math.pow(OA,3) -765526.567816*Math.pow(OA,4) +1251788.804569*Math.pow(OA,5);
        square_drainage_m3phm2_var = Math.min(140,square_drainage_m3phm2_var);

        var aperture_shape_var = _apertureLength/_apertureWidth;
        var drainage_m3phm2_var

        if (aperture_shape_var < 1.1) {    //taken as 1.1
            drainage_m3phm2_var = square_drainage_m3phm2_var;
        } else {
            drainage_m3phm2_var = slotted_drainage_m3phm2_var;
        }

        var screenDrainageArea_m2_var = slurry_m3ph_var/drainage_m3phm2_var;

        var screeningAreaUtilized_var = screenDrainageArea_m2_var/eff_screening_surface_m2_var;
        var screeningAreaUtilized_perc_var = 100*screeningAreaUtilized_var;

        //NEW -> Set final values
        _effecttiveScreenDia = eff_idia_m.toFixed(3)
        _effectiveScreenLen = eff_screen_length_m
        _EffScreenArea = eff_screening_surface_m2_var.toFixed(3)

        _OperationSpeed_3 = (opp_speed_rpm_var/100).toFixed(3)
        _scrollPitch = scroll_pitch_m_var.toFixed(3)
        _solidAvgConSpeed = (conv_speed_mmps_var/100).toFixed(3)
        _materailAvg = (retention_time_s_var*100).toFixed(3)

        _total_slurry = slurry_tph_var
        _vol_throughput = slurry_m3ph_var.toFixed(3)
        _relative_density = relative_density_var.toFixed(3)
        _solid_content_mm = solids_mpmper_var
        _solid_content_vv = solids_vpvper_var.toFixed(3)

        _screeningAreaReq = screenDrainageArea_m2_var.toFixed(3)
        _screeningAreaUtil = screeningAreaUtilized_perc_var.toFixed(3)

        return {
            panelWidht: _panelWidht,
            panelLength: _panelLength,
            panelThickness: _panelThickness,
            apertureWidth: _apertureWidth,
            apertureLength: _apertureLength,
            openArea: _openArea,
            panelQtyCir: _panelQtyCir,
            panelQtyLen: _paneQtyLen,
            effecttiveScreenDia: _effecttiveScreenDia,
            effectiveScreenLen: _effectiveScreenLen,
            exposedScreenFrac: _exposedScreenFrac,
            EffScreenArea: _EffScreenArea,
            OperationSpeed_1: _OperationSpeed_1,
            OperationSpeed_2: _OperationSpeed_2,
            OperationSpeed_3: _OperationSpeed_3,
            scrollModule: _scrollModule,
            scrollPitch: _scrollPitch,
            solidAvgConSpeed: _solidAvgConSpeed,
            materailAvg: _materailAvg,

            solid_throughput: _solid_throughput,
            solid_density: _solid_density,
            bulk_density: _bulk_density,
            liquid_medium: _liquid_medium,
            liquid_density: _liquid_density,
            total_slurry: _total_slurry,
            vol_throughput: _vol_throughput,
            relative_density: _relative_density,
            solid_content_mm: _solid_content_mm,
            solid_content_vv: _solid_content_vv,

            screeningAreaReq: _screeningAreaReq,
            screeningAreaUtil: _screeningAreaUtil

        }

    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="pageHeading">Trommel Screen Sizing</h1>
                </div>
                <BackButton />


                <Form>
                    <div className="container">

                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Panel Size</h3>
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

                            <Form.Group as={Row} controlId="panelWidht">
                                <Form.Label column md={4}>
                                    Panel Width:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="panelWidht" value={this.state.panelWidht} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="panelLength">
                                <Form.Label column md={4}>
                                    Panel Length:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="panelLength" value={this.state.panelLength} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="panelThickness">
                                <Form.Label column md={4}>
                                    Panel Thickness:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="panelThickness" value={this.state.panelThickness} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="apertureWidth">
                                <Form.Label column md={4}>
                                    Aperture Width (Axial):
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="apertureWidth" value={this.state.apertureWidth} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="apertureLength">
                                <Form.Label column md={4}>
                                    Aperture Length (Tangental):
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="apertureLength" value={this.state.apertureLength} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="openArea">
                                <Form.Label column md={4}>
                                    Open Area:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="openArea" value={this.state.openArea} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [%]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                        </div>
                    </div>

                    <br />


                    <div className="container">
                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Panels Assembly Layout</h3>
                            </div>
                        </div>

                        <div className="row justify-content itemHeading alignLeft">
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Parameters</strong></p>
                            </div>
                            <div className="col-4 col-md-4 col-sm">
                                <p><strong>Input Value</strong></p>
                            </div>

                        </div>

                        <div className="itemContent">

                            <Form.Group as={Row} controlId="panelQtyCir">
                                    <Form.Label column md={4}>
                                        Panels Quantity in Circumference of Trommel:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="panelQtyCir" value={this.state.panelQtyCir} onChange={this.handleFormChange} />

                                    </Col>
                                    <Col md={4}>

                                    </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="panelQtyLen">
                                    <Form.Label column md={4}>
                                        Panels Quantity in Length of Trommel:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="panelQtyLen" value={this.state.panelQtyLen} onChange={this.handleFormChange}  />

                                    </Col>
                                    <Col md={4}>


                                    </Col>
                            </Form.Group>

                        </div>

                    </div>

                    <br />



                    <div className="container">
                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Trommel Geometrical Size</h3>
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

                            <Form.Group as={Row} controlId="effecttiveScreenDia">
                                <Form.Label column md={4}>
                                    Effective Screening Diameter:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="effecttiveScreenDia" value={this.state.effecttiveScreenDia} disabled />

                                </Col>
                                <Col md={4}>
                                    <Form.Text id="helpText" muted>
                                        [m]
                                    </Form.Text>

                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="effectiveScreenLen">
                                <Form.Label column md={4}>
                                    Effective Screening Length:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="effectiveScreenLen" value={this.state.effectiveScreenLen} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                            [m]
                                    </Form.Text>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="exposedScreenFrac">
                                <Form.Label column md={4}>
                                    Exposed Screening Fraction:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="exposedScreenFrac" step="0.01" value={this.state.exposedScreenFrac} onChange={this.handleFormChange} />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m<sup>2</sup>/m<sup>2</sup>]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="EffScreenArea">
                                <Form.Label column md={4}>
                                    Effective Screening Area:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="EffScreenArea" value={this.state.EffScreenArea} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m<sup>2</sup>]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                        </div>

                    </div>

                    <br />


                    <div className="container">
                        <div className="row divHeading">
                            <div className="col-md">
                                <h3>Trommel Speed</h3>
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
                        <Form.Group as={Row} controlId="OperationSpeed_1">
                                <Form.Label column md={4}>
                                    Operational Speed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="OperationSpeed_1" value={this.state.OperationSpeed_1} onChange={this.handleFormChange}/>
                                </Col>
                                <Col md={4}>
                                    <Form.Text id="helpText" muted>
                                        [% Crit]
                                    </Form.Text>

                                </Col>
                                <Col md={4}>

                                </Col>
                                <Col md={4}>
                                    <Form.Control type="number" name="OperationSpeed_2" value={this.state.OperationSpeed_2} onChange={this.handleFormChange}/>
                                </Col>

                                <Col md={4}>
                                <Form.Control type="number" name="OperationSpeed_3" value={this.state.OperationSpeed_3} disabled/>
                                <Form.Text id="helpText" muted>
                                    [rpm]
                                </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="scrollModule">
                                <Form.Label column md={4}>
                                    Scroll Module:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="scrollModule" value={this.state.scrollModule} onChange={this.handleFormChange}/>

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m/m]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="scrollPitch">
                                <Form.Label column md={4}>
                                    Scroll Pitch:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="scrollPitch" value={this.state.scrollPitch} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [m]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="solidAvgConSpeed">
                                <Form.Label column md={4}>
                                    Solids Average Conveying Speed:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="solidAvgConSpeed" value={this.state.solidAvgConSpeed} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [mm/s]
                                    </Form.Text>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="materailAvg">
                                <Form.Label column md={4}>
                                    Material Average Retention Time:
                                </Form.Label>
                                <Col md={4}>
                                    <Form.Control type="number" name="materailAvg" value={this.state.materailAvg} disabled />

                                </Col>
                                <Col md={4}>

                                    <Form.Text id="helpText" muted>
                                        [s]
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                        </div>


                    </div>

                    <br />

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
                                <Form.Control type="number" name="liquid_density" value={this.state.liquid_density} step="0.01" onChange={this.handleFormChange}/>
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
                    <br />
                    <hr />
                    <br />
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
                            <Form.Group as={Row} controlId="screeningAreaReq">
                                    <Form.Label column md={4}>
                                        Screening Area Required:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="screeningAreaReq" value={this.state.screeningAreaReq} disabled />

                                    </Col>
                                    <Col md={4}>

                                        <Form.Text id="helpText" muted>
                                            [m<sup>2</sup>]
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="screeningAreaUtil">
                                    <Form.Label column md={4}>
                                        Screening Area Utilized:
                                    </Form.Label>
                                    <Col md={4}>
                                        <Form.Control type="number" name="screeningAreaUtil" value={this.state.screeningAreaUtil} disabled />

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
        );
    }
}

export default TrommelScreen;