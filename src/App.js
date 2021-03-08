import React from 'react';
import './App.css';

import Header from './Components/Main/Header';
import Intro from './Components/Main/Intro';
import Footer from './Components/Main/Footer'

import Section1 from './Components/Main/NavSections/Sections/Section1';
import Section2 from './Components/Main/NavSections/Sections/Section2';
import Section3 from './Components/Main/NavSections/Sections/Section3';

import Mill from './Components/Calculators/Views/Mill';
import Hydrocyclone from './Components/Calculators/Views/Hydrocyclone';
import Thickener from './Components/Calculators/Views/Thickener';
import MassBalance from './Components/Calculators/Views/MassBalance/MassBalance';
import VibratingFeeder from './Components/Calculators/Views/VibratingFeeder';
import ScreeningArea from './Components/Calculators/Views/ScreeningArea';
import RosinRammler from './Components/Calculators/Views/RosinRammler';
import TrommelScreen from './Components/Calculators/Views/TrommelScreen';
import BeltConveyor from './Components/Calculators/Views/BeltConveyor';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="homeLogo">

      <Header/>

      <div className="container mainMenuTiles">

        <Router>
          <Switch>

            <Route exact path="/">
              <Section1/>
              
              <Section2/>
              
              <Section3/>
              
              <Intro/>
            </Route>

            
            <Route path="/mill">
              <Mill/>
            </Route>

            <Route path="/hydro">
              <Hydrocyclone/>
            </Route>

            <Route path="/thick">
              <Thickener/>
            </Route>

            <Route path="/mass-bal">
              <MassBalance/>
            </Route>

            <Route path="/feeder">
              <VibratingFeeder/>
            </Route>

            <Route path="/trommel">
              <TrommelScreen/>
            </Route>

            <Route path="/belt-conv">
              <BeltConveyor/>
            </Route>

            <Route path="/screening">
              <ScreeningArea/>
            </Route>

            <Route path="/rosin">
              <RosinRammler/>
            </Route>



          </Switch>
        </Router>

      </div>

      
      <Footer/>

    </div>
  );
}

export default App;
