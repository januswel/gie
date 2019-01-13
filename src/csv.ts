interface Mapper {
  key: string
  header?: string
  summarize?: (value: any) => any
}
type Mapping = string | Mapper

const generateHeader = (mappings: Array<Mapping>) => {
  return mappings
    .map(mapping => {
      if (typeof mapping === 'string') {
        return mapping
      }
      if (mapping.header) {
        return mapping.header
      }
      return mapping.key
    })
    .join(',')
}

const PATTERN = /[,"\n]/u
const escape = (field: string) => {
  if (PATTERN.test(field)) {
    const replaced = field.replace(/"/gu, '""')
    return `"${replaced}"`
  }
  return field
}
const convert = (value: any, mapper?: Function) => {
  if (value == null) {
    return ''
  }

  if (mapper) {
    return escape(mapper(value).toString())
  }

  return escape(value.toString())
}

export const stringify = (data: Array<Object>, mappings: Array<Mapping>) => {
  const header = generateHeader(mappings)

  const body = data.map((record: { [key: string]: any }) => {
    const result = []
    for (let i = 0; i < mappings.length; ++i) {
      const mapping = mappings[i]
      if (typeof mapping === 'string') {
        const value = record[mapping]
        result.push(convert(value))
        continue
      }

      if (mapping.summarize) {
        const value = record[mapping.key]
        result.push(convert(value, mapping.summarize))
        continue
      }

      const value = record[mapping.key]
      result.push(convert(value))
    }
    return result.join(',')
  })

  return `${[header].concat(body).join('\n')}`
}
