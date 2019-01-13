import fetch, { Response } from 'node-fetch'

import TOKEN from './token'

const ENTORY_POINT = 'https://api.github.com'

const buildRequestHeaders = () => ({
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${TOKEN}`,
})

const buildDefaultOptions = () => ({
  headers: buildRequestHeaders(),
})

const extractLastPageNumber = (response: Response) => {
  const { headers } = response
  if (!headers.has('link')) {
    return null
  }

  const link = headers.get('link')
  if (!link) {
    return null
  }

  const links = link.split(',')
  const pattern = /; rel="last"/u
  const [last] = links.filter(item => pattern.test(item))
  if (!last) {
    return null
  }

  const matches = last.match(/&page=(\d+)/u)
  if (!matches) {
    return null
  }

  return parseInt(matches[1], 10)
}

export const request = (api: string, options?: Object) => {
  const url = `${ENTORY_POINT}${api}`
  const actualOptions = {
    ...buildDefaultOptions(),
    ...options,
  }

  return fetch(url, actualOptions).then(async response => {
    if (!response.ok) {
      const body = await response.text()
      throw new Error(`${response.status} ${response.statusText}: ${body}`)
    }

    const lastPageNumber = extractLastPageNumber(response)
    return response.json().then(json => ({
      header: response.headers,
      body: json,
      lastPageNumber,
    }))
  })
}
