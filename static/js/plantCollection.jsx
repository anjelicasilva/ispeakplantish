class PlantCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
         const usersPlantCollectionResponse = await fetch('/api/houseplants');
         const usersPlantCollectionJson = await usersPlantCollectionResponse.json();
         const newUsersPlantCollection = []
         for (const usersPlantObject of Object.entries(usersPlantCollectionJson)) {
             if (this.props.renderCurrentUserId() === usersPlantObject[1]['user_id']) {
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
                <li key={usersPlant['userHouseplantId']} >
                    <button className="my-collection-button" 
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
                // <div>Loading...</div>
                <div className="sticky">
                    <div className="text-center my-plant-collection-bg"></div>
                    <img id="spinner-gif" src="static/gifs/Spinner-1s-200px.gif"></img>
                </div>
            )
        }

        if (this.state.selectedUserHouseplantId === null) {
            return (
                <div>
                    <div className="text-center my-plant-collection-bg">
                        <h3 className="my-collection-header">My Plant Collection</h3>
                        <div>
                            <ol>
                                { this.renderUsersPlantCollection() }
                            </ol>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="sticky">
                    <div className="text-center my-plant-collection-bg"></div>
                </div>
                <div className="center-plant-collection">
                    <h3 className="text-center my-collection-header">My Plant Collection</h3>
                        <div>
                            <ol className="text-center">
                                { this.renderUsersPlantCollection() }
                            </ol>
                        </div>
                    <div className="modal-dialog text-left">
                        <div className="col-lg-12 main-section">
                            <div className="modal-content plant-info">
                                <div className="col-12">
                                    <div className="form-group">
                                    <div className="col-lg-12">
                                            <div>
                                            <div className="sms">
                                                    <SmsReminder 
                                                        notify={this.props.notify}
                                                        selectedCommonName={this.state.selectedCommonName} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="modal-dialog text-left">
                        <div className="col-lg-12 main-section">
                            <div className="modal-content plant-info">
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="col-lg-12">
                                            <div>
                                                <div className="entries-plant-info">
                                                    <AddEntries 
                                                        selectedUserHouseplantId={this.state.selectedUserHouseplantId} 
                                                        selectedCommonName={this.state.selectedCommonName} 
                                                        fetchAllEntries={this.fetchAllEntries} 
                                                        fetchAllPhotos={this.fetchAllPhotos}
                                                        notify={this.props.notify}
                                                        renderCurrentUserId={this.props.renderCurrentUserId} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="modal-dialog text-center">
                        <div className="col-lg-12 main-section">
                            <div className="modal-content plant-info">
                                <form className="col-12">
                                    <div className="form-group">
                                        <div className="col-lg-12">
                                            <div>
                                                <div className="text-center my-plant-header">{this.state.selectedCommonName}</div>
                                                <div className="entries-plant-info">
                                                    <PlantInfo 
                                                        selectedUserHouseplantId={this.state.selectedUserHouseplantId} 
                                                        listOfEntries={this.state.listOfEntries} 
                                                        fetchAllEntries={this.state.fetchAllEntries} 
                                                        listOfPhotos={this.state.listOfPhotos} /> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}