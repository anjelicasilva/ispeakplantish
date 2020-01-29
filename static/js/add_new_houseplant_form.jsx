"use strict";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedOption: "low"
        };
    }
    
    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        console.log("You have submitted: ", this.state.selectedOption);
    };
    
    render() {
        return (// 

        <form onSubmit={this.handleFormSubmit}>
            <label>
                Latin Name:
                <input type="text" name="latinName"></input>
            </label>
            <label>
                Common Name:
                <input type="text" name="commonName"></input>
            </label>
            <label>
                Notes:
                <input type="text" name="notes"></input>
            </label>
            
            <label>
                Light Requirement:
            </label>
            
            <div className="light-requirement">
                <label>
                    <input 
                        type="radio" 
                        name="lightRequirement"
                        value="low"
                        checked={this.state.selectedOption==="low"}
                        onChange={this.handleOptionChange}
                        className="light-requirement-input"
                    />
                    Low
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="lightRequirement"
                        value="medium"
                        checked={this.state.selectedOption==="medium"}
                        onChange={this.handleOptionChange}
                        className="light-requirement-input"
                    />
                    Medium
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="lightRequirement"
                        value="high"
                        checked={this.state.selectedOption==="high"}
                        onChange={this.handleOptionChange}
                        className="light-requirement-input"
                    />
                    High
                </label>
            </div>
            
                <input type="submit" value="Add Houseplant"></input>
            </form>);
    }
}

ReactDOM.render(
    <Form />, 
    document.getElementById("root")
);






