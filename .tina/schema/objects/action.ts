const actionSchema = {
  type: 'object',
  label: 'Action',
  name: 'action',
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'string',
    },
    {
      name: 'href',
      label: 'Href',
      type: 'string',
    },
  ],
}

export {actionSchema}
