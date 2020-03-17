class SmsReminder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          selectedSMSReminder: null,
      };
    }


    handleEntryInput = changeEvent => {
        this.setState({
          selectedSMSReminder: changeEvent.target.value
        });
      }


    sendSMS = formSubmitEvent => {
        formSubmitEvent.preventDefault();
         let smsData = { 
             selectedSMSReminder: this.state.selectedSMSReminder,
             selectedCommonName: this.props.selectedCommonName,
         }
         $.post('/api/send_sms', smsData, (response) => {this.props.notify(`SMS reminder sent to your phone`)})
    };


    render() {
        return (
            <div>
                <div className="entry-title">Text yourself a reminder so you don't forget!</div>
                <br></br>
                <form onSubmit={this.sendSMS}> 
                    <div className="fertilizer-update">
                        <label className="entry-title">
                            What type of reminder would you like to receive?
                        </label>
                        <label className="radio-btn">
                            <input
                                type="radio" 
                                name="sendWaterSMS"
                                value="sendWaterSMS"
                                checked={this.state.selectedSMSReminder==="sendWaterSMS"}
                                onChange={this.handleEntryInput}
                                className="sendWaterSMS"
                            />
                            Water Reminder  
                        </label>
                        <label className="radio-btn">
                            <input 
                                type="radio" 
                                name="sendFertilizerSMS"
                                value="sendFertilizerSMS"
                                checked={this.state.selectedSMSReminder==="sendFertilizerSMS"}
                                onChange={this.handleEntryInput}
                                className="sendFertilizerSMS"
                            />
                            Fertilizer Reminder
                        </label>
                    </div>
                    <div className="text-center">     
                        <button id="sms-btn" className="my-collection-button"
                            type="submit"
                            // className="btn btn-primary"
                            disabled={this.state.selectedSMSReminder === null}>
                            Send SMS
                        </button>
                    </div>
                </form>
            </div>
        );
    }
} 