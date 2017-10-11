/* @flow */

import React from 'react'
// dark days
import $ from 'jquery'
// client side storage library
// polyfills indexedDB -> webSQL -> localstorage
// in that order. if one fails we try the next
// indexDB's limitless storage power +
// localstorage's easy to use API
// require this way because webpack complains about
// requiring the pre-built dist file in npm
//import localforage from '../polyfills/localforage/src/localforage.js'
import localforage from 'localforage'
import { API_LINK } from '../constants/api'

type tSTATE = {
  apiKey: ?string;
  showForm: boolean;
  submitted: boolean;
};

const ApiKeyContainer = function (ComposedApiKey: ReactClass): ReactClass {
  class HOC extends React.Component {
    state: tSTATE = {
      apiKey: null,
      showForm: false
    };

    _boundUpdate () {}

    constructor (props) {
      super(props)

      // only bind once
      this._boundUpdate = this._postAndUpdate.bind(this)
    }

    _transformButton () {
      this.setState({
        showForm: true,
      })
  }

    _postAndUpdate (e) {
      // older ie doesn't support preventDefault
      if (e.preventDefault) {
        e.preventDefault()
      }
      else {
        e.returnValue = false
      }

      // you'll have to add some more logic
      // to handle more than one api key container later
      const email: string = document.getElementById('api-key').value

      const postBody: Object = {
        user: {
          'first_name': 'openFDA',
          'last_name': 'User',
          email,
          'use_description': 'Signup through open.fda.gov',
          'terms_and_conditions': '1',
          'send_welcome_email': '0',
          'registration_source': 'open.fda.gov'
        },
        options: {
          'contact_url': 'mailto:open@fda.hhs.gov',
          'site_name': 'OpenFDA',
          'email_from_name': 'OpenFDA'
        }
      }

      localforage.getItem(`openfda-api-${email}`).then(res => {
        // res will return null if not found
        if (res !== null) {
          this.setState({
            apiKey: res,
          })
        }
        else {
          $.post(API_LINK + '/api-umbrella/v1/users.json?api_key=qeFgqbUXRY76Yk0nCKC60ur1J3bEuLUyPKp2remB', postBody)
            .done(data => {
              localforage.setItem(`openfda-api-${email}`, data.user.api_key)

              this.setState({
                apiKey: data.user.api_key,
              })
            })
        }
      })
    }

    render (): React.Element {
      return (
        <ComposedApiKey
          {...this.props}
          {...this.state}
          onSubmit={this._boundUpdate}
          transformButton={this._transformButton.bind(this)}
        />
      )
    }
  }
  return HOC
}

export default ApiKeyContainer
