import ISSUES from '../fixtures/issues.json'
import USER from '../fixtures/user.json'

const DELAY = 0
const responses: { [url: string]: Object } = {
  'https://api.github.com/users/januswel': USER,
  'https://api.github.com/repos/januswel/github-issues-exporter/issues?per_page=1000&page=1': ISSUES,
}

const HTTP_OK = 200
const createResponse = (response: Object) => ({
  get ok() {
    return true
  },
  get status() {
    return HTTP_OK
  },
  get statusText() {
    return 'OK'
  },
  get headers() {
    return {
      has() {
        return false
      },
    }
  },
  text() {
    return 'dummy'
  },
  json() {
    return new Promise(resolve => {
      setTimeout(() => resolve(response), DELAY)
    })
  },
})

export default (url: string, __: Object) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url in responses) {
        resolve(createResponse(responses[url]))
      } else {
        reject(new Error(`Register URL: ${url}`))
      }
    }, DELAY)
  })
}
