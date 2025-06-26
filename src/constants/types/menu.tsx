export type tMenu = {
  data: Array<string>;
  handler: Function;
  title: string;
  selected: string;
  type: string;
  [key: string]: any;
  [key: number]: string;
}
