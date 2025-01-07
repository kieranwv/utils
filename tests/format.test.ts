import { describe, expect, it } from 'vitest'
import { toLowerCase } from '../src/format'

describe('toLowerCase', () => {
  it('should convert camelCase to hyphen-case', () => {
    expect(toLowerCase('camelCase')).toBe('camel-case')
  })

  it('should convert PascalCase to hyphen-case', () => {
    expect(toLowerCase('PascalCase')).toBe('pascal-case')
  })

  it('should handle strings with spaces', () => {
    expect(toLowerCase('Hello World')).toBe('hello-world')
  })

  it('should handle empty strings', () => {
    expect(toLowerCase('')).toBe('')
  })
})
