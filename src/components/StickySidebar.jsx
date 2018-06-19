import React from 'react';

export class StickySidebar extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const setInitialHeights = (elements) => {
      [].forEach.call(elements, (sticky) => {
        sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top);
      });
    };

    const stickies = document.querySelectorAll('[data-sticky]');
    setInitialHeights(stickies);

    document.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

      [].forEach.call(stickies, (sticky) => {
        const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10);
        const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || stickyInitial;
        const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom;

        let stickySidebar = false

        if (document.getElementById('doc-sidebar').clientHeight < document.getElementById('doc-container').clientHeight) {
          stickySidebar = true
        }

        console.log("sticky state: ", stickySidebar)
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
    })
  }

  render() {
    const { className, enter, exit, children } = this.props;

    return (
      <div
        className={`Sticky ${className}`}
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
  className: React.PropTypes.string,
  enter: React.PropTypes.string,
  exit: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default StickySidebar