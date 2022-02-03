/* eslint-disable react/no-multi-comp, @typescript-eslint/no-empty-function*/
declare module 'part:@sanity/components/*' {
  class SanityInputComponent extends React.Component<any> {
    focus(): void {}
  }
  export default SanityInputComponent
}
declare module 'part:@sanity/components/selects/*' {
  class SanitySelectComponent extends React.Component<any> {
    focus(): void {}
  }
  export default SanitySelectComponent
}

declare module 'part:@sanity/components/toggles/*' {
  class SanityToggleComponent extends React.Component<any> {
    focus(): void {}
  }
  export default SanityToggleComponent
}

declare module 'part:@sanity/components/tags/*' {
  class SanityTagsComponent extends React.Component<any> {
    focus(): void {}
  }
  export default SanityTagsComponent
}

declare module 'part:@sanity/components/textareas/*' {
  class SanityTextareaComponent extends React.Component<any> {
    focus(): void {}
  }
  export default SanityTextareaComponent
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module 'part:@sanity/components/utilities/portal'
declare module 'part:@sanity/components/lists/*'
declare module 'part:@sanity/base/brand-logo'
declare module 'part:@sanity/base/**'
declare module 'part:@sanity/**/*'

declare module '@sanity/desk-tool/structure-builder'
declare module 'sanity-plugin-asset-source-ogimage'
declare module 'sanity-plugin-better-slug'
declare module 'sanity-plugin-documents-pane'
