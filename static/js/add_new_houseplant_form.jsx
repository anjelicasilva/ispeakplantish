"use strict";
 
class Form extends React.Component {
   constructor(props) {
       super(props);
       this.state =  {
           selectedLight: "low",
           selectedLatinName: "noNewHouseplant",
           selectedCommonName: "noNewHouseplant",
           listOfCommonHouseplants: [],
       };
   }
 
   async componentDidMount() {
       const response = await fetch(`/api/common_houseplants`);
       const myJson = await response.json();


    //    This is how to access common name!
    //    console.log('LLOOOOOOKKKK')
    //    console.log('myJson entries:', Object.entries(myJson)["Adiantum fragrans"][1]['common_name']);
 
       for (const plant of Object.keys(myJson)) {
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
 
 
   handleLatinNameChange = changeEvent => {
       this.setState({
           selectedLatinName: changeEvent.target.value
       });
   };


   handleCommonNameChange = changeEvent => {
    this.setState({
        selectedCommonName: changeEvent.target.value
    });
};
  
 
   handleFormSubmit = formSubmitEvent => {
       formSubmitEvent.preventDefault();
 
       console.log("You have submitted: ", this.state.selectedLight);
       console.log("You have submited: ", this.state.selectedLatinName);
       console.log("You have submited: ", this.state.selectedCommonName);
   };
 
  
   renderPlantOptions() {
       const plantOptions = [<option value="noNewHouseplant">Select latin name</option>];
 
       for (const plant of this.state.listOfCommonHouseplants) {
           plantOptions.push(<option value={plant}>{plant}</option>)
       };

       return plantOptions
   }
 
   render() {
       return (
       <form onSubmit={this.handleFormSubmit}> 
           <div>
           <label>
               Latin Name:
               <select
                   value={this.selectedLatinName}
                   onChange={this.handleLatinNameChange}
                   className="latin-name"
                   id="latinName"
               >
                   { this.renderPlantOptions() }
               </select>
           </label>
           </div>  
           <div>
           <label>
               Common Name:
               <input 
                    id="commonName" 
                    type="text" 
                    name="commonName" 
                    value={this.selectedCommonName} 
                    onChange={this.handleCommonNameChange}
                    placeholder="Enter Common Name">    
                </input>
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