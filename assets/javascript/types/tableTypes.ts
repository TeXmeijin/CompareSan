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
  [key: string]: string | ValueForSelect;
}

export class HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export interface ValueForSelect {
  value: string;
  exactly: string;
}

export interface CompareOneRow {
  meta: Meta;
  values: ValueList;
}
