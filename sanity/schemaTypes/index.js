import {authorType} from './authorType'
import {blockContentType} from './blockContentType.jsx'
import {categoryType} from './categoryType'
import {postType} from './postType'

export const schemaTypes = [postType, authorType, categoryType, blockContentType]

// Export schema object for sanity.config.js
export const schema = {
  types: schemaTypes,
}
