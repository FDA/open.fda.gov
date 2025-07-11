/* @flow */

declare var fetch: Function;

declare module 'classnames' {
  declare function exports(): string;
  declare function cx(classes: Object): string;
}

declare module 'babel-polyfill' {
  declare function exports(): any;
}

declare module 'config' {
  declare var config: Object;
}

declare module 'matchmedia' {
  declare function exports(): Function;
}

declare module 'jquery' {
  declare function exports(): Object;
}

declare module 'dateformat' {
  declare function exports(): Function;
}

declare module 'react-a11y' {
  declare function exports(): Function;
}

declare module './data/content.yaml' {
  declare function exports(): Object;
}

declare module '../data/examples.json' {
  declare function exports(): Object;
}

declare module 'isomorphic-fetch' {
  declare function exports(): Function;
}

declare module 'safe-access' {
  declare function exports(): any;
}

declare module 'es6-promise' {
  declare function exports(): Function;
}

declare module 'react-chartjs' {
  declare function Doughnut(props: Object): ReactClass;
  declare function Line(props: Object): ReactClass;
  declare function Pie(props: Object): ReactClass;
}

declare module 'react-radio-group' {
  declare function exports(): ReactClass;
}

declare module './data/examples.json' {
  declare function exports(): Object;
}

declare module '../_content.yaml' {
  declare function exports(): Object;
}

declare module 'underscore.string' {
  declare function prune(match: string, length: number): string;
  declare function include(str: string, substring: string): boolean;
}

declare module 'lodash/get' {
  declare function exports(search: any, key: string): any;
}

declare module 'lodash/debounce' {
  declare function exports(): any;
}

declare module 'lodash/each' {
  declare function exports(each: any, cb: Function): any;
}

declare module 'lodash/isObject' {
  declare function exports(obj: any): boolean;
}

declare module 'lodash/find' {
  declare function exports(search: Array<Object>|Object, cb: Function): any;
}

declare module 'lodash/sortBy' {
  declare function exports(search: Array<Object>|Object, cb: Function): any;
}

declare module 'marked' {
  declare function exports(): string;
}

declare module 'moment' {
  declare function exports(): Object;
}

declare module 'gatsby-helpers' {
  declare var prefixLink: Function;
}

declare module 'react-document-title' {
  declare function exports(): ReactClass;
}

declare module 'react-highlight' {
  declare function exports(): ReactClass;
}

declare module 'react-router' {
  declare var Link: ReactClass;
  declare var RouteHandler: ReactClass;
}
