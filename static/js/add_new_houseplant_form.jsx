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
 
   async componentDidMount() {
       const response = await fetch(`/api/common_houseplants`);
       const myJson = await response.json();
 
       // console.log('common name', myJson.items());
 
       // for (const commonname of (myJson.common_name)) {
       //     console.log('common name', commonname);
       // };
 
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
       const plantOptions = [<option value="noNewHouseplant">Select latin name</option>];
 
       for (const plant of this.state.listOfCommonHouseplants) {
           plantOptions.push(<option value={plant}>{plant}</option>)
       }
       // console.log(plantOptions)
      
       return plantOptions
   }
 
   render() {
 
       // if (this.state.listOfPlantOptions.length === 1) {
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
                   { this.renderPlantOptions() }
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

