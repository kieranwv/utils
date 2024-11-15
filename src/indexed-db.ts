export interface IndexedDBType {
  dbName: string
  dbVersion: number
  dbStoreName: string
}

export const defaultIndexedDB: IndexedDBType = {
  dbName: 'your-db-name',
  dbVersion: 1,
  dbStoreName: 'your-db-store-name',
}

export class IndexedDB<T = any> {
  private readonly dbStoreName: string
  private readonly dbPromise: Promise<IDBDatabase>

  constructor(
    {
      dbName,
      dbVersion,
      dbStoreName,
    }: IndexedDBType = defaultIndexedDB,
  ) {
    this.dbStoreName = dbStoreName
    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      if (window.indexedDB !== undefined) {
        const request = window.indexedDB.open(dbName, dbVersion)
        request.onerror = error =>
          reject(new Error(`[IndexedDB] error: indexedDB open fail, ${error}`))
        request.onsuccess = () => resolve(request.result)
        request.onupgradeneeded = () => {
          const db = request.result
          db.createObjectStore(dbStoreName)
        }
      }
      else {
        throw new Error('[IndexedDB] error: IndexedDB not supported.')
      }
    })
  }

  async insert(id: IDBValidKey, data: T): Promise<void> {
    if (!id)
      return
    return this.dbPromise.then(
      db =>
        new Promise((resolve, reject) => {
          const tx = db.transaction([this.dbStoreName], 'readwrite')
          const request = tx.objectStore(this.dbStoreName).put(data, id)
          tx.oncomplete = () => resolve()
          request.onerror = error => reject(new Error(`[IndexedDB] error: insert error, ${error}`))
        }),
    )
  }

  async find(id: IDBValidKey): Promise<T | undefined> {
    if (!id)
      return
    return this.dbPromise.then(
      db =>
        new Promise((resolve, reject) => {
          const tx = db.transaction([this.dbStoreName], 'readonly')
          const request = tx.objectStore(this.dbStoreName).get(id)
          request.onsuccess = () => {
            if (request.result)
              resolve(request.result)
            else resolve(undefined)
          }
          request.onerror = error => reject(new Error(`[IndexedDB] error: find error, ${error}`))
        }),
    )
  }

  async delete(id: IDBValidKey): Promise<void> {
    if (!id)
      return
    return this.dbPromise.then(
      db =>
        new Promise((resolve, reject) => {
          const tx = db.transaction([this.dbStoreName], 'readwrite')
          const request = tx.objectStore(this.dbStoreName).delete(id)
          request.onsuccess = () => resolve()
          request.onerror = error => reject(new Error(`[IndexedDB] error: delete error, ${error}`))
        }),
    )
  }

  async clear(): Promise<void> {
    return this.dbPromise.then(
      db =>
        new Promise((resolve, reject) => {
          const tx = db.transaction([this.dbStoreName], 'readwrite')
          const request = tx.objectStore(this.dbStoreName).clear()
          request.onsuccess = () => resolve()
          request.onerror = error => reject(new Error(`[IndexedDB] error: clear error, ${error}`))
        }),
    )
  }
}
