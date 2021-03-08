import React from 'react';
import BackButton from '../../Main/NavSections/BackButton';
import '../../Calculators/Calculators.css';
import { Form, Row, Col } from 'react-bootstrap';
import { CSVLink } from "react-csv";


class Mill extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      // Shell Sizing Parameters
      millShellInsideDiameter_m: 8.235, millShellInsideDiameter_ft: 27.0, millShellInsideLength_m: 4.27, millShellInsideLength_ft: 14.0,
      shellHeadsConeAngle: 15, effectiveGrindingDiameter: 0, effectiveGringingLength: 0, operationalSpeedPercCritical_perc: 72, operationalSpeedPercCritical_rpm: 10.765,
      speedCritcalMaxPowerDraw_perc: 0, speedCritcalMaxPowerDraw_rpm: 0,

      // Liner System
      dischargeType: 7.98, gratedChamberLength: 305, lineType: 1.1, lifterBarsQuantity: 0, shellplatesThickness: 117.5, endplatesThickness: 135,

      // Charge fill
      totalChargeFill: 35, ballChargeFill: 10, totalChargeDensity: 0, ballChargeDensity: 7.8, ballTopSize_refillSize: 0,

      // Mill Power Draw Available - Mechanical
      powerDrawModel_bond: 0, powerDrawModel_morrell: 0,

      // Mass Balance - Density Fractions
      solidsThroughput: 200, solidsDensity: 2.75, bulkDensity: 1.65, liquidMediumThroughput: 0, liquidDensity: 1, totalSlurryThroughput: 0,
      volumetricThroughput: 0, relativeDensity: 0, solidsContent_mm: 70, solidsContent_vv: 0,

      // Grinding Specifictions
      f80FeedSize: 150000, p80ProductSize: 75, workIndex_BallMill: 14, workIndex_Crushing: 19, millingCircuitArrangement: 1, pxxPassingsizecontrol: 80, processCondition: 1.3,
      abrasionIndex: 0.2,

      // Power Required - Metallurgical
      throughputCapacity: 0, specificEnergyRequired: 0, powerRequired: 0,

      // Mill Selection Result
      availablePowerUtilized: 0,

      //Result
      formResult1: 0, formResult2: 0
    }

    // this.ConversionInputChange = this.ConversionInputChange.bind(this);
    // this.feetInputChange = this.feetInputChange.bind(this);
    // this.UnversalFormChange = this.UnversalFormChange.bind(this);

    this.handleMeterChange = this.handleMeterChange.bind(this);

    var csvString = [
      ["MetEngineer Grinding Mill Sizing Sheet Results", "\n"],
      ["\n"],
      ["\n"],
      ["Property", , "Value", "Units", "\n"],
      ["\n"],
      // Mechanical Data
      ["Mill Design & Charge Motion", "\n"],
      // Shell Sizing Parameters
      ["Mill Shell Inside Diameter", , this.state.millShellInsideDiameter_m, "[m]", "\n"],
      ["Mill Shell Inside Length", , this.state.millShellInsideLength_m, "[m]", "\n"],
      ["Shell Heads Cone Angle", , this.state.shellHeadsConeAngle, "[degrees]", "\n"],
      ["Effective Grinding Diameter", , this.state.effectiveGrindingDiameter, "[m]", "\n"],
      ["EGL Effective Grinding Length", , this.state.effectiveGringingLength, "[m]", "\n"],
      ["Operational Speed %Critical", , this.state.operationalSpeedPercCritical_perc, "[fraction]", "\n"],
      // liner system
      ["Discharge Type", , this.state.dischargeType, "\n"],
      ["Liner Type", , this.state.lineType, "\n"],
      ["Lifter Bars Quantity", , this.state.lifterBarsQuantity, "QTY", "\n"],
      ["Shellplates Thickness", , this.state.shellplatesThickness, "[mm]", "\n"],
      ["Endplates  Thickness", , this.state.endplatesThickness, "[mm]", "\n"],
      // Charge fill
      ["Total Charge Fill", , this.state.totalChargeFill, "[fraction]", "\n"],
      ["Ball Charge Fill", , this.state.ballChargeFill, "[fraction]", "\n"],
      ["Total Charge Density", , this.state.totalChargeDensity, "[t/m3]", "\n"],
      ["Ball Charge Density", , this.state.ballChargeDensity, "[t/m3]", "\n"],
      ["Ball Top Size / Re-fill Size", , this.state.ballTopSize_refillSize, "[mm]", "\n"],
      // Mill Power Draw Available - Mechanical
      ["Power Draw Model - Bond", , this.state.powerDrawModel_bond, "[kW]", "\n"],
      ["Power Draw Model - Morrell", , this.state.powerDrawModel_morrell, "[kW]", "\n"],
      ["\n"],
      // Metallurgical Data
      ["Process Parameters", "\n"],
      ["Solids Throughput", , this.state.solidsThroughput, "[t/h]", "\n"],
      ["Ore Density", , this.state.solidsDensity, "[t/m3]", "\n"],
      ["Solids Content (m/m)", , this.state.solidsContent_mm, "[fraction]", "\n"],
      // Grinding Specifictions
      ["Feed Size - 80% Passing", , this.state.f80FeedSize, "[um]", "\n"],
      //[, , productsize_um_var, "[um]", "\n"],
      ["Ball Mill Work Index - Wi_BM", , this.state.workIndex_BallMill, "[kWh/t]", "\n"],
      ["Crushing Work Index - Wi_C", , this.state.workIndex_Crushing, "[kWh/t]", "\n"],
      ["Milling Circuit Arrangement", , this.state.millingCircuitArrangement, "\n"],
      // if (circuit_arr_var =! 1) {
        ["Product size parameter - fraction passing", , this.state.pxxPassingsizecontrol, "[fraction]", "\n"],
      // }
      ["Process Condition", , this.state.processCondition, "\n"],
      ["Abrasion Index (Ai)", , this.state.abrasionIndex, "\n"],
      ["Specific Energy Required", , this.state.specificEnergyRequired, "[kWh/t]", "\n"],
      ["Power Required", , this.state.formResult1, "[kW]", "\n"],




      ["\n"],
      // ["Mill Utilization", "\n"],
      ["Available Power Utilized", , this.state.formResult2, "[%]", "\n"],




      ["\n"],
      ["\n"],
      ["Calculator URL:", , "www.metengineer.com", "\n"],
      ["Contact:", , "engineer@metengineer.com", "\n"],
      ["\n"],

    ];

  }

  componentDidMount(){
    this.setState(this.ConversionInputChange())
};

  handleMeterChange(event){
    this.setState(this.ConversionInputChange({name: event.target.name, value: event.target.value}))
  }

  ConversionInputChange(data) {

      // Shell Sizing Parameters
      var _millShellInsideDiameter_m = parseFloat(this.state.millShellInsideDiameter_m)
      var _millShellInsideDiameter_ft = parseFloat(this.state.millShellInsideDiameter_ft)
      var _millShellInsideLength_m = parseFloat(this.state.millShellInsideLength_m)
      var _millShellInsideLength_ft = parseFloat(this.state.millShellInsideLength_ft)
      var _shellHeadsConeAngle = this.state.shellHeadsConeAngle
      var _effectiveGrindingDiameter = parseFloat(this.state.effectiveGrindingDiameter)
      var _effectiveGringingLength = this.state.effectiveGringingLength
      var _operationalSpeedPercCritical_perc = this.state.operationalSpeedPercCritical_perc
      var _operationalSpeedPercCritical_rpm = parseFloat(this.state.operationalSpeedPercCritical_rpm)
      var _speedCritcalMaxPowerDraw_perc = this.state.speedCritcalMaxPowerDraw_perc
      var _speedCritcalMaxPowerDraw_rpm = this.state.speedCritcalMaxPowerDraw_rpm

      // Liner System
      var _dischargeType = this.state.dischargeType
      var _gratedChamberLength = this.state.gratedChamberLength
      var _lineType = this.state.lineType
      var _lifterBarsQuantity = this.state.lifterBarsQuantity
      var _shellplatesThickness = this.state.shellplatesThickness
      var _endplatesThickness = this.state.endplatesThickness

      // Charge fill
      var _totalChargeFill = this.state.totalChargeFill
      var _ballChargeFill = this.state.ballChargeFill
      var _totalChargeDensity = this.state.totalChargeDensity
      var _ballChargeDensity = this.state.ballChargeDensity
      var _ballTopSize_refillSize = this.state.ballTopSize_refillSize

      // Mill Power Draw Available - Mechanical
      var _powerDrawModel_bond = this.state.powerDrawModel_bond
      var _powerDrawModel_morrell = this.state.powerDrawModel_morrell

      // Mass Balance - Density Fractions
      var _solidsThroughput = this.state.solidsThroughput
      var _solidsDensity = this.state.solidsDensity
      var _bulkDensity = this.state.bulkDensity
      var _liquidMediumThroughput = this.state.liquidMediumThroughput
      var _liquidDensity = this.state.liquidDensity
      var _totalSlurryThroughput = this.state.totalSlurryThroughput
      var _volumetricThroughput = this.state.volumetricThroughput
      var _relativeDensity = this.state.relativeDensity
      var _solidsContent_mm = this.state.solidsContent_mm
      var _solidsContent_vv = this.state.solidsContent_vv

      // Grinding Specifictions
      var _f80FeedSize = this.state.f80FeedSize
      var _p80ProductSize = this.state.p80ProductSize
      var _workIndex_BallMill = this.state.workIndex_BallMill
      var _workIndex_Crushing = this.state.workIndex_Crushing
      var _millingCircuitArrangement = this.state.millingCircuitArrangement
      var _pxxPassingsizecontrol = this.state.pxxPassingsizecontrol
      var _processCondition = this.state.processCondition
      var _abrasionIndex = this.state.abrasionIndex

      // Power Required - Metallurgical
      var _throughputCapacity = this.state.throughputCapacity
      var _specificEnergyRequired = this.state.specificEnergyRequired
      var _powerRequired = this.state.powerRequired

      // Mill Selection Result
      var _availablePowerUtilized = this.state.availablePowerUtilized

      //Result
      var _formResult1 = this.state.formResult1
      var _formResult2 = this.state.formResult2

    if(data){

      switch(data.name){
        case "millShellInsideDiameter_m":
          _millShellInsideDiameter_m = parseFloat(data.value);
          _millShellInsideDiameter_ft = _millShellInsideDiameter_m/0.305;

          break;
        case "millShellInsideDiameter_ft":
          _millShellInsideDiameter_ft = parseFloat(data.value);
          _millShellInsideDiameter_m = _millShellInsideDiameter_ft*0.305

          break;
        case "millShellInsideLength_m":

          _millShellInsideLength_m = parseFloat(data.value);
          _millShellInsideLength_ft = _millShellInsideLength_m/0.305;
          break;
        case "millShellInsideLength_ft":

          _millShellInsideLength_ft = parseFloat(data.value);
          _millShellInsideLength_m = _millShellInsideLength_ft*0.305
          break;
        case "shellHeadsConeAngle":
          _shellHeadsConeAngle = data.value;
          break;
        case "effectiveGringingLength":
          _effectiveGringingLength = data.value;
          break;
        case "operationalSpeedPercCritical_perc":
          _operationalSpeedPercCritical_perc = data.value;
          break;
        case "operationalSpeedPercCritical_rpm":
          _operationalSpeedPercCritical_rpm = data.value;
          break;
        case "speedCritcalMaxPowerDraw_perc":
          _speedCritcalMaxPowerDraw_perc = data.value;
          break;
        case "speedCritcalMaxPowerDraw_rpm":
          _speedCritcalMaxPowerDraw_rpm = data.value;
          break;
        case "dischargeType":
          _dischargeType = data.value;
          console.log('test')
          break;
        case "gratedChamberLength":
          _gratedChamberLength = data.value;
          break;
        case "lineType":
          _lineType = data.value;
          break;
        case "lifterBarsQuantity":
          _lifterBarsQuantity = data.value;
          break;
        case "shellplatesThickness":
          _shellplatesThickness = data.value;
          break;
        case "endplatesThickness":
          _endplatesThickness = data.value;
          break;
        case "totalChargeFill":
          _totalChargeFill = data.value;
          break;
        case "ballChargeFill":
          _ballChargeFill = data.value;
          break;
        case "totalChargeDensity":
          _totalChargeDensity = data.value;
          break;
        case "ballChargeDensity":
          _ballChargeDensity = data.value;
          break;
        case "ballTopSize_refillSize":
          _ballTopSize_refillSize = data.value;
          break;
        case "powerDrawModel_morrell":
          _powerDrawModel_morrell = data.value;
          break;
        case "solidsThroughput":
          _solidsThroughput= data.value;
          break;
        case "bulkDensity":
          _bulkDensity = data.value;
          break;
        case "liquidMediumThroughput":
          _liquidMediumThroughput = data.value;
          break;
        case "liquidDensity":
          _liquidDensity = data.value;
          break;
        case "totalSlurryThroughput":
          _totalSlurryThroughput = data.value;
          break;
        case "volumetricThroughput":
          _volumetricThroughput = data.value;
          break;
        case "relativeDensity":
          _relativeDensity = data.value;
          break;
        case "solidsContent_mm":
          _solidsContent_mm = data.value;
          break;
        case "solidsContent_vv":
          _solidsContent_vv = data.value;
          break;
        case "f80FeedSize":
          _f80FeedSize = data.value;
          break;
        case "p80ProductSize":
          _p80ProductSize = data.value;
          break;
        case "workIndex_BallMill":
          _workIndex_BallMill = data.value;
          break;
        case "workIndex_Crushing":
          _workIndex_Crushing = data.value;
          break;
        case "millingCircuitArrangement":
          _millingCircuitArrangement = data.value;
          console.log(_millingCircuitArrangement)
          break;
        case "pxxPassingsizecontrol":
          _pxxPassingsizecontrol = data.value;
          break;
        case "processCondition":
          _processCondition = data.value;
          break;
        case "abrasionIndex":
          _abrasionIndex = data.value;
          break;
        case "throughputCapacity":
          _throughputCapacity = data.value;
          break;
        case "specificEnergyRequired":
          _specificEnergyRequired = data.value;
          break;
        case "powerRequired":
          _powerRequired = data.value;
          break;
        case "availablePowerUtilized":
          _availablePowerUtilized = data.value;
          break;
        default:
          break;
      }
   
    }

    //Linear System Run
    var shell_id_m_var = _millShellInsideDiameter_m
    var shellplates_m_var = _shellplatesThickness*0.001;
    var eff_dia_m_var = shell_id_m_var - 2 * shellplates_m_var;

    _effectiveGrindingDiameter = eff_dia_m_var

    var shell_length_m_var = _millShellInsideLength_m;
    var endplates_m_var = _endplatesThickness*0.001;
    var chamber_m_var = _gratedChamberLength*0.001;

    var egl_m_var = shell_length_m_var - 2 * endplates_m_var - chamber_m_var;
    _effectiveGringingLength = egl_m_var


    if (shell_id_m_var >= 2.440) {
      _lifterBarsQuantity = 2*Math.ceil((6.55737704918032*shell_id_m_var + 0)/2);   // decreased by smallest decimal to avoid overeshoot, real constant is 6.55737704918033
    } else if (shell_id_m_var <= 1.220) {
      _lifterBarsQuantity = 2*Math.ceil((6.55737704918032*shell_id_m_var + 4)/2);
    } else {
      _lifterBarsQuantity = 2*Math.ceil((3.27868852459016*shell_id_m_var + 8)/2);
    }


    //Charge Run

    var totalcharge_fill_frac_var = _totalChargeFill*0.01;
    var ballcharge_fill_frac_var = _ballChargeFill*0.01;
    var ballcharge_density_tpm3_var = _ballChargeDensity;  
    var solids_tpm3_var = _solidsDensity;
    var e_var = 0.4;
    var u_var = 1.0;

    var solids_mpmfrac_var = _solidsContent_mm*0.01
    var liquid_tpm3_var = _liquidDensity;
    var relative_density_tpm3_var = 1/(solids_mpmfrac_var*(1/solids_tpm3_var + (1/solids_mpmfrac_var-1)/liquid_tpm3_var));
    var solids_vpvfrac_var = relative_density_tpm3_var*solids_mpmfrac_var/solids_tpm3_var;
    var totalcharge_density_tpm3_var = solids_tpm3_var*(1-e_var+e_var*u_var*solids_vpvfrac_var) + (ballcharge_density_tpm3_var-solids_tpm3_var)*(1-e_var)*ballcharge_fill_frac_var/totalcharge_fill_frac_var + e_var*u_var*(1-solids_vpvfrac_var);
  
    _totalChargeDensity = Math.round(totalcharge_density_tpm3_var * 100 + Number.EPSILON ) / 100;

    var critical_speed_frac_var = _speedCritcalMaxPowerDraw_perc*0.01;
  
    var bond_mill_power_draw_var = (_dischargeType/7.98)*7.33 * (egl_m_var/eff_dia_m_var) * ballcharge_fill_frac_var * critical_speed_frac_var * (1 - 0.937*ballcharge_fill_frac_var) * (1 - 0.1/(Math.pow(2,(9-10*critical_speed_frac_var)))) * (ballcharge_density_tpm3_var * Math.pow(eff_dia_m_var,3.3));
    _powerDrawModel_bond = Math.round(bond_mill_power_draw_var * 1 + Number.EPSILON ) / 1;

    //Process input run

  // INPUTS
  var solids_tph_var = _solidsThroughput;
  //var bulk_tpm3_var = _bulkDensity;

  // // Calcs
  var slurry_tph_var = solids_tph_var/solids_mpmfrac_var;
  var slurry_m3ph_var = (solids_tph_var/solids_tpm3_var)/solids_vpvfrac_var;
  var liquid_m3ph_var = (solids_tph_var/solids_tpm3_var)/solids_vpvfrac_var - (solids_tph_var/solids_tpm3_var);

  // // innerHTML
  _totalSlurryThroughput = Math.round(slurry_tph_var * 100 + Number.EPSILON ) / 100;
  _volumetricThroughput = Math.round(slurry_m3ph_var * 100 + Number.EPSILON ) / 100;
  _liquidMediumThroughput = Math.round(liquid_m3ph_var * 100 + Number.EPSILON ) / 100;
  _relativeDensity = Math.round(relative_density_tpm3_var * 1000 + Number.EPSILON ) / 1000;
  _solidsContent_vv = Math.round(100*solids_vpvfrac_var * 10 + Number.EPSILON ) / 10;

  var critical_optimumspeed_frac_var = 0.954 - 0.135*totalcharge_fill_frac_var;
  _speedCritcalMaxPowerDraw_perc = Math.round(100*critical_optimumspeed_frac_var * 10 + Number.EPSILON ) / 10;

  var critical_speed_radps_var = Math.sqrt(2*9.80665/eff_dia_m_var);
  var critical_optimumspeed_radps_var = critical_optimumspeed_frac_var*critical_speed_radps_var;

  critical_speed_frac_var = _operationalSpeedPercCritical_perc/100;

  var critical_optimumspeed_rpm_var = critical_optimumspeed_radps_var*60/(2*Math.PI);
  _speedCritcalMaxPowerDraw_rpm = Math.round(critical_optimumspeed_rpm_var * 10 + Number.EPSILON ) / 10;
  
  var opp_speed_radps_var = critical_speed_frac_var*critical_speed_radps_var;
  var opp_speed_rpm_var = opp_speed_radps_var*60/(2*Math.PI);

  var bbwi_kwhpt_var = _workIndex_BallMill;
  var feedsize_um_var = _f80FeedSize;

  _ballTopSize_refillSize = 4.5*Math.pow(feedsize_um_var,0.263)*Math.pow(solids_tpm3_var*bbwi_kwhpt_var,0.4)/(Math.pow(opp_speed_rpm_var*eff_dia_m_var,0.25));

  bond_mill_power_draw_var = (_dischargeType/7.98)*7.33 * (egl_m_var/eff_dia_m_var) * ballcharge_fill_frac_var * critical_speed_frac_var * (1 - 0.937*ballcharge_fill_frac_var) * (1 - 0.1/(Math.pow(2,(9-10*critical_speed_frac_var)))) * (ballcharge_density_tpm3_var * Math.pow(eff_dia_m_var,3.3));
  _powerDrawModel_bond = Math.round(bond_mill_power_draw_var * 1 + Number.EPSILON ) / 1;


  var coneangle_deg_var = _shellHeadsConeAngle;
  
  // Level-4 Calcs
  // cone
  var coneangle_rad_var = coneangle_deg_var*2*Math.PI/360;
  var conecylindricallength_m_var = 2*(0.5*eff_dia_m_var)*Math.tan(coneangle_rad_var);  // allowance for flat grate not introduced yet
  var conemeanlength_m_var = 0.5*conecylindricallength_m_var;

  // omega
  var omega = 2*(2.9863*critical_speed_frac_var - 2.2129*Math.pow(critical_speed_frac_var,2) -0.49267);
  // console.log(conemeanlength_m_var, critical_optimumspeed_frac_var, omega)
  
  // Level-3 Calcs
  var effegl_m_var = egl_m_var*(1 + 2.28*totalcharge_fill_frac_var*(1-totalcharge_fill_frac_var)*(conemeanlength_m_var/egl_m_var));
  var speedfunction_var = critical_speed_frac_var*(1 - (1-critical_optimumspeed_frac_var)*Math.exp(-19.42*(critical_optimumspeed_frac_var-critical_speed_frac_var)));
  var fillingfunction_var = totalcharge_fill_frac_var*(omega - totalcharge_fill_frac_var)/(Math.pow(omega,2));
  
  // Level-2 Calcs
  eff_dia_m_var = parseFloat(eff_dia_m_var); // blue in console.log is a go...
  egl_m_var = parseFloat(egl_m_var);

  var power_noload_kw_var = 1.68*Math.pow(eff_dia_m_var,2.05) * Math.pow(critical_speed_frac_var*(0.667*conemeanlength_m_var + egl_m_var),0.82);
  var power_net_kw_var = _dischargeType * Math.pow(eff_dia_m_var,2.5) * effegl_m_var * totalcharge_density_tpm3_var * fillingfunction_var * speedfunction_var;
  
  // Level-1 Calcs
  var epower_draw_kw_var = power_noload_kw_var + power_net_kw_var;
  _powerDrawModel_morrell = Math.round(epower_draw_kw_var * 1 + Number.EPSILON ) / 1;

  _throughputCapacity = _solidsThroughput

  var product_passing_fraction_var = _pxxPassingsizecontrol/100;
  
  if (_millingCircuitArrangement !== 1) {
    _millingCircuitArrangement = 1.014 + 0.0005317*Math.exp(7.3139*product_passing_fraction_var);
  }
  

  var feed_size_cfactor_var;
  var ideal_feed_size_var = 4000*Math.sqrt(1.1*13/bbwi_kwhpt_var);

  var ideal_feed_size_cfactor_var = 1 + (_p80ProductSize/feedsize_um_var)*(bbwi_kwhpt_var/1.1 - 7)*(feedsize_um_var/(4000*Math.sqrt(1.1*13/bbwi_kwhpt_var)) - 1);
  if (feedsize_um_var < ideal_feed_size_var) {
    feed_size_cfactor_var = 1;
  } else {
    feed_size_cfactor_var = ideal_feed_size_cfactor_var;
  }
  // F4 Product Size Factor (if fine grind smaller than 75um & larger than 15um)
  var fine_product_size_cfactor_var;
  if (_p80ProductSize > 74) {
    fine_product_size_cfactor_var = 1;
  } else {
    fine_product_size_cfactor_var = (_p80ProductSize - 0 + 10.3)/(1.145 * _p80ProductSize);  // Error if - 0 is not used!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  
  // F5 reduction ratio factor
  var reduction_ratio_cfactor_var;
  var reduction_ratio_var = feedsize_um_var/_p80ProductSize;
  if (reduction_ratio_var > 6) {
    reduction_ratio_cfactor_var = 1;
  } else {
    reduction_ratio_cfactor_var = (feedsize_um_var - 1.22*_p80ProductSize)/(feedsize_um_var - 1.35*_p80ProductSize);
  }
  // F7 Diameter Ratio
  var dia_ratio_cfactor_var;
  // var shellplates_m_var = document.getElementById("shellplates_mm_id").value*0.001;

  if (eff_dia_m_var >= 3.81) {
    dia_ratio_cfactor_var = 0.914;
  } else {
    dia_ratio_cfactor_var = Math.pow(2.44/eff_dia_m_var,0.2);
  }
  
  
  var cfactors_product = _processCondition*_millingCircuitArrangement*feed_size_cfactor_var*fine_product_size_cfactor_var*reduction_ratio_cfactor_var*dia_ratio_cfactor_var*_lineType;
  
  
  var bwi_opp_kwhpt_var = bbwi_kwhpt_var*cfactors_product;
  var cwi_opp_kwhpt_var = 1.25*_workIndex_Crushing*cfactors_product;
  var transfer_size_um_var = 10000;
  
  if (feedsize_um_var <= transfer_size_um_var) {
    var bond_specific_energy_kwhpt_var = 10*bwi_opp_kwhpt_var*(1/Math.sqrt(_p80ProductSize) - 1/Math.sqrt(feedsize_um_var));
   // document.getElementById("crushing_workindex_row_id").style.display = "none";
  } else {
    var bond_ball_specific_energy_kwhpt_var = 10*bwi_opp_kwhpt_var*(1/Math.sqrt(_p80ProductSize) - 1/Math.sqrt(transfer_size_um_var));
    var bond_crushing_specific_energy_kwhpt_var = 10*cwi_opp_kwhpt_var*(1/Math.sqrt(transfer_size_um_var) - 1/Math.sqrt(feedsize_um_var));
    bond_specific_energy_kwhpt_var = bond_ball_specific_energy_kwhpt_var + bond_crushing_specific_energy_kwhpt_var;
  //  document.getElementById("crushing_workindex_row_id").style.display = "block";
  }
  
//  document.getElementById("bond_specific_energy_id").innerHTML = Math.round(bond_specific_energy_kwhpt_var * 100 + Number.EPSILON ) / 100;
  
  
  var power_req_bond_var = solids_tph_var*bond_specific_energy_kwhpt_var;
  _powerRequired = Math.round(power_req_bond_var * 1 + Number.EPSILON ) / 1;

  _specificEnergyRequired = Math.round(bond_specific_energy_kwhpt_var * 100 + Number.EPSILON ) / 100


  // Morrell
  var morrell_utilization_frac_var = power_req_bond_var/epower_draw_kw_var;  // Bond and/or Morrell
  var morrell_utilization_perc_var = 100*morrell_utilization_frac_var;
  var morrell_utilization_percround_var = Math.round(morrell_utilization_perc_var);
  _availablePowerUtilized = morrell_utilization_percround_var;

  _formResult1 = Math.round(epower_draw_kw_var);
  _formResult2 = Math.round(power_req_bond_var);

    return {
      millShellInsideDiameter_m : _millShellInsideDiameter_m.toFixed(3),
      millShellInsideDiameter_ft : _millShellInsideDiameter_ft.toFixed(3),
      millShellInsideLength_m : _millShellInsideLength_m.toFixed(3),
      millShellInsideLength_ft : _millShellInsideLength_ft.toFixed(3),
      shellHeadsConeAngle: _shellHeadsConeAngle,
      effectiveGrindingDiameter : _effectiveGrindingDiameter.toFixed(3), 
      effectiveGringingLength: _effectiveGringingLength.toFixed(3), 
      operationalSpeedPercCritical_perc: _operationalSpeedPercCritical_perc, 
      operationalSpeedPercCritical_rpm: _operationalSpeedPercCritical_rpm.toFixed(3),
      speedCritcalMaxPowerDraw_perc: _speedCritcalMaxPowerDraw_perc, 
      speedCritcalMaxPowerDraw_rpm: _speedCritcalMaxPowerDraw_rpm,
      dischargeType: _dischargeType, 
      gratedChamberLength: _gratedChamberLength, 
      lineType: _lineType, 
      lifterBarsQuantity: _lifterBarsQuantity, 
      shellplatesThickness: _shellplatesThickness, 
      endplatesThickness: _endplatesThickness,
      totalChargeFill: _totalChargeFill, 
      ballChargeFill: _ballChargeFill, 
      totalChargeDensity: _totalChargeDensity, 
      ballChargeDensity: _ballChargeDensity, 
      ballTopSize_refillSize: _ballTopSize_refillSize,
      powerDrawModel_bond: _powerDrawModel_bond, 
      powerDrawModel_morrell: _powerDrawModel_morrell,
      solidsThroughput: _solidsThroughput, 
      solidsDensity: _solidsDensity, 
      bulkDensity: _bulkDensity, 
      liquidMediumThroughput: _liquidMediumThroughput, 
      liquidDensity: _liquidDensity, 
      totalSlurryThroughput: _totalSlurryThroughput,
      volumetricThroughput: _volumetricThroughput, 
      relativeDensity: _relativeDensity, 
      solidsContent_mm: _solidsContent_mm, 
      solidsContent_vv: _solidsContent_vv,
      f80FeedSize: _f80FeedSize, 
      p80ProductSize: _p80ProductSize, 
      workIndex_BallMill: _workIndex_BallMill, 
      workIndex_Crushing: _workIndex_Crushing, 
      millingCircuitArrangement: _millingCircuitArrangement, 
      pxxPassingsizecontrol: _pxxPassingsizecontrol, 
      processCondition: _processCondition,
      abrasionIndex: _abrasionIndex,
      throughputCapacity: _throughputCapacity, 
      specificEnergyRequired: _specificEnergyRequired, 
      powerRequired: _powerRequired,
      availablePowerUtilized: _availablePowerUtilized,
      formResult1: _formResult1, 
      formResult2: _formResult2
    }
    


  }


  UnversalFormChange(data) {

  }

  render() {
    return (

      <div>

        <div className="container">
          <h1 className="pageHeading">AG/SAG/Ball Mill Sizing</h1>
          <strong>Gross Power Draw and Specific Energy Calculator for Autogenous Grinding (AG), Semi-Autogenous Grinding (SAG) and Ball Mills</strong>

          <br />
        </div>

        <BackButton />

        <Form>
          <div className="container">

            <div className="row row_alt">
              <div className="col-8">

                <div className="row divHeading">
                  <div className="col-md">
                    <h4>Shell Sizing Parameters</h4>
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
                    <p className="inputLeft"><strong>Value </strong></p>
                  </div>
                </div>

                <div className="itemContent">
                  <Form.Group as={Row} controlId="millShellInsideDiameter_m">
                    <Form.Label column md={4}>
                      Mill Shell Inside Diameter:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="millShellInsideDiameter_m" value={this.state.millShellInsideDiameter_m} step="0.01" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>[m]</Form.Text>
                    </Col>
                    <Col md={4}>
                      <Form.Control type="number" name="millShellInsideDiameter_ft" value={this.state.millShellInsideDiameter_ft} step="1.0" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>
                        [ft]
                      </Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="millShellInsideLength_m">
                    <Form.Label column md={4}>
                      Mill Shell Inside Length:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="millShellInsideLength_m" value={this.state.millShellInsideLength_m} step="0.01" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>[m]</Form.Text>
                    </Col>
                    <Col md={4}>
                      <Form.Control type="number" name="millShellInsideLength_ft" value={this.state.millShellInsideLength_ft} step="1.0" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>
                        [ft]
                      </Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="shellHeadsConeAngle">
                    <Form.Label column md={4}>
                      Shell Heads Cone Angle:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="shellHeadsConeAngle" value={this.state.shellHeadsConeAngle} step="1.0" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>[degrees]</Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="effectiveGrindingDiameter">
                    <Form.Label column md={4}>
                      Effective Grinding Diameter:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="effectiveGrindingDiameter" value={this.state.effectiveGrindingDiameter} disabled />
                      <Form.Text id="helpText" muted>[m]</Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="effectiveGringingLength">
                    <Form.Label column md={4}>
                      Effective Gringing Length (EGL):
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="effectiveGringingLength" value={this.state.effectiveGringingLength} disabled />
                      <Form.Text id="helpText" muted>[m]</Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="operationalSpeedCritical">
                    <Form.Label column md={4}>
                      Operational Speed %Critical:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="operationalSpeedCritical" value={this.state.operationalSpeedPercCritical_perc} step="1.0" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>[%]</Form.Text>
                    </Col>
                    <Col md={4}>
                      <Form.Control type="number" name="operationalSpeedCritical" value={this.state.operationalSpeedPercCritical_rpm} step="0.1" onChange={this.handleMeterChange} />
                      <Form.Text id="helpText" muted>
                        [rpm]
                      </Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="speedCritcalMaxPowerDraw">
                    <Form.Label column md={4}>
                      Speed %Critical - Max Power Draw:
                    </Form.Label>
                    <Col md={4}>
                      <Form.Control type="number" name="speedCritcalMaxPowerDraw" value={this.state.speedCritcalMaxPowerDraw_perc} disabled />
                      <Form.Text id="helpText" muted>[%]</Form.Text>
                    </Col>
                    <Col md={4}>
                      <Form.Control type="number" name="speedCritcalMaxPowerDraw" value={this.state.speedCritcalMaxPowerDraw_rpm} disabled />
                      <Form.Text id="helpText" muted>
                        [rpm]
                      </Form.Text>
                    </Col>
                  </Form.Group>
                </div>
              </div>

              <div className="col-4">
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="row"></div>
                <img src="./img/Mill Diagram3.png" alt="Debate" width="100%" />
              </div>

            </div>
          </div>

          <br />
          <br />

          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h4>Liner System</h4>
              </div>
            </div>

            <div className="row justify-content itemHeading alignLeft">
              <div className="col-3 col-md-3 col-sm-3">
                <p><strong>Parameters</strong></p>
              </div>
              <div className="col-3 col-md-3">
                <p className="inputLeft"><strong>Variables</strong></p>
              </div>
            </div>

            <div className="itemContent">
              <Form.Group as={Row} controlId="dischargeType">
                <Form.Label column md={3}>
                  Discharge Type:
                </Form.Label>
                <Col md={3}>

                  <Form.Control as="select" value={this.state.dischargeType} onChange={this.handleMeterChange} name="dischargeType">
                    <option value="7.98">Overflow Discharge</option>
                    <option value="9.1">Grated Discharge</option>
                  </Form.Control>

                </Col>
              </Form.Group>
              {this.state.dischargeType === 7.98 &&
              <Form.Group as={Row} controlId="gratedChamberLength">
                <Form.Label column md={3}>
                  Grated Chamber Length:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.gratedChamberLength} step="5" name="gratedChamberLength" onChange={this.handleMeterChange}/>
                  <Form.Text id="helpText" muted>[mm]</Form.Text>
                </Col>
              </Form.Group>
              }

              <Form.Group as={Row} controlId="lineType">
                <Form.Label column md={3}>
                  Line Type:
                </Form.Label>
                <Col md={3}>

                  <Form.Control as="select" value={this.state.lineType} name="lineType" onChange={this.handleMeterChange}>
                    <option value="1.1">Steel Liners</option>
                    <option value="1">Rubber Liners</option>
                  </Form.Control>

                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="lifterBarsQuantity">
                <Form.Label column md={3}>
                  Lifter Bars Quantity:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.lifterBarsQuantity} name="lifterBarsQuantity" disabled/>
                  <Form.Text id="helpText" muted>[QTY]</Form.Text>
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="shellplatesThickness">
                <Form.Label column md={3}>
                  Shellplates Thickness:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" step="10" value={this.state.shellplatesThickness} name="shellplatesThickness" onChange={this.handleMeterChange}/>
                  <Form.Text id="helpText" muted>[mm]</Form.Text>
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="endplatesThickness">
                <Form.Label column md={3}>
                  Endplates Thickness:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" step="10" value={this.state.endplatesThickness} name="endplatesThickness" onChange={this.handleMeterChange}/>
                  <Form.Text id="helpText" muted>[mm]</Form.Text>
                </Col>
              </Form.Group>
            </div>
          </div>

          <br />

          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h4>Charge Fill</h4>
              </div>
            </div>

            <div className="row justify-content itemHeading">
              <div className="col-3 col-md-3">
                <p><strong>Parameters</strong></p>
              </div>
              <div className="col-3 col-md-3">
                <p className="inputLeft"><strong>Value</strong></p>
              </div>
              <div className="col-3 col-md-3">
                <p className="inputLeft"><strong>Units</strong></p>
              </div>
            </div>

            <div className="itemContent">
              <Form.Group as={Row} controlId="totalChargeFill">
                <Form.Label column md={3}>
                  Total Charge Fill:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.totalChargeFill} name="totalChargeFill" onChange={this.handleMeterChange}/>

                </Col>
                <Col md={3}>

                  <Form.Text id="helpText" muted>
                    [%]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="ballChargeFill">
                <Form.Label column md={3}>
                  Ball Charge Fill:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.ballChargeFill} onChange={this.handleMeterChange} name="ballChargeFill" min="0" max="80"/>

                </Col>
                <Col md={3}>

                  <Form.Text id="helpText" muted>
                    [%]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="totalChargeDensity">
                <Form.Label column md={3}>
                  Total Charge Density:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.totalChargeDensity} name="totalChargeDensity" disabled />
                </Col>
                <Col md={3}>
                  <Form.Text id="helpText" muted>
                    [t/m<sup>3</sup>]
                  </Form.Text>
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="ballChargeDensity">
                <Form.Label column md={3}>
                  Ball Charge Density:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" step="0.05" value={this.state.ballChargeDensity} onChange={this.handleMeterChange} name="ballChargeDensity" />
                </Col>
                <Col md={3}>
                  <Form.Text id="helpText" muted>
                    [t/m<sup>3</sup>]
                  </Form.Text>
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="ballTopSize_refillSize">
                <Form.Label column md={3}>
                  Ball Top Size / Re-fill Size:
                </Form.Label>
                <Col md={3}>
                  <Form.Control type="number" value={this.state.ballTopSize_refillSize} name="ballTopSize_refillSize" disabled/>
                </Col>
                <Col md={3}>
                  <Form.Text id="helpText" muted>
                    [mm]
                  </Form.Text>
                </Col>
              </Form.Group>
            </div>
          </div>

          <br />

          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h4>Mill Power Draw Available - Mechanical</h4>
              </div>
            </div>

            <div className="row justify-content-center itemHeading">
              <div className="col-6 col-md-4">
                <p><strong>Description</strong></p>
              </div>
              <div className="col-6 col-md-3">
                <p className="inputLeft"><strong>Value</strong></p>
              </div>
              <div className="col-6 col-md-3">
                <p className="inputLeft"><strong>Units</strong></p>
              </div>
            </div>

            <div className="itemContent">
              <Form.Group as={Row} controlId="powerDrawModel_bond">
                <Form.Label column md={4}>
                  Power Draw Model - Bond
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" name="powerDrawModel_bond" value={this.state.powerDrawModel_bond} disabled />
                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [KW]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="powerDrawModel_morrell">
                <Form.Label column md={4}>
                  Power Draw Model - Morrell
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" name="powerDrawModel_morrell" value={this.state.powerDrawModel_morrell} disabled/>
                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [KW]
                  </Form.Text>
                </Col>
              </Form.Group>
            </div>
          </div>

          <br />
          <hr />
          <br />

          <div className="container divMainHeading">
            <br />
            <h3>Metallurgical Power Requirements</h3>
            <h4>Process Data</h4>
          </div>


          <br />

          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h3>Mass Balance - Density Fractions</h3>
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
              <Form.Group as={Row} controlId="solidsThroughput">
                <Form.Label column md={2}>
                  Solids Throughput
                </Form.Label>
                <Col md={2}>
                  <Form.Control type="number" step="10" value={this.state.solidsThroughput} onChange={this.handleMeterChange} name="solidsThroughput" />
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
                  <Form.Control type="number"  step="0.01"  value={this.state.solidsDensity} onChange={this.handleMeterChange} name="solidsDensity"/>
                  <Form.Control type="number"  step="0.01"  value={this.state.bulkDensity} onChange={this.handleMeterChange} name="bulkDensity"/>
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

              <Form.Group as={Row} controlId="liquidMediumThroughput">
                <Form.Label column md={2}>
                  Liquid Medium Throughput
                </Form.Label>
                <Col md={2}>
                  <Form.Control type="number" value={this.state.liquidMediumThroughput} disabled name="liquidMediumThroughput"/>
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
                  <Form.Control type="number" step="0.01" value={this.state.liquidDensity} onChange={this.handleMeterChange} name="liquidDensity"/>
                </Col>
                <Col md={2}>
                  <Form.Text id="helpText" muted>
                    [t/m<sup>3</sup>]
                  </Form.Text>
                </Col>

              </Form.Group>

              <Form.Group as={Row} controlId="totalSlurryThroughput">
                <Form.Label column md={2}>
                  Total Slurry Throughput
                </Form.Label>
                <Col md={2}>
                  <Form.Control type="number"  value={this.state.totalSlurryThroughput} disabled name="totalSlurryThroughput"/>
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
                  <Form.Control type="number" value={this.state.volumetricThroughput} disabled name="volumetricThroughput"/>
                </Col>
                <Col md={2}>
                  <Form.Text id="helpText" muted>
                    [m<sup>3</sup>/h]
                  </Form.Text>
                </Col>

              </Form.Group>

              <Form.Group as={Row} controlId="relativeDensity">
                <Form.Label column md={2}>
                  Relative Density
                </Form.Label>
                <Col md={2}>
                  <Form.Control type="number" value={this.state.relativeDensity} disabled name="relativeDensity"/>
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
                  <Form.Control type="number" step="1" value={this.state.solidsContent_mm} onChange={this.handleMeterChange} name="solidsContent_mm"/>
                  <Form.Control type="number"  value={this.state.solidsContent_vv} disabled name="solidsContent_vv"/>
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
          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h4>Grinding Specifictions</h4>
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
              <Form.Group as={Row} controlId="f80FeedSize">
                <Form.Label column md={4}>
                  F<sub>80</sub> Feed Size
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" step="100" value={this.state.f80FeedSize} onChange={this.handleMeterChange} name="f80FeedSize"/>

                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [um]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="p80ProductSize">
                <Form.Label column md={4}>
                  P<sub>80</sub> Product Size
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" step="5" value={this.state.p80ProductSize} onChange={this.handleMeterChange} name="p80ProductSize"/>

                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [um]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="workIndex_BallMill">
                <Form.Label column md={4}>
                  Work Index (Ball Mill) - Wi<sub>BM</sub>
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" step="0.1" value={this.state.workIndex_BallMill} onChange={this.handleMeterChange} name="workIndex_BallMill"/>
                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [kWh/t]
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="workIndex_Crushing">
                <Form.Label column md={4}>
                  Work Index (Crushing) - Wi<sub>C</sub>
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" step="0.1" value={this.state.workIndex_Crushing} onChange={this.handleMeterChange} name="workIndex_Crushing"/>

                </Col>
                <Col md={4}>

                  <Form.Text id="helpText" muted>
                    [kWh/t]
                    Required when F<sub>80</sub> (feed size) is larger than transfer size
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="millingCircuitArrangement">
                <Form.Label column md={4}>
                  Milling Circuit Arrangement
                </Form.Label>
                <Col md={4}>

                  <Form.Control as="select" value={this.state.millingCircuitArrangement} onChange={this.handleMeterChange} name="millingCircuitArrangement">
                      <option value="1">Closed Circuit</option>
                      <option value="1.2">Open Circuit</option>
                  </Form.Control>

                </Col>
                <Col md={4}>

                </Col>
              </Form.Group>
              {this.state.millingCircuitArrangement !== 1 &&
                <Form.Group as={Row} controlId="pxxPassingsizecontrol">
                  <Form.Label column md={4}>
                    P<sub>xx</sub> Passing size control
                  </Form.Label>
                  <Col md={4}>
                    <Form.Control type="number" step="5" value={this.state.pxxPassingsizecontrol} onChange={this.handleMeterChange} name="pxxPassingsizecontrol"/>
                  </Col>
                  <Col md={4}>

                    <Form.Text id="helpText" muted>
                      [%]
                      Product size setpoint required in open circuit
                    </Form.Text>
                  </Col>
                </Form.Group>
              }
              <Form.Group as={Row} controlId="processCondition">
                <Form.Label column md={4}>
                  Process Condition
                </Form.Label>
                <Col md={4}>

                  <Form.Control as="select" value={this.state.processCondition} onChange={this.handleMeterChange} name="processCondition">
                      <option value="1.3">Dry Grinding</option>
                      <option value="1">Wet Grinding</option>
                  </Form.Control>

                </Col>
                <Col md={4}>

                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="ShellInsideLength">
                <Form.Label column md={4}>
                  Abrasion Index (Ai)
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" step="0.01" value={this.state.abrasionIndex} onChange={this.handleMeterChange} name="abrasionIndex"/>

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
                <h4>Power Required - Metallurgical</h4>
              </div>
            </div>

            <div className="row justify-content-center itemHeading">
              <div className="col-6 col-md-4">
                <p><strong>Description</strong></p>
              </div>
              <div className="col-6 col-md-4">
                <p className="inputLeft"><strong>Value</strong></p>
              </div>
              <div className="col-6 col-md-4">
                <p className="inputLeft"><strong>Units</strong></p>
              </div>
            </div>

            <div className="itemContent">

              <Form.Group as={Row} controlId="throughputCapacity">
                <Form.Label column md={4}>
                  Throughput Capacity
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" value={this.state.throughputCapacity} disabled name="throughputCapacity"/>
                </Col>

                <Col md={4}>
                  <Form.Text id="helpText" muted>
                    [t/h]
                  </Form.Text>
                </Col>

              </Form.Group>

              <Form.Group as={Row} controlId="specificEnergyRequired">
                <Form.Label column md={4}>
                  Specific Energy Required
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" value={this.state.specificEnergyRequired} disabled name="specificEnergyRequired"/>
                </Col>

                <Col md={4}>
                  <Form.Text id="helpText" muted>
                    [kWh/t]
                  </Form.Text>
                </Col>

              </Form.Group>

              <Form.Group as={Row} controlId="powerRequired">
                <Form.Label column md={4}>
                  Power Required
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" value={this.state.powerRequired} disabled name="powerRequired"/>
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
          <hr />
          <br />

          <div className="container">

            <div className="row divHeading">
              <div className="col-md">
                <h4>Mill Selection Result</h4>
              </div>
            </div>

            <div className="row justify-content-center itemHeading">
              <div className="col-6 col-md-4">
                <p><strong>Description</strong></p>
              </div>
              <div className="col-6 col-md-3">
                <p className="inputLeft"><strong>Value</strong></p>
              </div>
              <div className="col-6 col-md-3">
                <p className="inputLeft"><strong>Units</strong></p>
              </div>
            </div>

            <div className="itemContent">
              <Form.Group as={Row} controlId="availablePowerUtilized">
                <Form.Label column md={4}>
                  Available Power Utilized:
                </Form.Label>
                <Col md={4}>
                  <Form.Control type="number" value={this.state.availablePowerUtilized} disabled name="availablePowerUtilized"/>
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

          <h4>
            Power Draw at Pinion {this.state.formResult1} kW {">"} Power Required {this.state.formResult2} kW
          </h4>
          <h4>
            Sufficient Power available in selected Mill
          </h4>

          <br />

          <CSVLink className="backButtonStyle" data={this.csvString} separator={";"} filename="mill_results.csv">
                        SAVE RESULTS
          </CSVLink>

        </Form>

      </div>

    );
  }

}


export default Mill;