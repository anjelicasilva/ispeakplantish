"use strict";
 
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
    //    this.getCommonHouseplantsData = this.getCommonHouseplantsData.bind(this);
   }
// TRY TO FETCH API DATA USING JQUERY!
//    createCommonHouseplantsList(response) {
//     //    console.log('my response', response)
//     // const myJson = response.json();
//         for (const plantObject of Object.entries(response)) {
//             let plant = {
//             commonHouseplantId: plantObject[1]['common_houseplant_id'],
//             commonHouseplantPhotoUrl: plantObject[1]['common_houseplant_photo_url'],
//             commonName: plantObject[1]['common_name'],
//             latinName: plantObject[1]['latin_name'],
//             generalDescription: plantObject[1]['general_description'],
//             recommendedLightRequirements: plantObject[1]['light_requirements'],
//         }
//         //    console.log('commonHouseplantId:', plantObject[1]['common_name'])
//         //    console.log('state', this.state.listOfCommonHouseplants)
//         this.state.listOfCommonHouseplants.push(plant);
//     };
//         console.log(this.state.listOfCommonHouseplants)
//         this.setState({
//             listOfCommonHouseplants: this.state.listOfCommonHouseplants
//     });
//         console.log('state', this.state.listOfCommonHouseplants)
//         }

//     getCommonHouseplantsData() {
//         $.get('/api/common_houseplants', this.createCommonHouseplantsList);
//     }

//     componentDidMount() {
//         this.getCommonHouseplantsData();
//     }

 
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

        // const response = await fetch(`/api/new_plant`, { 
        //     method: 'POST', 
        //     body: JSON.stringify(body), 
        //     headers: {'Content-Type': 'application/json'}
        // });

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