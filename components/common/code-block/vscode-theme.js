const theme = {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#3f3e42',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: '#A2BFFC',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#EF535090',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: '#C5E478',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#637777',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'variable'],
      style: {
        color: '#ECC48D',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: '#82AAFF',
      },
    },
    {
      types: ['number'],
      style: {
        color: '#F78C6C',
      },
    },
    {
      types: ['punctuation', 'function', 'selector', 'doctype'],
      style: {
        color: '#C792EA',
        fontStyle: 'italic',
      },
    },
    {
      types: ['regex'],
      style: {
        color: '#5CA7E4',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#FFCB8B',
      },
    },
    {
      types: ['tag'],
      style: {
        color: '#CAECE6',
      },
    },
    {
      types: ['operator', 'keyword'],
      style: {
        color: '#7FDBCA',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#FF5874',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#80CBC4',
      },
    },
    {
      types: ['hexcode'],
      style: {
        color: '#FFEB95',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: '#B2CCD6',
      },
    },
    {
      types: ['imports', 'exports'],
      style: {
        color: '#D6DEEB',
      },
    },
    {
      types: ['url'],
      style: {
        color: '#C5E478',
      },
    },
  ],
}

export default theme
