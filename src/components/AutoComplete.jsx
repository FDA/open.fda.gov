import Autosuggest from 'react-autosuggest'
import withQuery from 'with-query'
import 'whatwg-fetch'
import React from 'react'

class AutoCompleteComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            value: '',
            suggestions: []
        }
        this.getSuggestions = this.getSuggestions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        
    }

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        );
    }

    getSuggestions(value) {
        return fetch(
            withQuery(`${this.props.url}/${this.props.endpoint}`,{
                searchField: this.props.field,
                searchText: value.value,
                searchType: 'autocomplete',
                limit: this.props.limit
            })
        )
        .then(res => res.json())
        .then((json) => {
          return json.results
        })
        .catch((err) => {
          return []
        })
    }

    onSuggestionsFetchRequested(value){
        var that = this;
        this.getSuggestions(value).then(result => {
            if(!result){
                return
            }
            that.setState({
                suggestions: result,
                value: value.value
            })
            console.log("suggestions are:", result);
        })
    }

    getSuggestionValue(suggestion) {
        return suggestion
    }

    onChange (event, { newValue, method }) {
        const value = this.escapeRegexCharacters(newValue.trim())
        if(!value.length){
            this.setState({
                suggestions: [],
                value
            })
        }
    }

    onSuggestionsClearRequested (){
        this.setState({
            suggestions: []
        })
    }

    render() {
        return (
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                    placeholder: this.props.placeholder,
                    value: this.state.value,
                    onChange: this.onChange
                }}
            />
        );
    }
}


AutoCompleteComponent.displayName = 'component/AutoCompleteComponent'
export default AutoCompleteComponent