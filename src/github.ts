import fetch from 'node-fetch'

type Owner = string
type Repository = string
type Token = string

const ENTORY_POINT = 'https://api.github.com'

const buildRequestHeaders = (token: Token) => ({
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${token}`,
})

const buildOptions = (token: Token) => ({
  headers: buildRequestHeaders(token),
})

export const getIssues = (token: Token, owner: Owner, repository: Repository) => {
  const url = `${ENTORY_POINT}/repos/${owner}/${repository}/issues`
  return fetch(url, buildOptions(token)).then(response => response.json())
}
