class PlantInfo extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderEntries = this.renderEntries.bind(this);
        this.checkUpdates = this.checkUpdates.bind(this);
        this.renderPhoto = this.renderPhoto.bind(this);
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
        for (const photoObject of this.props.listOfPhotos) {
            if (photoObject['journalEntryId'] === entry['journalEntryId']) {
                uploadPhoto = [<img key={photoObject['photoUrl']} src={photoObject['photoUrl']} />]
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
                    <li className="entry-text" key={entry['journalEntryId']}>
                        <br></br>
                        {/* <h4>Date: {entry['dateTime']}</h4> */}
                        <h5 className="entry-title">{entry['dateTime']}</h5>

                        {/* <h5>Plant Photo:</h5>  */}
                        {this.renderPhoto(entry)}

                        <h5 className="entry-title">Watered:</h5>
                            <h5>{this.checkUpdates(entry['waterUpdate'])} </h5>
                        <h5 className="entry-title">Fertilized:</h5>
                            <h5>{this.checkUpdates(entry['fertilizerUpdate'])}</h5>
                        <h5 className="entry-title">Entry:</h5>
                        {entry['journalEntryText']}
                        <br></br>
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