import { ReactElement } from 'react';
import { ReactComponentLike } from 'prop-types';

type Meta = {
  parent: { [key: string]: any };
  path: string[];
  document: { [key: string]: any };
};

type CustomRuleCallback = (field: any, meta: Meta) => true | string | Promise<true | string>;

export type RuleType = {
  required: () => RuleType;
  custom: (cb: CustomRuleCallback) => RuleType;
  min: (min: number) => RuleType;
  max: (max: number) => RuleType;
  length: (exactLength: number) => RuleType;
  greaterThan: (gt: number) => RuleType;
  uri: (options: { scheme: string[]; allowRelative: boolean }) => RuleType;
  warning: (message: string) => RuleType;
  error: (message: string) => RuleType;
  unique: () => RuleType;
};

type Validation = (rule: RuleType) => RuleType;

type CommonFieldProps = {
  name: string;
  type: string;
  title?: string;
  fieldset?: string;
  validation?: Validation;
  description?: string;
  hidden?: boolean;
  readOnly?: boolean;
  options?: {
    isHighlighted?: boolean; // is only available on fields within an image
  };
  icon?: ReactComponentLike; // is only available for elements of which include a block
};

export type StringField = CommonFieldProps & {
  options?: {
    list: { title: string; value: string }[];
    layout?: string;
  };
};

type TextField = CommonFieldProps & {
  rows: number;
};

export type Span = {
  _type: 'span';
  text: string;
};

export type BlockField = {
  _type: 'block';
  styles: {
    title: string;
    value: string;
    blockEditor?: {
      render: ReactComponentLike;
    };
    icon?: ReactComponentLike;
  }[];
  children: (Field | Span)[];
};

type ArrayOf = ObjectType | ReferenceField | ImageField | { type: string } | BlockField;

export type ArrayField = CommonFieldProps & {
  name: string;
  of: ArrayOf[];
};

type FilterFunctionResult = { filter: string; filterParams?: string };
type FilterFunction = (args: {
  document: { [key: string]: any };
  parentPath: string[];
  parent: object[];
}) => FilterFunctionResult;
type ReferenceField = CommonFieldProps & {
  to: { type: string }[];
  options: {
    filter: string | FilterFunction;
    filterParams?: { [key: string]: string };
  };
};

type ImageField = CommonFieldProps & {
  options?: {
    hotspot?: boolean;
  };
};

export type Field =
  | CommonFieldProps
  | StringField
  | TextField
  | ArrayField
  | ReferenceField
  | ImageField
  | ObjectType
  | BlockField;

type Preview = {
  select?: { [key: string]: string };
  prepare?: (selection: { [key: string]: any }) => { title?: string; subtitle?: string }; // eslint-disable-line @typescript-eslint/no-explicit-any
  component?: (props: PreviewProps) => ReactElement;
};

type Fieldset = {
  name: string;
  title: string;
  options?: { collapsible: boolean; collapsed?: boolean };
};

export type ObjectType = {
  type: 'object';
  title?: string;
  name: string;
  fields: Field[];
  validation?: Validation;
  preview?: Preview;
  fieldsets?: Fieldset[];
  description?: string;
  options?: { collapsible?: boolean; collapsed?: boolean };
};

export type Document = {
  type: 'document';
  name: string;
  fields: Field[];
  title?: string;
  validation?: Validation;
  preview?: Preview;
  fieldsets?: Fieldset[];
  initialValue?: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  orderings?: {
    name: string;
    title: string;
    by: { field: string; direction: string }[];
  }[];
};

export type PreviewProps = {
  value: {
    [key: string]: any;
  };
};

export type Body2TextProps = { children: React.FunctionComponent<any> };
