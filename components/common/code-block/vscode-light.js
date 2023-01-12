const theme = {
  plain: {
    color: '#292114',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: '#5D4003',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#ACAF6F',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: '#3A1B87',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#9C8888',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'variable'],
      style: {
        color: '#133B72',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: '#7D5500',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#087393',
      },
    },
    {
      types: ['punctuation', 'function', 'selector', 'doctype'],
      style: {
        color: '#386D15',
        fontStyle: 'italic',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#A3581B',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#003474',
      },
    },
    {
      types: ['tag'],
      style: {
        color: '#351319',
      },
    },
    {
      types: ['operator', 'keyword'],
      style: {
        color: '#802435',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#00A78b',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#7F343B',
      },
    },
    {
      types: ['hexcode'],
      style: {
        color: '#00146A',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: '#4D3329',
      },
    },
    {
      types: ['imports', 'exports'],
      style: {
        color: '#292114',
      },
    },
    {
      types: ['url'],
      style: {
        color: '#3A1B87',
      },
    },
  ],
}

export default theme
