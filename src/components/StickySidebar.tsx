import React from 'react'
import PropTypes from 'prop-types'

interface StickySidebarProps {
  className?: string;
  enter?: string;
  exit?: string;
  children?: React.ReactNode;
  sidebarFixed?: boolean;
  toggleFixed?: (fixed: boolean) => void;
}

export class StickySidebar extends React.Component<StickySidebarProps> {
  constructor (props: StickySidebarProps) {
    super(props)

    this.scrollListener = this.scrollListener.bind(this)
  }

  componentDidMount () {
    interface StickyElement extends HTMLElement {
      setAttribute(name: string, value: string): void;
      getBoundingClientRect(): DOMRect;
    }

    const setInitialHeights = (elements: NodeListOf<Element>) => {
      [].forEach.call(elements, (sticky: Element) => {
        const htmlSticky = sticky as HTMLElement;
        htmlSticky.setAttribute('data-sticky-initial', htmlSticky.getBoundingClientRect().top.toString())
      })
    }

    const stickies = document.querySelectorAll('[data-sticky]')
    setInitialHeights(stickies)

    document.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener () {
    const stickies = document.querySelectorAll('[data-sticky]')
    const top = document.documentElement.scrollTop || document.body.scrollTop
    const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

    [].forEach.call(stickies, (sticky: HTMLElement) => {
      const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial') as string, 10)
      const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter') as string, 10) || stickyInitial
      const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit') as string, 10) || bottom

      let stickySidebar = false

      const stickySidebarElem = document.getElementById('sticky-sidebar');
      const bodyDocContainerElem = document.getElementById('body-doc-container');

      if (
        stickySidebarElem &&
        bodyDocContainerElem &&
        stickySidebarElem.clientHeight < bodyDocContainerElem.clientHeight
      ) {
        stickySidebar = true
      }

      if (stickySidebar) {
        if (top >= stickyEnter && top <= stickyExit) {
          sticky.classList.add('sticky-sidebar')
          !this.props.sidebarFixed &&
          this.props.toggleFixed && this.props.toggleFixed(true)
        }
        else {
          sticky.classList.remove('sticky-sidebar')
          this.props.sidebarFixed &&
          this.props.toggleFixed && this.props.toggleFixed(false)
        }
      }
      else if (sticky.classList.contains('sticky-sidebar')) {
        sticky.classList.remove('sticky-sidebar')
        this.props.sidebarFixed &&
        this.props.toggleFixed && this.props.toggleFixed(false)
      }

    })
  }

  render () {
    const { className, enter, exit, children } = this.props

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
}

export default StickySidebar
