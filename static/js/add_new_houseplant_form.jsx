"use strict";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedLight: "low",
            selectedLatinName: "noNewHouseplant",
            listOfCommonHouseplants: [],
            listOfPlantOptions: [<option value="noNewHouseplant">Select latin name</option>,]
        };
    }

    async componentDidMount() {
        const response = await fetch(`/api/common_houseplants`);
        const myJson = await response.json()

        for (const plant of Object.keys(myJson)) {
            this.state.listOfCommonHouseplants.push(plant); 
        }
        console.log('loooooook', this.state.listOfCommonHouseplants)
    }

// #############################################################################################################
    // componentDidMount() {
    //     fetch(`/api/common_houseplants`)
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((myJson) => {
    //             for (const plant of Object.keys(myJson)) {
    //                 this.state.listOfCommonHouseplants.push(plant); 
    //             }
    //             // return this.state.listOfCommonHouseplants
    //         }) 

    //         .then((data) => {
    //             // console.log('LOOK AT DATA:', data)
    //             for (const plantLatinName of data) {
    //                 this.state.listOfPlantOptions.push(`<option value="${plantLatinName.toLowerCase()}">${plantLatinName}</option>,`)
    //             }
    //             // console.log('loooooook', this.state.listOfPlantOptions)
    //             this.setState({
    //                 listOfPlantOptions : this.state.listOfPlantOptions
    //             })
    //         }) 
    //     }; 

    
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.listOfPlantOptions !== this.state.listOfPlantOptions) {
    //         console.log('plant options state has changed.')
    //     }
    // }
    
    // ############################################################################################################




    
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

        // RESEARCH this.componentDidUpdate

        // loop over listOfAllPlants
        // make a option tag out of each one 
        // put them all in a list 
        // return that list

    render() {

        if (this.state.listOfPlantOptions.length === 1) {
            return (
                <div>
                    Loading ...
                </div>
            )
        }

        return (
        <form onSubmit={this.handleFormSubmit}>  
            <div>
            <label>
                Latin Name:
                <select
                    value={this.selectedLatinName}
                    onChange={this.handleLatinChange}
                    className="latin-name"
                    id="latinName"
                >
                    [<option value="test1">test1</option>,
                    <option value="test2">test2</option>,]
                    {/* {this.renderPlantOptions()} */}
                    {/* {console.log(this.state.listOfPlantOptions)} */}
                    {/* {console.log('loooooook', this.state.listOfPlantOptions)} */}
                    
                    
                </select>
            </label>
            </div>   
            <div> 
            <label>
                Common Name:
                <input id="commonName" type="text" name="commonName"></input>
            </label>
            </div> 
            <div className="light-requirement">
                <label>
                    Light Requirement:
                </label>
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
            <div>     
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={this.state.selectedLatinName === "noNewHouseplant"}
                >
                    Add Houseplant
                </button>
            </div>     
            </form>);
            
    }
}
    
ReactDOM.render(
    <Form />,
    document.getElementById("root")
);






