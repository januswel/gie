import { request } from './api'
import USER from '../../fixtures/user.json'

describe('request', () => {
  it('returns', async () => {
    const user = await request('/users/januswel')
    expect(user.body).toEqual(USER)
  })
})
