import  React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="row">
                <div className="col">
                    <span><i className="fa fa-envelope-square"></i></span><a href="mailto:engineer@metengineer.com" className="mailLink">engineer@metengineer.com</a>
                </div>
                <div className="col">
                    <div className="copyNotice">
                        <p>Copyright &copy; MetEngineer | Designed by <a href="https://www.cyancircle.co.za" className="mailLink">Cyan Circle</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
  }
  
  export default Footer;
