"use strict";

class PlantInfo extends React.Component {
    render() {
    return (
      <div> Information about your plant </div>
    );
    }
}


class PlantCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // refactor after creating user sign up page
            userId: 1,
            // list of userplant objects
            usersPlantCollection: [],
            // list of common houseplants objects
            listOfCommonHouseplants: [],
            // view plant info
            currentPlantPage: null, 
            pages: [<PlantInfo />,] 

        };
    }

    async componentDidMount() {
        // fetch list of plants the user owns
        const usersPlantCollectionResponse = await fetch('/api/houseplants');
        const usersPlantCollectionJson = await usersPlantCollectionResponse.json();

        for (const usersPlantObject of Object.entries(usersPlantCollectionJson)) {
            if (this.state.userId === usersPlantObject[1]['user_id']) {
                let usersPlant = {
                    commonHouseplantId: usersPlantObject[1]['common_houseplant_id'],
                    userHouseplantId: usersPlantObject[1]['user_houseplant_id'],
                    userId: usersPlantObject[1]['user_id'],
                }
                this.state.usersPlantCollection.push(usersPlant);
            }
        };
        // fetch list of information for all common houseplants
        const commonHouseplantsResponse = await fetch(`/api/common_houseplants`);
        const commonHouseplantsJson = await commonHouseplantsResponse.json();

        for (const plantObject of Object.entries(commonHouseplantsJson)) {

            let plant = {
                commonHouseplantId: plantObject[1]['common_houseplant_id'],
                commonHouseplantPhotoUrl: plantObject[1]['common_houseplant_photo_url'],
                commonName: plantObject[1]['common_name'],
                latinName: plantObject[1]['latin_name'],
                generalDescription: plantObject[1]['general_description'],
                recommendedLightRequirements: plantObject[1]['light_requirements'],
            }
            this.state.listOfCommonHouseplants.push(plant);
        };

        this.setState({
            usersPlantCollection: this.state.usersPlantCollection,
            listOfCommonHouseplants: this.state.listOfCommonHouseplants
        });
    }


    renderUsersPlantCollection() {
        const listOfUsersPlants = [];
        for (const usersPlant of this.state.usersPlantCollection) {
        listOfUsersPlants.push(
            <li>
                <button onClick={() => 
                    this.setState({currentPlantPage: 0})}>
                {this.state.listOfCommonHouseplants[(usersPlant['commonHouseplantId'])-1]['commonName']}
                </button>
            </li>
        )
    };
        return listOfUsersPlants
    }


    render() {
        return (
            <div>
                <h3>My Plant Collection:</h3>
                <div>
                    <ol>
                        { this.renderUsersPlantCollection() }
                    </ol>
                </div>
                <div>
                    <h5 onClick={() => 
                        <PlantInfo />}>View your plants log history
                    </h5> 
                </div>
                <div>
                { this.state.pages[this.state.currentPlantPage] }
                </div>
            </div>
        )
    }
}


class HomePage extends React.Component {
    render() {
    return (
      <div> Welcome to the ISpeakPlantish homepage </div>
    );
    }
} 


class AboutPage extends React.Component {
    render() {
    return (
      <div> About Us </div>
    );
    }
}


