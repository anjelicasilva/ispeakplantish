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
         this.props.registerUser(newUser);
        };

    
    handleRegistrationInput = changeEvent => {
        this.setState({
            [changeEvent.target.name]: changeEvent.target.value
        });
    }


    render() {
        return (
            <div>
            <form> 
                <div>    
                <h3>Sign Up </h3>
                    Please fill out the information below
                <br></br>
                    First name:
                    <br></br>  
                    <input id="fname" type="text" name="fname" placeholder ="First" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Last name:  
                    <br></br>
                    <input id="lname" type="text" name="lname" placeholder ="Last" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Cellphone number: 
                    <br></br> 
                    <input id="phone" type="text" name="phone" placeholder ="Phone" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Email address:
                    <br></br>  
                    <input id="email" type="text" name="email" placeholder ="email@domain.com" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Password:
                    <br></br>  
                    <input id="password" type="password" name="password" placeholder ="Should be at least 7 characters" onChange={this.handleRegistrationInput}></input>
                <br></br>
                    Re-enter Password:
                    <br></br>  
                    <input id="reenter" type="password" name='reenter' placeholder ="Should be at least 7 characters" onChange={this.handleRegistrationInput}></input> 
                <br></br>
                <br></br>
                    Register Now! 
                <br></br>
                </div>
                <div>    
                    <button
                        onClick={this.handleRegistrationFormSubmit}
                    >
                        Sign Up
                    </button>
                </div>    
            </form>
            </div>
        );
    }
} 