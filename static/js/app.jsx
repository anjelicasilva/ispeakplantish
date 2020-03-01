class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentUserId: null,
            firstName: null,
            lastName: null,

            notificationText: null,
            currentPage: 0, 
            pages: [<HomePage />, 
                    <AboutPage />, 
                    <Form notify={this.notify}
                          setCurrentPage={this.setCurrentPage} />, 
                    <PlantCollection notify={this.notify} />,
                    <Register registerUser={this.registerUser} />,
                    <Login userLogIn={this.userLogIn} />,
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
        // console.log('check',type)
        this.setState({ currentUserId: newUserDataResponse.current_user_id,
                        firstName: newUserDataResponse.first_name,
                        lastName: newUserDataResponse.last_name,
                    }, () => {this.notify(`${this.state.firstName}, thank you for registering with ISpeakPlantish`)});
        this.checkUserLogIn();
        }
    });
    }



    userLogIn = (userLoginData) => {
    $.post('/api/login', userLoginData, (userLoginDataResponse) => {
        let type = typeof(userLoginDataResponse);
        // console.log('check',type)
        if (type == 'string') {
        this.notify(userLoginDataResponse);
        } else {
        this.setState({ currentUserId: userLoginDataResponse.current_user_id,
                        firstName: userLoginDataResponse.first_name,
                        lastName: userLoginDataResponse.last_name,
                    }, () => {this.notify(`Welcome ${this.state.firstName}`)});
        this.checkUserLogIn();
        }
    });
    }

    userLogOut = () => {
    $.get('/api/logout', () => {
        this.setState(
            {currentUserId: null,
            currentPage: 0,}, () => {this.notify(`Goodbye ${this.state.firstName}`)});
    });
    }


    checkUserLogIn = () => {
        $.get('/api/profile', (currentUserResponse) => {
            if (currentUserResponse.is_user_logged_in == 'yes') {
            const userId = currentUserResponse.current_user_id;
            const firstName = currentUserResponse.first_name;
            this.setState({ currentUserId: currentUserResponse.current_user_id,
                            firstName: currentUserResponse.first_name,
                            lastName: currentUserResponse.last_name,
                            currentPage: 3,
                            });
            } else {
            this.setState({
                            currentUserId: null,
                        });
            }
        });
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



      
    // notify = (notificationText) => {
    //     this.setState ({
    //         notificationText: notificationText
    //     });
    //     Toastify({
    //         text: this.state.notificationText,
    //         duration: 3000,
    //         // destination: "<PlantCollection/>",
    //         newWindow: true,
    //         close: true,
    //         gravity: "top", // `top` or `bottom`
    //         position: 'right', // `left`, `center` or `right`
    //         backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    //         stopOnFocus: true, // Prevents dismissing of toast on hover
    //         // onClick: function(){} // Callback after click
    //       }).showToast();
    // }


    render() {
        const userLoggedIn = this.state.currentUserId;
        if (userLoggedIn) {
            return (
                <div>
                     <div>
                        Happy planting, {this.state.firstName}
                    </div>
                    <div>
                        <button onClick={() => 
                        this.setState({currentPage: 0})}>Homepage
                        </button> 
                        <button onClick={() => 
                        this.setState({currentPage: 1})}>About
                        </button> 
                        <button onClick={() => 
                        this.setState({currentPage: 2})}>Add Plant
                        </button> 
                        <button onClick={() => 
                        this.setState({currentPage: 3})}>View Plant Collection
                        </button>
                        <button onClick={this.userLogOut}> Logout </button>
                    </div>
                    <div>
                    { this.state.pages[this.state.currentPage] }
                    </div>
                </div>);
        } else {
            return (
                <div>
                <div>
                    <button onClick={() => 
                    this.setState({currentPage: 0})}>Homepage
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 1})}>About
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 4})}>Register
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 5})}>Login
                    </button> 
                </div>
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