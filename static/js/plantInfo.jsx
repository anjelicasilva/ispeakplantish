class PlantInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfEntries: []
        };
        this.renderEntries = this.renderEntries.bind(this)
        this.checkUpdates = this.checkUpdates.bind(this)
    }
    
    async componentDidMount() {
        // fetch list of plants the user owns

        // ** possibly fetch asynchronously and then have a loading animation until it finishes **
        const entriesResponse = await fetch('/api/entries');
        const entriesJson = await entriesResponse.json();
    
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
            this.state.listOfEntries.push(entry);
        };

        this.setState({
            listOfEntries: this.state.listOfEntries
        });
    };

    checkUpdates(update) {
        if (update === true) {
            update = "Yes"
        } else {
            update = "No"
        }
        return update
    };

    renderEntries() {

        const listOfRenderedEntires = []
        
        for (const entry of this.state.listOfEntries){
            if (entry['userHouseplantId'] == this.props.selectedUserHouseplantId) {
                
                listOfRenderedEntires.push(
                    //** */ possibly make Line 61 -65 a component and then map listOfRenderedEntires to a function that renders that component
                    // https://stackoverflow.com/questions/41374572/how-to-render-an-array-of-objects-in-react **
                    <li>
                        <h4>Date: {entry['dateTime']}</h4>
                        <h5>Watered:{this.checkUpdates(entry['waterUpdate'])}</h5>
                        <h5>Fertilized:{this.checkUpdates(entry['fertilizerUpdate'])}</h5>
                        {entry['journalEntryText']}
                    </li>
                )
            }
        };
        return listOfRenderedEntires                              
        
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