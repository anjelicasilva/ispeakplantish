class PlantCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // refactor after creating user sign up page
            userId: 1,
            usersPlantCollection: [],
            listOfCommonHouseplants: [],
            listOfEntries: [],
            listOfPhotos: [],
            selectedUserHouseplantId: null,
            selectedCommonHouseplantId: null,
            selectedCommonName: null,
            
        };
        this.fetchUsersPlantCollection = this.fetchUsersPlantCollection.bind(this);
        this.fetchCommonHouseplants = this.fetchCommonHouseplants.bind(this);
        this.fetchAllEntries = this.fetchAllEntries.bind(this);
        this.fetchAllPhotos = this.fetchAllPhotos.bind(this);
    }


    componentDidMount() {
       this.fetchUsersPlantCollection();
       this.fetchCommonHouseplants();
       this.fetchAllEntries();
       this.fetchAllPhotos();
    }
        

    async fetchUsersPlantCollection() {
         // fetch list of plants the user owns
         const usersPlantCollectionResponse = await fetch('/api/houseplants');
         const usersPlantCollectionJson = await usersPlantCollectionResponse.json();
         const newUsersPlantCollection = []
 
         for (const usersPlantObject of Object.entries(usersPlantCollectionJson)) {
             if (this.state.userId === usersPlantObject[1]['user_id']) {
                 let usersPlant = {
                     commonHouseplantId: usersPlantObject[1]['common_houseplant_id'],
                     userHouseplantId: usersPlantObject[1]['user_houseplant_id'],
                     userId: usersPlantObject[1]['user_id'],
                 }
                 newUsersPlantCollection.push(usersPlant);
             }
         };
         this.setState({
            usersPlantCollection: newUsersPlantCollection,
        });
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

    async fetchAllEntries() {

        // ** possibly fetch asynchronously and then have a loading animation until it finishes **
        const entriesResponse = await fetch('/api/entries');
        const entriesJson = await entriesResponse.json();
        const newListOfEntries = []
        for (const entriesObject of Object.entries(entriesJson)) {
    
            let entry = {
                journalEntryId: entriesObject[1]['journal_entry_id'],
                journalEntryText: entriesObject[1]['journal_entry_text'],
                userId: entriesObject[1]['user_id'],
                userHouseplantId: entriesObject[1]['user_houseplant_id'],
                dateTime: entriesObject[1]['date_time'],
                waterUpdate: entriesObject[1]['water_update'],
                fertilizerUpdate: entriesObject[1]['fertilizer_update'],
            }
            newListOfEntries.push(entry);
        };

        this.setState({
            listOfEntries: newListOfEntries,
        });
    }

    async fetchAllPhotos() {

        // ** possibly fetch asynchronously and then have a loading animation until it finishes **
        const photosResponse = await fetch('/api/photos');
        const photosJson = await photosResponse.json();
        const newListOfPhotos = []
        for (const photosObject of Object.entries(photosJson)) {
    
            let photo = {
                journalEntryId: photosObject[1]['journal_entry_id'],
                photoId: photosObject[1]['photo_id'],
                photoUpdate: photosObject[1]['photo_update'],
                photoUrl: photosObject[1]['photo_url'],
            }
            newListOfPhotos.push(photo);
        };

        this.setState({
            listOfPhotos: newListOfPhotos,
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
                            selectedUserHouseplantId: usersPlant['userHouseplantId'],
                            selectedCommonHouseplantId: usersPlant['commonHouseplantId'],
                            selectedCommonName: this.state.listOfCommonHouseplants[(usersPlant['commonHouseplantId'])-1]['commonName']})
                        }>        
                    {this.state.listOfCommonHouseplants[(usersPlant['commonHouseplantId'])-1]['commonName']}
                    </button>
                </li>
            )
        };
        return listOfUsersPlants
    }

    render() {
        if (this.state.listOfCommonHouseplants.length === 0) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <h3>My Plant Collection:</h3>
                <div>
                    <ol>
                        { this.renderUsersPlantCollection() }
                    </ol>
                </div>
                <br></br>
                <br></br>
                <div>
                    <SmsReminder selectedCommonName={this.state.selectedCommonName} />
                </div>
                <br></br>
                <br></br>
                <div>
                    <AddEntries 
                        selectedUserHouseplantId={this.state.selectedUserHouseplantId} 
                        selectedCommonName={this.state.selectedCommonName} 
                        fetchAllEntries={this.fetchAllEntries} 
                        fetchAllPhotos={this.fetchAllPhotos} />
                    <PlantInfo 
                        selectedUserHouseplantId={this.state.selectedUserHouseplantId} 
                        listOfEntries={this.state.listOfEntries} 
                        fetchAllEntries={this.state.fetchAllEntries} 
                        listOfPhotos={this.state.listOfPhotos} /> 
                </div>
            </div>
        )
    }
}