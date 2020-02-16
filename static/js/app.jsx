class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            currentPage: 0, 
            pages: [<HomePage />, <AboutPage />, <Form />, <PlantCollection />,] 
        }; 
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
                    {/* <button onClick={() => 
                    this.setState({currentPage: 3})}>Add a journal entry
                    </button>  */}
                    <button onClick={() => 
                    this.setState({currentPage: 3})}>View your plant collection
                    </button> 
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