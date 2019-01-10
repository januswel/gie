import { request } from './api'
import USER from '../fixtures/user.json'

describe('getIssues', () => {
  it('returns', () => {
    const user = request('/users/januswel')
    expect(user).resolves.toEqual(USER)
  })
})