class AddEntries extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        newJournalEntry: null,
        waterUpdateInput: false,
        fertilizerUpdateInput: false,
      }
      this.handleEntryInput = this.handleEntryInput.bind(this)
    }
  
  
    handleEntryInput = changeEvent => {
      this.setState({
        [changeEvent.target.name]: changeEvent.target.value
      });
    }
  
  
    handleEntryFormSubmit = formSubmitEvent => {
      formSubmitEvent.preventDefault();
  
      let newEntryData = { 
        addJournalEntryText: this.state.newJournalEntry,
        addWaterUpdate: this.state.waterUpdateInput,
        addFertilizerUpdate: this.state.fertilizerUpdateInput,
    }
  
      $.post('/add_new_journal_entry_to_user_profile', newEntryData, (response) => console.log('Add journal entry information:', response))
  
        console.log("You have submited the journal entry of: ", this.state.newJournalEntry);
        console.log("You have submited the water update of: ", this.state.waterUpdateInput);
        console.log("You have submited the fertilizer update of: ", this.state.fertilizerUpdateInput);
  };
  
    render() {
      return(
        <form onSubmit={this.handleEntryFormSubmit}>     
          <div className="new-journal-entry"> 
            <label>
            Journal Entry:
            <input type="text" name="newJournalEntry" placeholder="Write an entry" onChange={this.handleEntryInput}></input>
            </label>
          </div> 
          <div className="water-update">
            <label>
            Watered Today?
            </label>
            <label>
              <input 
                  type="radio" 
                  name="waterUpdateInput"
                  value="true"
                  checked={this.state.waterUpdateInput==="true"}
                  onChange={this.handleEntryInput}
                  className="waterUpdateInput"
              />
              Yes
            </label>
            <label>
              <input 
                  type="radio" 
                  name="waterUpdateInput"
                  value="false"
                  checked={this.state.waterUpdateInput==="false"}
                  onChange={this.handleEntryInput}
                  className="waterUpdateInput"
              />
              No
            </label>           
          </div>
          <div className="fertilizer-update">
            <label>
            Fertilized Today?
            </label>
            <label>
              <input 
                  type="radio" 
                  name="fertilizerUpdateInput"
                  value="true"
                  checked={this.state.fertilizerUpdateInput==="true"}
                  onChange={this.handleEntryInput}
                  className="fertilizerUpdateInput"
              />
              Yes
            </label>
            <label>
              <input 
                  type="radio" 
                  name="fertilizerUpdateInput"
                  value="false"
                  checked={this.state.fertilizerUpdateInput==="false"}
                  onChange={this.handleEntryInput}
                  className="fertilizerUpdateInput"
              />
              No
            </label>           
          </div>
          <div>     
            <button
            type="submit"
            className="btn btn-primary"
            disabled={this.state.newJournalEntry === null}>
            Add New Entry
            </button>
          </div>     
        </form>);
    }
  }


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

   async componentDidMount() {
       const response = await fetch(`/api/common_houseplants`);
       const myJson = await response.json();
       
       for (const plantObject of Object.entries(myJson)) {
           let plant = {
               commonHouseplantId: plantObject[1]['common_houseplant_id'],
               commonHouseplantPhotoUrl: plantObject[1]['common_houseplant_photo_url'],
               commonName: plantObject[1]['common_name'],
               latinName: plantObject[1]['latin_name'],
               generalDescription: plantObject[1]['general_description'],
               recommendedLightRequirements: plantObject[1]['light_requirements'],
            }
            this.state.listOfCommonHouseplants.push(plant);
        };
        
        this.setState({
            listOfCommonHouseplants: this.state.listOfCommonHouseplants
        });
}


   handleLightChange = changeEvent => {
       this.setState({
           selectedLight: changeEvent.target.value
       });
   };
 
 
   handleInput = changeEvent => {
       const latinNameIndex = this.generateLatinName(changeEvent.target.value)
       this.setState({
            selectedCommonName: changeEvent.target.value,
            selectedLatinName: this.state.listOfCommonHouseplants[latinNameIndex]['latinName'],
            selectedLight: this.state.listOfCommonHouseplants[latinNameIndex]['recommendedLightRequirements'],
            selectedCommonHouseplantId: this.state.listOfCommonHouseplants[latinNameIndex]['commonHouseplantId']
       });
       
   };
   
  
   handleFormSubmit = formSubmitEvent => {
       formSubmitEvent.preventDefault();

        let data = { 
            addLatinName: this.state.selectedLatinName,
            addCommonName: this.state.selectedCommonName,
            addLightRequirement: this.state.selectedLight,
            addCommonHouseplantId: this.state.selectedCommonHouseplantId,
        }

        $.post('/add_new_houseplant_to_user_profile', data, (response) => console.log('Add houseplant information:', response))

        console.log("You have submited the common name: ", this.state.selectedCommonName);
        console.log("You have submited the latin name: ", this.state.selectedLatinName);
        console.log("You have submitted the general light requirement: ", this.state.selectedLight);
        console.log("Common Houseplant Id:", this.state.selectedCommonHouseplantId)
   };
 
  
   renderPlantOptions() {
       const plantOptions = [<option value="noNewHouseplant">Select Common Name</option>];
 
       for (const plantObject of this.state.listOfCommonHouseplants) {
           plantOptions.push(<option value={plantObject['commonName']} key={plantObject['commonHouseplantId']}>{plantObject['commonName']}</option>)
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
       return (
       <form onSubmit={this.handleFormSubmit}> 
           <div>
           <label>
               Common Name:
               <select
                   value={this.selectedCommonName}
                   onChange={this.handleInput}
                   className="common-name"
                   id="CommonName"
               >
                   { this.renderPlantOptions() }
               </select>
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
                   type="submit"
                   className="btn btn-primary"
                   disabled={this.state.selectedCommonName === null}
               >
                   Add New Houseplant
               </button>
           </div>    
           </form>);
   }
}


class App extends React.Component {
    constructor() {
        super();

        this.state = { 
            currentPage: 0, 
            pages: [<HomePage />, <AboutPage />, <Form />, <AddEntries />, <PlantCollection />,] 
        }; 
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={() => 
                    this.setState({currentPage: 0})}>Homepage
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 1})}>ISpeakPlantish
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 2})}>Add a plant
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 3})}>Add a journal entry
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 4})}>View your plant collection
                    </button> 
                </div>
                <div>
                { this.state.pages[this.state.currentPage] }
                </div>
            </div>
            
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
 );