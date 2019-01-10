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

describe('Issue', () => {
  it('extractUsers', async () => {
    const issues = await Issue.getIssues('januswel', 'github-issues-exporter')
    const users = Issue.extractUsers(issues)
    expect(users).toEqual(USERS)
  })
})
