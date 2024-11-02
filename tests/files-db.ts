import { describe, expect, it } from 'vitest'
import { FilesDB } from '../src/files-db'

describe('test use for new FilesDB', () => {
  it('base', () => {
    const filesDB = new FilesDB()
    expect(filesDB).toBeInstanceOf(FilesDB)
  })
})
