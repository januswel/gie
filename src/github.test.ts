import { getIssues } from './github'

import OAUTH_TOKEN from './token'

describe('getIssues', () => {
  it('returns', () => {
    const issues = getIssues(OAUTH_TOKEN, 'januswel', 'github-issues-exporter')
    expect(issues).resolves.toEqual({ data: 'dummy' })
  })
})
