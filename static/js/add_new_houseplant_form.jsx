"use strict";
 
class Form extends React.Component {
   constructor(props) {
       super(props);
       this.state =  {
           selectedLight: "low",
           selectedCommonName: null,
           selectedLatinName: null,

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
 
 
   handleCommonNameChange = changeEvent => {
       const latinNameIndex = this.generateLatinName(changeEvent.target.value)
       this.setState({
            selectedCommonName: changeEvent.target.value,
            selectedLatinName: this.state.listOfCommonHouseplants[latinNameIndex]['latinName']
       });
       
   };
  
 
   handleFormSubmit = formSubmitEvent => {
       formSubmitEvent.preventDefault();
        // pull out all the relevant data from state
        // make sure it looks gucci 
        // then make a post request with that data from state to your server

        // let body = { name: this.state.name,
        //     light: this.state.selectedLight }

        // const response = await fetch(`/api/new_plant`, { 
        //     method: 'POST', 
        //     body: JSON.stringify(body), 
        //     headers: {'Content-Type': 'application/json'}
        // });

        console.log("You have submited the common name: ", this.state.selectedCommonName);
        console.log("You have submited the latin name: ", this.state.selectedLatinName);
        console.log("You have submitted the general light requirement: ", this.state.selectedLight);
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
                   onChange={this.handleCommonNameChange}
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
                   disabled={this.state.selectedCommonName === null}
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