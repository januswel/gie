import ISSUES from '../fixtures/issues.json'
import * as CSV from './csv'
import csvMappingsIssues from './cli/csv-mappings-issues'

const EXPECTED = `id,number,state,locked,title,body,created by,assignees,labels,milestone,url,created at,updated at,closed at
397662970,2,open,false,following issue,This is it!,januswel,januswel,"enhancement,good first issue",test,https://api.github.com/repos/januswel/github-issues-exporter/issues/2,2019-01-10T04:00:03Z,2019-01-10T04:00:03Z,
397662429,1,open,false,initial issue,test,januswel,,,,https://api.github.com/repos/januswel/github-issues-exporter/issues/1,2019-01-10T03:56:57Z,2019-01-10T03:56:57Z,`

describe('CSV', () => {
  describe('stringify', () => {
    it('returns csv', () => {
      expect(CSV.stringify(ISSUES, csvMappingsIssues)).toBe(EXPECTED)
    })
  })
})
