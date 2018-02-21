import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import {default as $} from "jquery";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    const generic_name_url = "http://ec2-34-238-202-4.compute-1.amazonaws.com:8000/drug/label.json?searchField=openfda.generic_name&searchText=" + escapedValue +
        "&searchType=autocomplete&limit=100";

    return fetchJSON(generic_name_url);

}

function fetchJSON (url: string): Object {
    var promise = new Promise((resolve, reject) => {
        resolve($.getJSON(url));
    });

    return promise;
};

function getSuggestionValue(suggestion) {
    return suggestion;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion}</span>
    );
}

class AutoCompleteComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        var that = this;
        getSuggestions(value).then(function (result) {
            that.setState({ suggestions: result.results})
        });

        console.log("suggestions are:" + this.state.suggestions);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Start typing " + this.props.fieldName + "...",
            value,
            onChange: this.onChange,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

AutoCompleteComponent.displayName = 'component/AutoCompleteComponent'
export default AutoCompleteComponent