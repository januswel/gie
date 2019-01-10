const DELAY = 0
const responses: { [url: string]: Object } = {
  'https://api.github.com/januswel/github-issues-exporter/issues': {
    data: 'dummy',
  },
}

const createResponse = (response: Object) => ({
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
