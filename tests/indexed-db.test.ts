import { beforeEach, describe, expect, it } from 'vitest'
import { defaultIndexedDB, IndexedDB } from '../src/indexed-db'
import 'fake-indexeddb/auto'

describe('indexedDB', () => {
  let indexedDB: IndexedDB<any>
  const testData = { key: 'key', value: 'value' }
  const testId = 'test-id'

  beforeEach(() => {
    indexedDB = new IndexedDB(defaultIndexedDB)
  })

  it('should create an instance of IndexedDB', () => {
    expect(indexedDB).toBeInstanceOf(IndexedDB)
  })

  it('should insert data into the store', async () => {
    await indexedDB.insert(testId, testData)
    const result = await indexedDB.find(testId)
    expect(result).toEqual(testData)
  })

  it('should find data by id', async () => {
    await indexedDB.insert(testId, testData)
    const result = await indexedDB.find(testId)
    expect(result).toEqual(testData)
  })

  it('should delete data by id', async () => {
    await indexedDB.insert(testId, testData)
    await indexedDB.delete(testId)
    const result = await indexedDB.find(testId)
    expect(result).toBeUndefined()
  })

  it('should clear all data in the store', async () => {
    await indexedDB.insert(testId, testData)
    await indexedDB.clear()
    const result = await indexedDB.find(testId)
    expect(result).toBeUndefined()
  })
})
