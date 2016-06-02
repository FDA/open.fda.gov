/* @flow */

import React from 'react'
import ApiKeyContainer from '../containers/ApiKeyContainer'

/**
 * @description [api key widget for signing up api users]
 * @param  {Object} props [from ApiKeyContainer. apiKey if requested, onSubmit cb]
 */
const ApiKey = (props: Object) => (
  <section
    key={props.k}
    className='marg-t-3 clearfix'>
    <h3>Get your API key</h3>
    <div className='flex-box'>
      <div className='col grow-none pad-r-2 t-3'>
        <form onSubmit={props.onSubmit}>
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
          {
            !props.apiKey &&
            <button
              className='block marg-b-2 bg-primary clr-white weight-700'
              onClick={props.onSubmit}>
              Get API key
            </button>
          }
          {
            props.apiKey &&
            <div>
              <strong>Congrats! Your API Key is:</strong>
              <code className='pad-1 marg-t-1'>{props.apiKey}</code>
            </div>
          }
        </form>
      </div>
      <div className='col grow-none pad-r-2 t-3'>
        <p>We require API keys above a certain number of requests to manage load on the system, promote equitable access, and prevent abuse. <a href='/api/reference/#authentication'>See more about how to use your API key</a>.</p>
        <p className='no-marg'>Signing up for an API key means you agree to our <a href='/terms/'>terms of service</a>.</p>
      </div>
    </div>
  </section>
)

ApiKey.displayName = 'components/ApiKey'
export default ApiKeyContainer(ApiKey)
