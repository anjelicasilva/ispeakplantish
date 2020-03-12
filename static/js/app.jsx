class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentUserId: null,
            firstName: null,
            lastName: null,

            notificationText: null,
            currentPage: 5, 
            pages: [<HomePage />, 
                    <Form notify={this.notify}
                          setCurrentPage={this.setCurrentPage}
                          renderCurrentUserId={this.renderCurrentUserId}
                           />, 
                    <PlantCollection notify={this.notify} 
                                     renderCurrentUserId={this.renderCurrentUserId}/>,
                    <Register registerUser={this.registerUser} />,
                    <Login userLogIn={this.userLogIn} />,
                    <LandingPage setCurrentPage={this.setCurrentPage}/>,
                    ] 
        }; 
    }

    componentDidMount() {
        this.checkUserLogIn()  
      }

    setCurrentPage = (page) => {
        this.setState({
            currentPage: page,
        })
    }

    registerUser = (newUserData) => {
    $.post('/api/register', newUserData, (newUserDataResponse) => {
        let type = typeof(newUserDataResponse);
        if (type == 'string') {
        this.notify(newUserDataResponse);
        } else {
        
        this.setState({ currentUserId: newUserDataResponse.current_user_id,
                        firstName: newUserDataResponse.first_name,
                        lastName: newUserDataResponse.last_name,
                        currentPage: 1,
                    }, () => {this.notify(`${this.state.firstName}, thank you for registering with ISpeakPlantish`)});
        this.checkUserLogIn();
        }
    });
    }

    userLogIn = (userLoginData) => {
    $.post('/api/login', userLoginData, (userLoginDataResponse) => {
        let type = typeof(userLoginDataResponse);
       
        if (type == 'string') {
        this.notify(userLoginDataResponse);
        } else {
        this.setState({ currentUserId: userLoginDataResponse.current_user_id,
                        firstName: userLoginDataResponse.first_name,
                        lastName: userLoginDataResponse.last_name,
                        currentPage: 2,
                    }, () => {this.notify(`Welcome ${this.state.firstName}`)});
        this.checkUserLogIn();
        }
    });
    }

    userLogOut = () => {
    $.get('/api/logout', () => {
        this.setState(
            {currentUserId: null,
            currentPage: 5,}, () => {this.notify(`Goodbye ${this.state.firstName}`)});
    });
    }

    checkUserLogIn = () => {
        $.get('/api/profile', (currentUserResponse) => {
            if (currentUserResponse.is_user_logged_in == 'yes') {
            // const userId = currentUserResponse.current_user_id;
            // const firstName = currentUserResponse.first_name;
                this.setState({ currentUserId: currentUserResponse.current_user_id,
                                firstName: currentUserResponse.first_name,
                                lastName: currentUserResponse.last_name,
                                
                                });
            } else {
            this.setState({
                            currentUserId: null,
                        });
            }
        });
    }

    renderCurrentUserId = () => {
        return this.state.currentUserId
    }

    renderCurrentUserFirstName = () => {
        return this.state.firstName
    }
    
    notify = (notificationText) => {
        this.setState (
            {notificationText: notificationText},
            () => (Toastify({
                text: this.state.notificationText,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: 'right',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                stopOnFocus: true, 
              }).showToast())
        ); 
    }

    
    redirectChatForum = () => {
        window.location.href="/forum";
    }
    

    render() {
        const userLoggedIn = this.state.currentUserId;
        if (userLoggedIn) {
            return (
            <div> 
                <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <a className="navbar-brand" 
                            onClick={() => 
                                this.setState({currentPage: 5})}>
                                    <img id="navbar-img" src="/static/logos/plant-original.png" className="d-inline-block align-top" alt=""/>
                                     ISpeakPlantish</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                        <a className="nav-link" 
                            onClick={() => 
                                this.setState({currentPage: 0})}>Homepage <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" 
                            onClick={() => 
                                this.setState({currentPage: 1})}>Add Plant</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"
                            onClick={() => 
                                this.setState({currentPage: 2})}>View Plant Collection</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"
                            onClick={this.redirectChatForum}>Chat</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"
                            onClick={this.userLogOut}>Logout</a>
                        </li>
                    </ul>
                    </div>
                </nav>
                {/* <div>
                    Happy planting, {this.state.firstName}
                </div> */}
                <div>
                    { this.state.pages[this.state.currentPage] }
                </div>
                </div>
            </div>);
        } else {
            return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <a className="navbar-brand" 
                            onClick={() => 
                                this.setState({currentPage: 5})}>
                                    <img id="navbar-img" src="/static/logos/plant-original.png" className="d-inline-block align-top" alt=""/>
                                     ISpeakPlantish</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item active">
                        <a className="nav-link" 
                            onClick={() => 
                                this.setState({currentPage: 0})}>Homepage <span className="sr-only">(current)</span></a>
                        </li> */}
                        <li className="nav-item">
                        <a className="nav-link" 
                            onClick={() => 
                                this.setState({currentPage: 3})}>Signup</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"
                            onClick={() => 
                                this.setState({currentPage: 4})}>Login</a>
                        </li>
                    </ul>
                    </div>
                </nav>
                <div>
                    { this.state.pages[this.state.currentPage] }
                </div>
            </div>

            );
        }
    }
}

 
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );

