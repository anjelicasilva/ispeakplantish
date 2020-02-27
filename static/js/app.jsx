class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            notificationText: null,
            currentPage: 0, 
            pages: [<HomePage />, <AboutPage />, <Form notify={this.notify}/>, <PlantCollection notify={this.notify}/>, ] 
        }; 
    }


    notify = (notificationText) => {
        this.setState ({
            notificationText: notificationText
        });
        Toastify({
            text: this.state.notificationText,
            duration: 3000,
            // destination: "<PlantCollection/>",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            // onClick: function(){} // Callback after click
          }).showToast();
    }


    render() {
        return (
            <div>
                <div>
                    <button onClick={() => 
                    this.setState({currentPage: 0})}>Homepage
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 1})}>About
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 2})}>Add a plant
                    </button> 
                    <button onClick={() => 
                    this.setState({currentPage: 3})}>View your plant collection
                    </button> 
                    {/* <button onClick={() => 
                    this.setState({currentPage: 4})}>React Toastify
                    </button>  */}
                    {/* <button onClick={() => 
                    this.setState({currentPage: 5})}>Google Maps
                    </button>  */}
                    {/* <button onClick={() => 
                    this.setState({currentPage: 4})}>Send an sms reminder
                    </button>  */}
                </div>
                <div>
                { this.state.pages[this.state.currentPage] }
                </div>
            </div>
            
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
 );