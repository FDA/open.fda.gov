import { ActionMeta, SingleValue } from 'react-select';

export type fieldExplorerProps = {
  k: number;
  fields: { properties: any };
  meta: { status: string; [key: string]: any };
  selectedField: string;
  updateField: (newValue: SingleValue<{ label: string; value: string }>, actionMeta: ActionMeta<{ label: string; value: string }>) => void;
  updateSelected: Function;
};

export type FieldExplorerContainerProps = {
  key: any;
  field: any;
  updateSelected: any;
  i: any;
  isFDA: any;
};

export type fieldExplorerRenderObjectProps = {
  fields: any;
  updateSelected: any;
  selectedField: any;
  i: any;
};

export type FieldOption = { label: string; value: string };

export type fieldExplorerContainerState = {
  selectedField: string
};