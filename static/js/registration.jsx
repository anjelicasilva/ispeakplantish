class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: null,
            lname: null,
            phone: null,
            email: null,
            password: null,
            reenter: null,
        }
    }


    handleRegistrationFormSubmit = registrationFormSubmitEvent => {
        registrationFormSubmitEvent.preventDefault();
        
         let newUser = { 
             addFirstName: this.state.fname,
             addLastName: this.state.lname,
             addPhone: this.state.phone,
             addEmail: this.state.email,
             addPassword: this.state.password,
             addReEnter: this.state.reenter,
         }
         console.log(this.state)
 
        $.post('/register', newUser,() => {console.log(this.state.fname)})
        };

    
    handleRegistrationInput = changeEvent => {
        this.setState({
            [changeEvent.target.name]: changeEvent.target.value
        });
    }


    render() {
        return (
            <div>
            <form onSubmit={this.handleRegistrationFormSubmit}> 
                <div>    
                <h3>Register Here </h3>
                    Please fill out the information below
                <br></br>
                    First name:  <input id="fname" type="text" name="fname" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Last name:  <input id="lname" type="text" name="lname" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Cellphone number:  <input id="phone" type="text" name="phone" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Email address:  <input id="email" type="text" name="email" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Password:  <input id="password" type="password" name="password" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Re-enter Password:  <input id="reenter" type="password" name='reenter' onChange={this.handleRegistrationInput}></input> 
                <br></br>
                <br></br>
                    Register Now! 
                <br></br>
                </div>
                <div>    
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Register
                    </button>
                </div>    
            </form>
            </div>
        );
    }
} 