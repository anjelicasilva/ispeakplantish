class PlantInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPhotos: [],
        };
        
        this.renderEntries = this.renderEntries.bind(this);
        this.checkUpdates = this.checkUpdates.bind(this);
        this.renderPhoto = this.renderPhoto.bind(this);
    }
    
    componentDidMount() {
        this.fetchAllPhotos();
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

    checkUpdates(update) {
        if (update === true) {
            update = "Yes"
        } else {
            update = "No"
        }
        return update
    };

    renderPhoto(entry) {
        let uploadPhoto = "None"
        for (const photoObject of this.state.listOfPhotos) {
            if (photoObject['journalEntryId'] === entry['journalEntryId']) {
                uploadPhoto = [<img src={photoObject['photoUrl']} />]
                return uploadPhoto
            } 
        }
    
        return uploadPhoto
    }

    renderEntries() {

        const listOfRenderedEntries = []
        
        for (const entry of this.props.listOfEntries){
            if (entry['userHouseplantId'] == this.props.selectedUserHouseplantId) {
                
                listOfRenderedEntries.push(
                    //** */ possibly make Line 61 -65 a component and then map listOfRenderedEntries to a function that renders that component
                    // https://stackoverflow.com/questions/41374572/how-to-render-an-array-of-objects-in-react **
                    <li>
                        <h4>Date: {entry['dateTime']}</h4>

                        <h5>Plant Photo:</h5> 
                        {this.renderPhoto(entry)}

                        <h5>Watered: {this.checkUpdates(entry['waterUpdate'])}</h5>
                        <h5>Fertilized: {this.checkUpdates(entry['fertilizerUpdate'])}</h5>
                        {entry['journalEntryText']}
                    </li>
                )
            }
        };
        return listOfRenderedEntries                               
    }
    
    render() {
        return (
            <div> 
                <ul>
                    { this.renderEntries() }
                </ul>
            </div>
        );
    }
}