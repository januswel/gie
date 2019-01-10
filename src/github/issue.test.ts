import * as Issue from './issue'

const USERS = [
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/43239?v=4',
    events_url: 'https://api.github.com/users/januswel/events{/privacy}',
    followers_url: 'https://api.github.com/users/januswel/followers',
    following_url: 'https://api.github.com/users/januswel/following{/other_user}',
    gists_url: 'https://api.github.com/users/januswel/gists{/gist_id}',
    gravatar_id: '',
    html_url: 'https://github.com/januswel',
    id: 43239,
    login: 'januswel',
    node_id: 'MDQ6VXNlcjQzMjM5',
    organizations_url: 'https://api.github.com/users/januswel/orgs',
    received_events_url: 'https://api.github.com/users/januswel/received_events',
    repos_url: 'https://api.github.com/users/januswel/repos',
    site_admin: false,
    starred_url: 'https://api.github.com/users/januswel/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/januswel/subscriptions',
    type: 'User',
    url: 'https://api.github.com/users/januswel',
  },
]

const LABELS = [
  {
    color: 'a2eeef',
    default: true,
    id: 1187258815,
    name: 'enhancement',
    node_id: 'MDU6TGFiZWwxMTg3MjU4ODE1',
    url: 'https://api.github.com/repos/januswel/github-issues-exporter/labels/enhancement',
  },
  {
    color: '7057ff',
    default: true,
    id: 1187258818,
    name: 'good first issue',
    node_id: 'MDU6TGFiZWwxMTg3MjU4ODE4',
    url: 'https://api.github.com/repos/januswel/github-issues-exporter/labels/good%20first%20issue',
  },
]

describe('Issue', () => {
  describe('extractUsers', () => {
    it('returns an array of User', async () => {
      const issues = await Issue.getIssues('januswel', 'github-issues-exporter')
      const users = Issue.extractUsers(issues)
      expect(users).toEqual(USERS)
    })
  })

  describe('extractLabels', () => {
    it('returns an array of Label', async () => {
      const issues = await Issue.getIssues('januswel', 'github-issues-exporter')
      const labels = Issue.extractLabels(issues)
      expect(labels).toEqual(LABELS)
    })
  })
})
