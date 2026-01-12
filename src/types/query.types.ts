import { Step } from 'react-joyride'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

export type queryTour = {
  name: string,
  desc: string,
  title: string,
  query: string,
  params: Array<string>,
  k: number,
  closeTour?: () => void,
  level: number,
  results: Array<any>,
  qwery: string,
  className?: string,
  style?: Object,
  [key: string]: any,
}

export type queryTourState = {
  tourRun: boolean
  stepa: Array<Step>
}

export type queryExplorerProps = {
  desc: Array<string>;
  fetchQuery: Function;
  k: number;
  level?: number;
  name: string;
  params?: Array<string>;
  queryToRun?: string;
  result?: string;
  showResult: boolean;
  title: string;
  toggleQuery: Function;
  updateQuery: Function;
  tourStart: Function;
  query?: string;
};


export type queryExplorerContainerProps = StateManagerProps & {
  // close the website tour function
  closeTour?: () => void;
  // description of query
  desc: string;
  // key, passed in from parent
  k: number;
  // what header level to use
  level: number;
  // query parameters
  params: Array<string>;
  // query result
  result: string;
  // query title
  title: string;
  originalQuery: string;
  // query to run
  query: string;
  [key: string]: any;
};

export type queryExplorerContainerState = {
  queryToRun: string;
  result: string;
  showResult: boolean;
};