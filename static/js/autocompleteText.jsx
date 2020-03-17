class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            currentResult: '',
        };

        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
    }

    onTextChanged = (event) => {
        const { items } = this.props;
        const value = event.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, currentResult: value }));
    }

    suggestionSelected (value) {
        this.setState({
            currentResult: value,
            suggestions: [],
        });
        this.props.handleCommonNameSelection(value);
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
            {suggestions.map((item) => <li key={item} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
        return(
            <div className="AutoCompleteText">
                <input value={this.state.currentResult} onChange={this.onTextChanged} type="text" />
                {this.renderSuggestions()}
            </div>
        )
    }
}