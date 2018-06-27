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
    className='marg-t-2 clearfix'>
    <div className='flex-box'>
      <div className='col grow-none'>
        {
          props.showForm === false &&
          <button
            className='block marg-b-2 bg-primary clr-white weight-700'
            onClick={props.transformButton}>
            <i className="fa fa-key "/> Get your API key
          </button>
        }
        {
          !props.apiKey && props.showForm === true &&
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
            <button
              className='block marg-b-2 bg-primary clr-white weight-700'
              onClick={props.onSubmit}>
              Get API key
            </button>
          </form>
        }
        {
          props.apiKey &&
          <div>
            <strong>Congrats! Your API Key is:</strong>
            <code className='pad-1 marg-t-1'>{props.apiKey}</code>
          </div>
        }
      </div>
    </div>
  </section>
)

ApiKey.displayName = 'components/ApiKey'
export default ApiKeyContainer(ApiKey)
