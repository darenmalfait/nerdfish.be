import type { ReactComponentLike } from 'prop-types'
import type * as React from 'react'

interface Meta {
  parent: { [key: string]: any }
  path: string[]
  document: { [key: string]: any }
}

type CustomRuleCallback = (
  field: any,
  meta: Meta,
) => true | string | Promise<true | string>

export interface RuleType {
  required(): RuleType
  custom(cb: CustomRuleCallback): RuleType
  min(min: number): RuleType
  max(max: number): RuleType
  length(exactLength: number): RuleType
  greaterThan(gt: number): RuleType
  uri(options: { scheme: string[]; allowRelative?: boolean }): RuleType
}

type Validation = (rule: RuleType) => RuleType

type HiddenField = (({ parent, document, value }: any) => boolean) | boolean

export interface CommonFieldProps {
  type: string
  name: string
  title?: string
  description?: string
  fieldset?: string
  hidden?: HiddenField
  inputComponent?: React.ReactNode
  readOnly?: boolean
  validation?: Validation
  preview?: Preview
  group?: string
  icon?: ReactComponentLike // is only available for elements of which include a block
  options?: {
    [key: string]: any
  }
}

export interface StringField extends CommonFieldProps {
  options?: {
    list: { title: string; value: string }[]
    layout?: string
  }
}

interface TextField extends CommonFieldProps {
  rows: number
}

export interface Span {
  _type: 'span'
  text: string
}

export interface BlockField extends CommonFieldProps {
  _type: 'block'
  styles: {
    title: string
    value: string
    blockEditor?: {
      render: ReactComponentLike | JSX.Element
    }
    icon?: ReactComponentLike
  }[]
  marks?: {
    decorators?: { title: string; value: string }[]
    annotations?: (ObjectField & {
      blockEditor?: { icon: React.ReactNode } | React.ReactNode
    })[]
  }
  lists?: { title: string; value: string }[]
  children: (Field | Span)[]
}

type ArrayOf =
  | ObjectField
  | ReferenceField
  | ImageField
  | { type: string }
  | BlockField

export interface ArrayField extends CommonFieldProps {
  type: 'array'
  name: string
  of: ArrayOf[]
}

type FilterFunctionResult = { filter: string; filterParams?: string }

type FilterFunction = (args: {
  document: { [key: string]: any }
  parentPath: string[]
  parent: Record<string, unknown>[]
}) => FilterFunctionResult

export interface ReferenceField extends CommonFieldProps {
  to: { type: string }[]
  options?: {
    filter: string | FilterFunction
    filterParams?: { [key: string]: string }
  }
}

export interface ImageField extends CommonFieldProps {
  type: 'image'
  options?: {
    hotspot?: boolean
  }
  fields?: Field[]
}

export type Field =
  | CommonFieldProps
  | StringField
  | TextField
  | ArrayField
  | ReferenceField
  | ImageField
  | ObjectField
  | BlockField

interface Preview {
  select?: { [key: string]: string }
  prepare?: (selection: { [key: string]: any }) => {
    title?: string
    subtitle?: string
    media?: string | React.ReactNode
  }
  component?: (props: PreviewProps) => React.ReactElement
}

interface Fieldset {
  name: string
  title: string
  options?: { collapsible: boolean; collapsed?: boolean }
}

export interface ObjectField extends CommonFieldProps {
  type: 'object'
  fields: Field[]
  fieldsets?: Fieldset[]
  initialValue?: { [key: string]: any }
  options?: { collapsible?: boolean; collapsed?: boolean }
}

export interface I18n {
  i18n: boolean
  base: string
  languages: string[]
  fieldNames?: {
    lang: string
    references: string
  }
}

export interface FieldGroup {
  name: string
  title: string
  default?: boolean
  hidden?: HiddenField
  icon?: React.ReactNode
}

export interface Document {
  name: string
  title: string
  i18n?: I18n
  __experimental_actions?: string[]
  icon?: React.ReactNode
  groups?: FieldGroup[]
  type: 'document'
  fields: Field[]
  fieldsets?: Fieldset[]
  inputComponent?: React.ReactNode
  initialValue?: { [key: string]: any }
  orderings?: {
    name: string
    title: string
    by: { field: string; direction: string }[]
  }[]
  preview?: Preview
}

export enum BlockContentType {
  layout = 'layout',
  content = 'content',
}

export interface BlockContentField {
  name: BlockContentType
  title: BlockContentType
  fieldset: BlockContentType
  type: string
}

export interface PreviewProps {
  value: {
    [key: string]: any
  }
}

export type Body2TextProps = { children: React.ReactNode }
