class AddEntries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newJournalEntry: "",
      waterUpdateInput: false,
      fertilizerUpdateInput: false,
      listofEntries: [],
      selectedImgFile: null,
    }
  }


  imgFileSelectedHandler = event => {
    this.setState({
        selectedImgFile: event.target.files[0],
    })
  } 


  handleImageSubmit = (newEntryResponse) => {
    const formData = new FormData();
    formData.append('file', this.state.selectedImgFile);
    formData.append('journalEntryId', newEntryResponse);
    fetch('/api/add_image', {
        method: 'POST',
        body: formData
    })
    .then((newImageResponse)=> JSON.stringify(newImageResponse))
    .then((result)=> {
      this.props.fetchAllEntries();
      this.props.fetchAllPhotos();
      // console.log('Success', result);
    })
    .catch((error)=> {
        console.error('Error', error);
    });
  }


  handleEntryInput = changeEvent => {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    });
  }


  handleEntryFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let newEntryData = { 
      currentUserId: this.props.renderCurrentUserId(),
      addUserHouseplantId: this.props.selectedUserHouseplantId,
      addJournalEntryText: this.state.newJournalEntry,
      addWaterUpdate: this.state.waterUpdateInput,
      addFertilizerUpdate: this.state.fertilizerUpdateInput,
      addDateTime: String(moment().format('dddd MMMM Do YYYY, h:mm a')),
  }
    $.post('/api/add_new_journal_entry_to_user_profile', newEntryData, 
          (response) => {this.props.notify(`Entry added for your ${this.props.selectedCommonName}`);
                this.handleImageSubmit(response);
                })
  };


  render() {
    return(
      <form>     
        <div className="new-journal-entry">
          <div className="Image">
            <input type="file" onChange={this.imgFileSelectedHandler} />
          </div> 
            <label className="entry-title">
            Journal Entry:
            </label>
            <input id="journal-entry-box" type="text" name="newJournalEntry" placeholder="Write an entry" onChange={this.handleEntryInput}></input>
        </div> 
        <div className="water-update">
          <label className="entry-title">
            Watered Today?
          </label>
          <label className="radio-btn">
            <input 
                type="radio" 
                name="waterUpdateInput"
                value="true"
                checked={this.state.waterUpdateInput==="true"}
                onChange={this.handleEntryInput}
                className="waterUpdateInput"
                id="waterUpdateInput-yes"/>
              Yes
          </label>
          <label className="radio-btn">
            <input 
                type="radio" 
                name="waterUpdateInput"
                value="false"
                checked={this.state.waterUpdateInput==="false"}
                onChange={this.handleEntryInput}
                className="waterUpdateInput"
                id="waterUpdateInput-no"/>
              No
          </label>           
        </div>
        <div className="fertilizer-update">
          <label className="entry-title">
            Fertilized Today?
          </label>
          <label className="radio-btn">
            <input 
                type="radio" 
                name="fertilizerUpdateInput"
                value="true"
                checked={this.state.fertilizerUpdateInput==="true"}
                onChange={this.handleEntryInput}
                className="fertilizerUpdateInput"/>
              Yes
          </label>
          <label className="radio-btn">
            <input 
                type="radio" 
                name="fertilizerUpdateInput"
                value="false"
                checked={this.state.fertilizerUpdateInput==="false"}
                onChange={this.handleEntryInput}
                className="fertilizerUpdateInput"/>
              No
          </label>
        </div>
        <div className="text-center">     
          <button id="new-entry-btn" className="my-collection-button"
            onClick={this.handleEntryFormSubmit}
            disabled={this.props.selectedUserHouseplantId === null}>
              Add New Entry
          </button>
        </div>     
      </form>);
  }
}