import * as User from './user'

import ISSUES from '../../fixtures/issues.json'

const [{ user: USER }] = ISSUES

describe('Label', () => {
  describe('getName', () => {
    it('returns name', () => {
      expect(User.getName(USER)).toBe('januswel')
    })
  })
})
