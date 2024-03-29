class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        }
    }


    handleLoginSubmit = loginSubmitEvent => {
        loginSubmitEvent.preventDefault();
         let userLogin = { 
             loginEmail: this.state.email,
             loginPassword: this.state.password,
         }
         this.props.userLogIn(userLogin)
    };

    
    handleLoginInput = changeEvent => {
        this.setState({
            [changeEvent.target.name]: changeEvent.target.value
        });
    }


    render() {
        return (
            <div id="login-bg">
                <div className="modal-dialog text-center">
                    <div className="col-sm-8 main-section">
                        <div className="modal-content">
                            <div className="col-12 user-img">
                                <img src="static/img/plantgif2.gif"></img>
                            </div>
                            <form className="col-12">
                                <div className="form-group">
                                    <label>
                                        <input type="text" name="email" className="form-control" placeholder="Email@domain.com" onChange={this.handleLoginInput}/>
                                    </label>
                                    <label>
                                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleLoginInput}/>
                                    </label>
                                <button className="login-btn" onClick={this.handleLoginSubmit}> <i className="fas fa-sign-in-alt"></i>Login </button>
                                </div>
                            </form>
                            {/* <div className="col-12 forgot">
                                <a href="#">Forgot Password?</a>
                            </div> */}
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}