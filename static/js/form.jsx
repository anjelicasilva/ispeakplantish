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
        
        // console.log('did this prop work?', this.props.renderCurrentUserId())

         let data = { 
             currentUserId: this.props.renderCurrentUserId(),
             addLatinName: this.state.selectedLatinName,
             addCommonName: this.state.selectedCommonName,
             addLightRequirement: this.state.selectedLight,
             addCommonHouseplantId: this.state.selectedCommonHouseplantId,
         }
 
         $.post('/api/add_new_houseplant_to_user_profile', data,() => { this.props.notify(`${this.state.selectedCommonName} added to your plant collection!`);
                                                                        this.props.setCurrentPage(3);
                                                                    })
        //  console.log("You have submited the common name: ", this.state.selectedCommonName);
        //  console.log("You have submited the latin name: ", this.state.selectedLatinName);
        //  console.log("You have submitted the general light requirement: ", this.state.selectedLight);
        //  console.log("Common Houseplant Id:", this.state.selectedCommonHouseplantId)
        //  console.log("user log in id:", data['currentUserId'])
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
                <div>
                    <label>
                        <img
                            id="PlantPhoto" 
                            name="PlantPhoto"
                            value={this.selectedCommonHouseplantPhotoUrl} 
                            src={this.state.selectedCommonHouseplantPhotoUrl}
                        >
                        </img>
                    </label>
                </div> 
                <div> 
                    <label>
                        Latin Name:
                        <p
                            id="LatinName" 
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
                            id="lightRequirement" 
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
                    >
                        Add New Houseplant
                    </button>
                </div>
            </div>    
            </form>);
        } else {
            return (
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
                </form>);
        }
    }
 } 