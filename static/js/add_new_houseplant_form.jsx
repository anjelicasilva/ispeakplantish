"use strict";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedLight: "low",
            selectedLatinName: "noNewHouseplant",
            listOfCommonHouseplants: [],
        };
    }

    componentDidMount() {
        fetch(`/api/common_houseplants`)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                // find a range method 
                for (let i=1; i<=103; i++) {
                    this.state.listOfCommonHouseplants.push(myJson[i]['latin_name']);
                    
                }
                console.log(this.state.listOfCommonHouseplants);

                
                    // listOfCommonHouseplants.push(plant);
                    // console.log(this.state.listOfCommonHouseplants)
                })

            
                // this.setState({listOfCommonHouseplants: listOfCommonHouseplants});
                
    };

            



        //     .then(data => data.json()).then(stuff => {
        //     console.log(stuff)
        //     this.setState({listOfCommonHouseplants: ['thing']})
        // })
    

    
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

    renderPlantOptions() {
        const plantOptions = [<option value="noNewHouseplant">Select latin name</option>,
        <option value="adiantumFragrans">Adiantum fragrans</option>,
        <option value="aechmeaBlueRain">Aechmea 'Blue Rain'</option>,
        <option value="aeschynanthusJaphrolepis">Aeschynanthus japhrolepis</option>]

        // loop over listOfAllPlants
        // make a option tag out of each one 
        // put them all in a list 
        // return that list

        return plantOptions
    }
    
    render() {
        // if (this.state.listOfCommonHouseplants.length === 0) {
        //     return (
        //         <div>
        //             Loading ...
        //         </div>
        //     )
        // }

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
                    {this.renderPlantOptions()}
                </select>
            </label>
            </div>   
            <div> 
            <label>
                Common Name:
                <input type="text" name="commonName"></input>
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






