/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import React, { memo, forwardRef, useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'

const client = require('part:@sanity/base/client')

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(value))

const AutocompleteTagsComponent = ({ value, type, onChange }) => {
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState([])

  const getValuesFromRef = (id, allTags) => {
    return { ...allTags.find(item => item._id === id) }
  }

  useEffect(() => {
    const query = "*[_type == 'tag'] { ... }"

    const fetchTags = async () => {
      try {
        const allTags = []
        const items = await client.fetch(query)

        items.forEach(item => {
          if (item && item.value) {
            const values = allTags.map(({ value }) => value)

            if (!values.includes(item.value)) {
              allTags.push(item)
            }
          }
        })

        setTags(allTags)
        return allTags
      } catch (error) {
        console.error(error)
      }
    }

    const init = async () => {
      const allTags = await fetchTags()
      setIsLoading(false)
      setSelected(
        !value
          ? []
          : value.map(({ _ref: rf }) => getValuesFromRef(rf, allTags)),
      )
    }

    init()
  }, [value])

  const getItemRef = item => {
    return tags.find(tag => tag.value === item.value)._id
  }

  const changeToRef = values => {
    return values.map(val => ({
      _ref: getItemRef(val),
      _type: 'tag',
    }))
  }

  const handleChange = val => {
    // again, ensuring that `selected` remains an array
    setSelected(!val ? [] : val)

    if (onChange) {
      onChange(createPatchFrom(!val ? [] : changeToRef(val)))
    }
  }

  const createOption = async inputValue => {
    const newValue = { label: inputValue, value: inputValue, _type: 'tag' }

    try {
      const response = await client.create(newValue)

      setTags(currentTags => [
        ...currentTags,
        {
          ...newValue,
          _id: response._id,
        },
      ])

      setSelected([...selected, { ...newValue, _id: response._id }])

      if (onChange) {
        onChange(
          createPatchFrom([
            ...changeToRef(selected),
            { _ref: response._id, _type: 'tag' },
          ]),
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h4>{type.title}</h4>
      <CreatableSelect
        disabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        value={selected || []}
        isMulti
        onCreateOption={createOption}
        options={tags || ''}
      />
    </>
  )
}

export default memo(forwardRef(AutocompleteTagsComponent))
