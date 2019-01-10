import * as Label from './label'

import ISSUES from '../fixtures/issues.json'

const [
  {
    labels: [LABEL],
  },
] = ISSUES

describe('Label', () => {
  describe('getName', () => {
    it('returns name', () => {
      expect(Label.getName(LABEL)).toBe('enhancement')
    })
  })
})
