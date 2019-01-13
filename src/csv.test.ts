import ISSUES from '../fixtures/issues.json'
import * as CSV from './csv'

import * as User from './github/user'
import * as Label from './github/label'
import * as Milestone from './github/milestone'

const EXPECTED = `id,number,state,locked,title,body,created by,assignees,labels,milestone,url,created at,updated at,closed at
397662970,2,open,false,following issue,This is it!,januswel,januswel,"enhancement,good first issue",test,https://api.github.com/repos/januswel/github-issues-exporter/issues/2,2019-01-10T04:00:03Z,2019-01-10T04:00:03Z,
397662429,1,open,false,initial issue,test,januswel,,,,https://api.github.com/repos/januswel/github-issues-exporter/issues/1,2019-01-10T03:56:57Z,2019-01-10T03:56:57Z,`

const mappings = [
  'id',
  'number',
  'state',
  'locked',
  'title',
  'body',
  {
    key: 'user',
    header: 'created by',
    summarize: (value: User.Entity) => User.getName(value),
  },
  {
    key: 'assignees',
    summarize: (values: Array<User.Entity>) => values.map(User.getName),
  },
  {
    key: 'labels',
    summarize: (values: Array<Label.Entity>) => values.map(Label.getName),
  },
  {
    key: 'milestone',
    summarize: (value: Milestone.Entity) => (value ? Milestone.getName(value) : ''),
  },
  'url',
  {
    key: 'created_at',
    header: 'created at',
  },
  {
    key: 'updated_at',
    header: 'updated at',
  },
  {
    key: 'closed_at',
    header: 'closed at',
  },
]

describe('CSV', () => {
  describe('stringify', () => {
    it('returns csv', () => {
      expect(CSV.stringify(ISSUES, mappings)).toBe(EXPECTED)
    })
  })
})
