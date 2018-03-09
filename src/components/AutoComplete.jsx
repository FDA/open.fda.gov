import Autosuggest from 'react-autosuggest'
import withQuery from 'with-query'
import 'whatwg-fetch'
import React from 'react'

class AutoCompleteComponent extends React.Component {

    constructor (props: Object) {
        super(props)

        this.state = {
            value: '',
            suggestions: [],
            url: this.props.parent.state.dataset.url,
            endpoint: this.props.parent.state.dataset.endpoint
        }
        this.getSuggestions = this.getSuggestions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
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
            withQuery(`${this.state.url}/${this.state.endpoint}`,{
                searchField: this.props.option.field,
                searchText: value,
                searchType: 'autocomplete',
                limit: this.props.option.limit
            })
        )
        .then(res => res.json())
        .then((json) => json.results)
        .catch((err) => [])
    }

    onSuggestionsFetchRequested(value){
        var that = this;
        const escapedValue = this.escapeRegexCharacters(value.value.trim())
        this.getSuggestions(escapedValue).then(result => {
            if(!result){
                return
            }
            that.setState({
                suggestions: result,
                value: escapedValue
            })
            console.log("suggestions are:", result);
        })
    }
    onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
        if(this.props.onChange){
            this.props.onChange(suggestion, {
                field: this.props.option.field,
                idx: this.props.option.idx
            })
        }
        console.log(event, suggestion)
    }

    getSuggestionValue(suggestion) {
        return suggestion
    }

    onChange (event, { newValue, method }) {
        if(!newValue.length){
            this.setState({
                suggestions: [],
                value: newValue
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
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                    placeholder: this.props.option.placeholder,
                    value: this.state.value,
                    onChange: this.onChange
                }}
            />
        );
    }
}


AutoCompleteComponent.displayName = 'component/AutoCompleteComponent'
export default AutoCompleteComponent