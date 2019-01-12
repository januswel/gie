import TOKEN from './token'

const EMPTY_STRING_LENGTH = 0

describe('TOKEN', () => {
  it('should be greater than 0', () => {
    expect(TOKEN.length).toBeGreaterThan(EMPTY_STRING_LENGTH)
  })
})
