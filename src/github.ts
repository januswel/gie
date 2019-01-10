import fetch from 'node-fetch'

type Owner = string
type Repository = string

const ENTORY_POINT = 'https://api.github.com'

const buildRequestHeaders = () => ({
  Accept: 'application/vnd.github.v3+json',
})

const buildOptions = () => ({
  headers: buildRequestHeaders(),
})

export const getIssues = (owner: Owner, repository: Repository) => {
  const url = `${ENTORY_POINT}/${owner}/${repository}/issues`
  return fetch(url, buildOptions()).then(response => response.json())
}
