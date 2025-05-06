type tROUTE = {
  childRoutes: Array<Object>;
  component: React.Element;
  indexRoute: Object;
  pages: Array<Object>;
  path: string;
  templates: Array<Object>
};

// react router funnels the route data, etc, through
// template files at each folder level, which we can
// use to layout parts of the site differently if we
// wanted, but wejust immediately render the children
export type tTEMPLATE = {
  children: ?React.Element;
  history: Object;
  location: Object;
  params: Object;
  route: tROUTE;
  routeParams: Object;
  routes: Array<Object>;
};

