import React from 'react';
import useBreakPoints from '../../constants/breakpoints';
import Link from 'gatsby-link';

type tPROPS = {
  path: string;
};

/**
 * @description [the tabs that appear on dataset endpoint pages]
 * @param  {Object} props [current path. used for determining active tab]
 * @return {React.Element}
 */
const EndpointButtons = (props: tPROPS) => {
  // Query explorer button === this
  // Reference button === this + /reference/
  const isBasics: boolean = props.path.indexOf('reference') === -1;
  const path: string = props.path.replace(/(\/reference){1}\/?/, '');
  const {mob} = useBreakPoints();

  const getActiveCx = (idx: number) => {
    const isActive = (idx === 0 && isBasics) || (idx !== 0 && !isBasics);
    const baseClass = 'btn tab bg-secondary weight-700 m-pad-l-2 m-pad-r-2 pad-t-2 pad-b-2 pad-l-3 pad-r-3';
    const breakpointClass = mob ? 'smallest' : '';
    const marginClass = idx === 0 ? 'marg-r-1' : '';
    const colorClass = isActive ? 'bg-white clr-primary-dark' : 'clr-white';

    return `${baseClass} ${breakpointClass} ${marginClass} ${colorClass}`;
  };

  return (
    <div
      className="relative"
      style={{
        bottom: '-20px',
      }}
    >
      <Link className={getActiveCx(0)} tabIndex={0} to={`${path}/`}>
        Basics
      </Link>
      <Link className={getActiveCx(1)} tabIndex={0} to={`${path}/reference/`}>
        Reference guide
      </Link>
    </div>
  );
};

EndpointButtons.displayName = 'components/Hero/EndpointButtons';
export default EndpointButtons;
