const ARIA: Readonly<{
  hide: {
    'aria-hidden': boolean;
    role: string;
    tabIndex: number;
  };
}> = Object.freeze({
  hide: {
    'aria-hidden': true,
    role: 'presentation',
    tabIndex: -1,
  },
});

export default ARIA;