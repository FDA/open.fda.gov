This project uses several layers of testing

1 ) Type checking
2 ) Linting
3 ) Integration testing (coming soon)
4 ) Accessibility

#### Type checking
To do type checking, make sure you have flowtype installed (`brew install flow`) and run `flow check`. `./.flowconfig` is the configuration file for flow, see docs here: (flowtype)[http://flowtype.org/docs/advanced-configuration.html]. Declaring interfaces (which you will need to do for 3rd party code a lot of the time) can be done in `./flow-interface.js`

#### Linting
To lint, make sure you've run `npm i` in the root folder, and then run `eslint ./**/*.jsx`

#### Integration Testing
coming soon

#### Accessibility
We use the `react-a11y` module in dev mode to do high level, bare bones accessibility checks. For more thorough checks, install the (accessibility tools for chrome)[https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en]. Run audits regularly before deploying.

The (WAVE toolbar)[https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US] is also helpful, and should be used in conjunction with the chrome accessibility audit (provided by the above tools).

And finally, even if all the above tools give you a green light, it doesn't mean the site is actually accessible. The only way to really know for sure is to test the site yourself. For this you need 2 more extensions: (Chrome Vox)[http://www.chromevox.com/] and (High Contrast)[https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en]

Chrome Vox is a pretty average screen reader, but is easy to use. Can users get around without having to hit tab 20 times? If not, maybe you need some skip links. Do your alt attributes make sense in context? What's the site look like in high contrast mode? These are things automated checks won't tell you.

It's also worthwhile to do a check via the built in mac screen reader, as results can easily differ from one reader to the next.

#### All together
To run both at the same time, just run `npm test`



#### Why no unit tests?
If the site becomes complicated enough to need unit tests, we will add them.
