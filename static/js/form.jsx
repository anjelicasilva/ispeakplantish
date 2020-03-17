class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            selectedLight: null,
            selectedCommonName: null,
            selectedLatinName: null,
            selectedCommonHouseplantId: null,
            listOfCommonHouseplants: [],
        };
        this.generateLatinName = this.generateLatinName.bind(this);
    }
 

    componentDidMount() {
        this.fetchCommonHouseplants();
    }


    async fetchCommonHouseplants() {
        // fetch list of information for all common houseplants
        const commonHouseplantsResponse = await fetch(`/api/common_houseplants`);
        const commonHouseplantsJson = await commonHouseplantsResponse.json();
        const commonHouseplants =[]
        for (const plantObject of Object.entries(commonHouseplantsJson)) {
            let plant = {
                commonHouseplantId: plantObject[1]['common_houseplant_id'],
                commonHouseplantPhotoUrl: plantObject[1]['common_houseplant_photo_url'],
                commonName: plantObject[1]['common_name'],
                latinName: plantObject[1]['latin_name'],
                generalDescription: plantObject[1]['general_description'],
                recommendedLightRequirements: plantObject[1]['light_requirements'],
            }
            commonHouseplants.push(plant);
        };
        this.setState({
            listOfCommonHouseplants: commonHouseplants,
        });
    }
 
 
    handleLightChange = changeEvent => {
        this.setState({
            selectedLight: changeEvent.target.value
        });
    };


    handleCommonNameSelection = (currentResult) => {
        const latinNameIndex = this.generateLatinName(currentResult)
        this.setState({
             selectedCommonName: currentResult,
             selectedLatinName: this.state.listOfCommonHouseplants[latinNameIndex]['latinName'],
             selectedLight: this.state.listOfCommonHouseplants[latinNameIndex]['recommendedLightRequirements'],
             selectedCommonHouseplantId: this.state.listOfCommonHouseplants[latinNameIndex]['commonHouseplantId'],
             selectedCommonHouseplantPhotoUrl: this.state.listOfCommonHouseplants[latinNameIndex]['commonHouseplantPhotoUrl'],
        });
        
    };
   

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
         let data = { 
             currentUserId: this.props.renderCurrentUserId(),
             addLatinName: this.state.selectedLatinName,
             addCommonName: this.state.selectedCommonName,
             addLightRequirement: this.state.selectedLight,
             addCommonHouseplantId: this.state.selectedCommonHouseplantId,
         }
 
         $.post('/api/add_new_houseplant_to_user_profile', data,() => { this.props.notify(`${this.state.selectedCommonName} added to your plant collection!`);
                                                                        this.props.setCurrentPage(2);
                                                                    })
        };
    

    renderPlantOptions() {
        const plantOptions = [];
 
        for (const plantObject of this.state.listOfCommonHouseplants) {
            plantOptions.push(plantObject['commonName'])
        };
 
        return plantOptions
    }
 
 
    generateLatinName(selectedCommonName) {
         for (const plantObject of this.state.listOfCommonHouseplants) {
             if (plantObject['commonName'] === selectedCommonName) {
                 let latinNameIndex = plantObject["commonHouseplantId"] - 1
                 return latinNameIndex
             };
         };
         return -1
    }

 
    render() {
        if (this.state.selectedCommonName !== null) {
        return (
            <div id="form-bg">
                <form> 
                    <div>
                        <div className="App">
                            <div className="App-Component">
                                <div className="App-Component">
                                    <label>
                                        <h4>Search for a common houseplant:</h4>
                                        <AutoCompleteText 
                                            items={this.renderPlantOptions()} 
                                            handleCommonNameSelection={this.handleCommonNameSelection}
                                            notify={this.props.notify}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-dialog text-center">
                            <div className="col-sm-8 main-section">
                                <div className="modal-content">
                                    <div className="signup-form-group" >
                                        <label>
                                            <img
                                                id="plant-photo" 
                                                name="PlantPhoto"
                                                value={this.selectedCommonHouseplantPhotoUrl} 
                                                src={this.state.selectedCommonHouseplantPhotoUrl}>
                                            </img>
                                        </label>
                                    </div> 
                                    <div className="latin-name"> 
                                        <label>
                                            Latin Name:
                                            <p
                                                id="latin-name" 
                                                name="LatinName" 
                                                value={this.selectedLatinName} 
                                                placeholder="Enter Latin Name">
                                                { this.state.selectedLatinName }
                                            </p>
                                        </label>
                                    </div>
                                    <div className="light-requirement">
                                        <label>
                                        Light Requirement:
                                            <p
                                                id="light-requirement" 
                                                name="lightRequirement" 
                                                value={this.selectedLight}> 
                                                { this.state.selectedLight }
                                            </p>
                                        </label>
                                    </div>    
                                    <div>    
                                        <button
                                            onClick={this.handleFormSubmit}
                                            disabled={this.state.selectedCommonName === null}
                                            className="form-btn"
                                        >
                                            Add New Houseplant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>);
        } else {
            return (
                <div id="form-bg">
                    <form>
                        <div>
                            <div className="App">
                                <div className="App-Component">
                                    <div className="App-Component">
                                        <label>
                                            <h4>Search for a common houseplant:</h4>
                                            <AutoCompleteText 
                                                items={this.renderPlantOptions()} 
                                                handleCommonNameSelection={this.handleCommonNameSelection}
                                                notify={this.props.notify}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
 } 















