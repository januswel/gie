import { getIssues } from './github'

describe('getIssues', () => {
  it('returns', () => {
    const issues = getIssues('januswel', 'github-issues-exporter')
    expect(issues).resolves.toEqual({ data: 'dummy' })
  })
})
