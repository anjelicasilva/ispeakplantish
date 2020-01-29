"use strict";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedLight: "low",
            selectedLatinName: "latin test"
        };
    }
    
    handleLightChange = changeEvent => {
        this.setState({
            selectedLight: changeEvent.target.value
        });
    };

    handleLatinChange = changeEvent => {
        this.setState({
            selectedLatinName: changeEvent.target.value
        });
    };
    
    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        console.log("You have submitted: ", this.state.selectedLight);
        console.log("You have submited: ", this.state.selectedLatinName);
    };
    
    render() {
        return (// 

        <form onSubmit={this.handleFormSubmit}>  
            <label>
                Latin Name:
                <select
                    value={this.selectedLatinName}
                    onChange={this.handleLatinChange}
                    className="latin-name"
                    id="latinName"
                >
                    <option value="noNewHouseplant">Select latin name</option>
                    <option value="adiantumFragrans">Adiantum fragrans</option>
                    <option value="aechmeaBlueRain">Aechmea 'Blue Rain'</option>
                    <option value="aeschynanthusJaphrolepis">Aeschynanthus japhrolepis</option>
                </select>
            </label>   
            <label>
                Common Name:
                <input type="text" name="commonName"></input>
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
                        checked={this.state.selectedLight==="low"}
                        onChange={this.handleLightChange}
                        className="light-requirement-input"
                    />
                    Low
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="lightRequirement"
                        value="medium"
                        checked={this.state.selectedLight==="medium"}
                        onChange={this.handleLightChange}
                        className="light-requirement-input"
                    />
                    Medium
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="lightRequirement"
                        value="high"
                        checked={this.state.selectedLight==="high"}
                        onChange={this.handleLightChange}
                        className="light-requirement-input"
                    />
                    High
                </label>
            </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={this.state.selectedLatinName === "noNewHouseplant"}
                >
                    Add Houseplant
                </button>
                {/* <input type="submit" value="Add Houseplant"></input> */}
            </form>);
    }
}

ReactDOM.render(
    <Form />, 
    document.getElementById("root")
);






