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
            <div>
              <h2>Login Here</h2>
              <form>
              <label>
                  Email:
                  <input type="text" name="email" onChange={this.handleLoginInput}/>
              </label>
              <label>
                  Password:
                  <input type="password" name="password" onChange={this.handleLoginInput}/>
              </label>
              <button onClick={this.handleLoginSubmit}> Login </button>
              </form>
            </div>
          );
          }
        }








