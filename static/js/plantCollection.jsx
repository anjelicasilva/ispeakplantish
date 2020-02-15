class PlantCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // refactor after creating user sign up page
            userId: 1,
            usersPlantCollection: [],
            listOfCommonHouseplants: [],
            // view plant info
            currentPlantPage: null, 

            selectedUserHouseplantId: null,
            selectedCommonHouseplantId: null,
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
                    <button 
                        key={usersPlant['userHouseplantId']}
                        onClick={() => 
                        this.setState({
                            currentPlantPage: 0,
                            selectedUserHouseplantId: usersPlant['userHouseplantId'],
                            selectedCommonHouseplantId: usersPlant['commonHouseplantId']})
                        }>        
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
                    {/* { // ternary statement:
                    this.state.selectedCommonHouseplantId ? <PlantInfo /> : null
                    }
                    { //Short circuiting: 
                        this.state.selectedCommonHouseplantId && <PlantInfo /> 
                    } */}
                    <AddEntries selectedUserHouseplantId={this.state.selectedUserHouseplantId} />
                    <PlantInfo selectedUserHouseplantId={this.state.selectedUserHouseplantId} /> 
                </div>
            </div>
        )
    }
}