# @kieranwv/utils

[![GitHub Release Version](https://img.shields.io/github/v/release/kieranwv/utils?label=Release&color=%42b883)](https://github.com/kieranwv/utils/releases)
[![NPM Version](https://img.shields.io/npm/v/@kieranwv/utils?style=flat&label=npm&color=%42b883)](https://www.npmjs.com/package/@kieranwv/utils)
[![Build Status](https://github.com/kieranwv/utils/actions/workflows/ci.yml/badge.svg?branch=main&color=%42b883)](https://github.com/kieranwv/utils/actions/workflows/ci.yml)

Collection of common JavaScript / TypeScript utils by @kieranwv.

## Usage

```bash
npm install @kieranwv/utils -D
```

```js
import { IndexedDB } from '@kieranwv/utils'

const db = new IndexedDB()
```

## Utils

| name                               | description                              |
| ---------------------------------- | ---------------------------------------- |
| [`IndexedDB`](./src/indexed-db.ts) | The CRUD class for indexedDB in browser. |
| [`toLowerCase`](./src/format.ts)   | Converts string characters to lowercase. |

## License

[MIT License](./LICENSE) © 2024 [Kieran Wang](https://github.com/kieranwv/)
