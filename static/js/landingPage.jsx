class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }


    redirectSignUp = () => {
        this.props.setCurrentPage(3);
    }

    redirectLogin = () => {
        this.props.setCurrentPage(4);
    }


    render() {
    return (
    <div> 
        <div id="header" className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <h1>ISpeakPlantish</h1>
                        <p id="landing-page-description">A green thumb is not about luck, 
                        but about being observant and 
                        knowing how Mother Nature takes care of her houseplants!</p>
                        <button id="landing-page-signup" className="btn btn-lg btn-primary" onClick={this.redirectSignUp}>Sign Up</button>
                        <button id="landing-page-login" className="btn btn-lg btn-success" onClick={this.redirectLogin}>Login</button>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {/* <img src="static/img/journal.jpg" alt=""></img> */}
                    </div>
                </div>
            </div>
        </div>



        <div id="services" className="services">
            <div className="container">
                <h2>Join Today</h2>
                <p>
                    ISpeakPlantish is an indoor gardening notebook-style web application 
                    that offers tracker journal logs to grow, nurture, and care for your 
                    small-space greenery.
                </p>
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <i className="fas fa-book fa-lg" style={{color: "#80AD41"}} aria-hidden="true"></i>
                        <h4>Keep Track</h4>
                        <p>Search common houseplants you own and add it to your plant collection.</p>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <i className="far fa-comments fa-lg" style={{color: "#80AD41"}} aria-hidden="true"></i>
                        <h4>Reminders</h4>
                        <p>Text water and fertilizer reminders to yourself, no more forgetting to take care of your plants!</p>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <i className="fas fa-users fa-lg" style={{color: "#80AD41"}} aria-hidden="true"></i>
                        <h4>Community</h4>
                        <p>Join group chats to discuss plant diagnosis, trade cuttings, or give freebies!</p>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <i className="fab fa-pagelines fa-lg" style={{color: "#80AD41"}} aria-hidden="true"></i>
                        <h4>Discover</h4>
                        <p>Learn about hundreds of common houseplants in our Homepage's Plant of the Moment section! 
                        <br></br>CAUTION: Your plant collection may grow unexpectedly!</p>
                    </div>
                </div>







                <footer id="my-footer" className="text-center page-footer font-small cyan darken-3">
  <div className="container">
    <div className="row">
      <div className="col-md-12 py-5">
        <div className="mb-5 flex-center">
          <a href="mailto:anjelicacsilva@gmail.com" className="gplus-ic">
            <i style={{color: "#80AD41"}} className="fab fa-google fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>
          <a href="https://www.linkedin.com/in/anjelicasilva/" className="li-ic">
            <i style={{color: "#80AD41"}} className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>
          <a href="https://instagram.com/ispeakplantish" className="ins-ic">
            <i style={{color: "#80AD41"}} className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>
          <a href="https://github.com/anjelicasilva/ISpeakPlantish" className="git-ic">
            <i style={{color: "#80AD41"}} className="fab fa-github fa-lg white-text fa-2x"> </i>
          </a>
        </div>
      </div>
    </div>
  </div>



  <div style={{color: "#80AD41"}} className="footer-copyright text-center py-3">Made by Anjelica Silva 
    {/* <a href="https://ispeakplantish.com/"> ISpeakPlantish.com</a> */}
  </div>


</footer>







            </div>
        </div>

        

        {/* <div id="team" className="team">
            <div className="container">
                <div className="row">
                    <h2>Meet our developer</h2>
                    <p>Contact information below</p>
                    <div className="col-lg-3 col-md-3">
                    <img src="static/img/developer.png" id="developer-img"  alt=""></img>
                    <h4>Anjelica Silva</h4>
                    <b>Software Engineer</b>
                    <p>Hackbright Grad</p>
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-instagram"></i>
                    </div>
                </div>
            </div>
        </div> */}


    </div>
    );
    }
}