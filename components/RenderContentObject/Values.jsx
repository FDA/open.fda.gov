/* @flow */

import React from 'react'
import cx from 'classnames'

const labelCx: string = 'bg-primary-alt-lightest clr-gray inline-block sans weight-600 small marg-b-1'
const labelStyl: Object = {
  borderRadius: '3px',
  padding: '2px 5px'
}

type PROPS = {
  values: Object;
};

// the possible values field is pretty much
// always rendered the same so just generalize
// we don't always render values, and sometimes there
// can be a lot of them for a particular field
// so we render differently depending on length here
const Values = ({ values }: PROPS) => {
  const valueKeys: Array<string> = Object.keys(values.value)

  const colCx = cx({
    'col marg-b-1': true,
    't-3': valueKeys.length >= 11,
    't-6': valueKeys.length <= 10,
  })

  // possible_values is a list of specific values
  // e.g. drug administration routes or genders
  if (values.type === 'one_of') {
    return (
      <div className='row marg-t-2'>
        <div
          className={labelCx}
          style={labelStyl}>
          Value is one of the following
        </div>
        <ul className='flex-box flex-wrap'>
          {
            valueKeys.map((v: string, i) => (
              <li
                className={colCx}
                key={i}>
                <p className='no-marg'>
                  <code>{v}</code> = {values.value[v]}
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  // possible_values references another dataset or external service
  // e.g. MedDRA for patient reactions
  if (values.type === 'reference') {
    return (
      <div className='row marg-t-2'>
        <p>
          Fore more information, see&nbsp;
          <a
            className='link-external'
            href={values.value.link}
            rel='noopener noreferrer'
            target='_blank'>
            {values.value.name}
          </a>
        </p>
      </div>
    )
  }

  // The possible_values were not correctly typed/described in _fields.yaml
  return <noscript />
}

export default Values
