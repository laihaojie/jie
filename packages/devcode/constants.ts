export const SKIP_START_COMMENT = '@jie-dev-start'
export const SKIP_END_COMMENT = '@jie-dev-end'
// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-useless-lazy, regexp/optimal-quantifier-concatenation
export const SKIP_COMMENT_RE = new RegExp(`(\/\/\\s*?${SKIP_START_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_START_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_START_COMMENT}\\s*?-->)[\\s\\S]*?(\/\/\\s*?${SKIP_END_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_END_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_END_COMMENT}\\s*?-->)`, 'g')
