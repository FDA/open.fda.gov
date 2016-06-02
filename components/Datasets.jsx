/* @flow */

import React from 'react'

type tPROPS = {
  k: number;
  meta: Object;
};

// used by Content to render out datasets
// used by the current endpoint
const Datasets = (props: tPROPS) => (
  <section
    className='t-marg-t-3 t-marg-b-3'
    key={props.k}>
    <h3>Datasets</h3>
    <p>The following datasets provide data for this endpoint.</p>
    {
      props.meta.datasets.map((dataset: string, i) => (
        <a
          key={i}
          href={`/data/${dataset.toLowerCase()}/`}>
          {dataset}
        </a>
      ))
    }
  </section>
)

Datasets.displayName = 'components/Datasets'
export default Datasets
