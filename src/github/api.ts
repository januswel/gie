import fetch from 'node-fetch'

import TOKEN from './token'

const ENTORY_POINT = 'https://api.github.com'

const buildRequestHeaders = () => ({
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${TOKEN}`,
})

const buildDefaultOptions = () => ({
  headers: buildRequestHeaders(),
})

export const request = (api: string, options?: Object) => {
  const url = `${ENTORY_POINT}${api}`
  const actualOptions = {
    ...buildDefaultOptions(),
    ...options,
  }
  return fetch(url, actualOptions).then(response => response.json())
}
