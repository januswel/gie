import * as Milestone from './milestone'

import ISSUES from '../../fixtures/issues.json'

const [{ milestone: MILESTONE }] = ISSUES

describe('Milestone', () => {
  describe('getName', () => {
    it('returns name', () => {
      if (MILESTONE) {
        expect(Milestone.getName(MILESTONE)).toBe('test')
      }
    })
  })
})
