import type { BlockContentType } from '../../types/block-types'
import type { CommonFieldProps } from '../../types/schema-types'

function blockType(
  fieldName: BlockContentType,
  blockName: string,
  collapsible?: boolean,
): CommonFieldProps {
  return {
    name: fieldName,
    title: fieldName,
    type: blockFieldName(blockName, fieldName),
    options: {
      collapsed: collapsible,
      collapsible,
    },
  }
}

export function blockFieldName(
  blockName: string,
  contentType: BlockContentType,
): string {
  return `${blockName}${
    contentType.charAt(0).toUpperCase() + contentType.slice(1)
  }`
}

export default blockType
