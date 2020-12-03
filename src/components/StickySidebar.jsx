import React from 'react';
import PropTypes from 'prop-types';

export class StickySidebar extends React.Component {
  constructor(props){
    super(props)

    this.scrollListener = this.scrollListener.bind(this)
  }

  componentDidMount() {
    const setInitialHeights = (elements) => {
      [].forEach.call(elements, (sticky) => {
        sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top);
      });
    };

    const stickies = document.querySelectorAll('[data-sticky]');
    setInitialHeights(stickies);

    document.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    const stickies = document.querySelectorAll('[data-sticky]');
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

    [].forEach.call(stickies, (sticky) => {
      const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10);
      const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || stickyInitial;
      const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom;

      let stickySidebar = false

      if (document.getElementById('sticky-sidebar').clientHeight < document.getElementById('body-doc-container').clientHeight) {
        stickySidebar = true
      }

      if (stickySidebar) {
        if (top >= stickyEnter && top <= stickyExit) {
          sticky.classList.add('sticky-sidebar')
          !this.props.sidebarFixed &&
          this.props.toggleFixed(true)
        } else {
          sticky.classList.remove('sticky-sidebar')
          this.props.sidebarFixed &&
          this.props.toggleFixed(false)
        }
      } else if (sticky.classList.contains('sticky-sidebar')) {
        sticky.classList.remove('sticky-sidebar')
        this.props.sidebarFixed &&
        this.props.toggleFixed(false)
      }

    })
  }

  render() {
    const { className, enter, exit, children } = this.props;

    return (
      <div
        className={`Sticky ${className}`}
        id='sticky-sidebar'
        data-sticky
        data-sticky-enter={enter}
        data-sticky-exit={exit}
      >
      {children}
      </div>
    )
  }
}

StickySidebar.propTypes = {
  className: PropTypes.string,
  enter: PropTypes.string,
  exit: PropTypes.string,
  children: PropTypes.node,
};

export default StickySidebar
