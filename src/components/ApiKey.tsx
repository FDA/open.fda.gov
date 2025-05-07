/* @flow */

import React from 'react'

/**
 * @description [api key widget for signing up api users]
 */


class ApiKey extends React.Component {
  constructor (props: Object) {
    super(props)
    this.state = {
      email: '',
      emailSent: false,
      loading: false,
      showForm: false
    }

    this.postApiKey = this.postApiKey.bind(this)
    this.transformButton = this.transformButton.bind(this)
  }

  transformButton () {
    this.setState({
      showForm: true,
    })
  }

  postApiKey (e) {
    this.setState({loading: true})
    if (e.preventDefault) {
      e.preventDefault()
    }
    else {
      e.returnValue = false
    }

    const email: string = document.getElementById('api-key').value

    // If we need to make changes to this format, verify with our Umbrella API contact nick.muerdter@nrel.gov
    const postBody: Object = {
      user: {
        'first_name': 'openFDA',
        'last_name': 'User',
        email,
        'use_description': 'Signup through open.fda.gov',
        'terms_and_conditions': true,
        'registration_source': 'open.fda.gov'
      },
      options: {
        'contact_url': 'mailto:open@fda.hhs.gov',
        'send_welcome_email': true,
        'verify_email': true,
        'email_from_name': 'OpenFDA',
        'site_name': 'OpenFDA',
      }
    }

    return fetch('https://api.data.gov/api-umbrella/v1/users.json?api_key=qeFgqbUXRY76Yk0nCKC60ur1J3bEuLUyPKp2remB', {
      body: JSON.stringify(postBody, null, 4),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: 'POST',
      mode: 'cors'
    }).then(this.handleErrors)
      .then(res => res.json())
      .then(res => {
        console.log("res: ", res)
        this.setState({
          emailSent: true,
          email,
          loading: false
        })
      })
      .catch(() => {})
  }

  render () {
    const { emailSent, loading, showForm } = this.state
    return (
      <section className='marg-t-2 clearfix'>
        <div className='flex-box'>
          <div className='col grow-none'>
            {
              !showForm &&
                <button
                  className='block marg-b-2 bg-primary clr-white weight-700'
                  onClick={this.transformButton}
                  style={{width: "250px"}}
                >
                  <i className='fa fa-key '/> Get your API key
                </button>
            }
            {
              !emailSent && showForm &&
                <form>
                  <label>
                    <span className='visually-hidden'>Api key form</span>
                    <input
                      className='marg-b-2 font-size-5 pad-1 row'
                      id='api-key'
                      defaultValue=''
                      type='text'
                      placeholder='Enter your email address'
                    />
                  </label>
                  <button
                    className='block marg-b-2 bg-primary clr-white weight-700'
                    onClick={this.postApiKey}
                    style={{width: "250px"}}
                  >
                    <i
                      className={'fa ' + (loading ? 'fa-refresh fa-spin' : 'fa-key')}
                      style={{ marginRight: "5px" }}
                    />
                    {loading && <span>Requesting your API key</span>}
                    {!loading && <span>Get your API key</span>}
                  </button>
                </form>
            }
            {
              emailSent &&
                <div>
                  <strong>Your API key for {this.state.email} has been e-mailed to you.
                     You can use your API key to begin making web service requests immediately.</strong>
                </div>
            }
          </div>
        </div>
      </section>
    )
  }
}

export default ApiKey
