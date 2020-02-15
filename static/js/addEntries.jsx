class AddEntries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      newJournalEntry: null,
      waterUpdateInput: false,
      fertilizerUpdateInput: false,
    }
    this.handleEntryInput = this.handleEntryInput.bind(this)
  }


  handleEntryInput = changeEvent => {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    });
  }


  handleEntryFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    let newEntryData = { 
      addUserHouseplantId: this.props.selectedUserHouseplantId,
      addJournalEntryText: this.state.newJournalEntry,
      addWaterUpdate: this.state.waterUpdateInput,
      addFertilizerUpdate: this.state.fertilizerUpdateInput,
  }

    $.post('/add_new_journal_entry_to_user_profile', newEntryData, (response) => console.log('Add journal entry information:', response))
  
      console.log("You have submitted for user houseplant id number:", this.props.selectedUserHouseplantId)
      console.log("You have submited the journal entry of: ", this.state.newJournalEntry);
      console.log("You have submited the water update of: ", this.state.waterUpdateInput);
      console.log("You have submited the fertilizer update of: ", this.state.fertilizerUpdateInput);
};

  render() {
    return(
      <form onSubmit={this.handleEntryFormSubmit}>     
        <div className="new-journal-entry"> 
          <label>
          Journal Entry:
          <input type="text" name="newJournalEntry" placeholder="Write an entry" onChange={this.handleEntryInput}></input>
          </label>
        </div> 
        <div className="water-update">
          <label>
          Watered Today?
          </label>
          <label>
            <input 
                type="radio" 
                name="waterUpdateInput"
                value="true"
                checked={this.state.waterUpdateInput==="true"}
                onChange={this.handleEntryInput}
                className="waterUpdateInput"
            />
            Yes
          </label>
          <label>
            <input 
                type="radio" 
                name="waterUpdateInput"
                value="false"
                checked={this.state.waterUpdateInput==="false"}
                onChange={this.handleEntryInput}
                className="waterUpdateInput"
            />
            No
          </label>           
        </div>
        <div className="fertilizer-update">
          <label>
          Fertilized Today?
          </label>
          <label>
            <input 
                type="radio" 
                name="fertilizerUpdateInput"
                value="true"
                checked={this.state.fertilizerUpdateInput==="true"}
                onChange={this.handleEntryInput}
                className="fertilizerUpdateInput"
            />
            Yes
          </label>
          <label>
            <input 
                type="radio" 
                name="fertilizerUpdateInput"
                value="false"
                checked={this.state.fertilizerUpdateInput==="false"}
                onChange={this.handleEntryInput}
                className="fertilizerUpdateInput"
            />
            No
          </label>           
        </div>
        <div>     
          <button
          type="submit"
          className="btn btn-primary"
          disabled={this.state.newJournalEntry === null}>
          Add New Entry
          </button>
        </div>     
      </form>);
  }
}