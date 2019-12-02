export enum InputType {
  StringField,
  StringArea,
  Url,
  Select
}

export interface Product {
  id: string;
  name: string;
}

interface Meta {
  name: string;
  type: InputType;
}

interface ValueList {
  [key: string]: string | number;
}

export interface CompareOneRow {
  meta: Meta;
  values: ValueList;
}
