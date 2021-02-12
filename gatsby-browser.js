import React from 'react';
import Layout from './src/components/Layout'
import './src/css/app.scss'

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
  }