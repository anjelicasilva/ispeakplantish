class PlantInfo extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderEntries = this.renderEntries.bind(this)
        this.checkUpdates = this.checkUpdates.bind(this)
    }
    

    checkUpdates(update) {
        if (update === true) {
            update = "Yes"
        } else {
            update = "No"
        }
        return update
    };

    renderEntries() {

        const listOfRenderedEntries = []
        
        for (const entry of this.props.listOfEntries){
            if (entry['userHouseplantId'] == this.props.selectedUserHouseplantId) {
                
                listOfRenderedEntries.push(
                    //** */ possibly make Line 61 -65 a component and then map listOfRenderedEntries to a function that renders that component
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