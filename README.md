# ecodms-node
Abstraction for the ecoDMS 18.09 (apu) API.

## Documentation

### `constructor(origin, port = 8180)`

 * **Parameters:**
   * `origin` — `string`
   * `[port]` — `number`

<hr />

### `login(username, password)`

 * **Parameters:**
   * `username` — `string`
   * `password` — `string`

<hr />

### `test()`

 * **Returns:** `Promise<string>`

<hr />

### `getStatus()`

 * **Returns:** `Promise<object[]>`

<hr />

### `getRoles()`

 * **Returns:** `Promise<string[]>`

<hr />

### `getUserRoles()`

 * **Returns:** `Promise<string[]>`

<hr />

### `getTypes()`

 * **Returns:** `Promise<object[]>`

<hr />

### `getFolders()`

 * **Returns:** `Promise<object[]>`

<hr />

### `getFolderById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<object>`

<hr />

### `getDocumentById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<string>`

<hr />

### `getDocumentByIdAndVersion(id, version)`

 * **Parameters:**
   * `id` — `number|string`
   * `version` — `number|string`
 * **Returns:** `Promise<string>`

<hr />

### `deleteDocumentById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<boolean>`

<hr />

### `recoverDocumentById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<boolean>`

<hr />

### `getLinkedDocumentsById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<number[]>`

<hr />

### `linkDocuments(id, linkIds)`

 * **Parameters:**
   * `id` — `number|string`
   * `linkIds` — `number[]|string[]`
 * **Returns:** `Promise<number[]>`

<hr />

### `deleteLinked(id, linkIds)`

 * **Parameters:**
   * `id` — `number|string`
   * `linkIds` — `number[]|string[]`
 * **Returns:** `Promise<boolean>`

<hr />

### `getDocumentInfoById(id)`

 * **Parameters:** `id` — `number|string`
 * **Returns:** `Promise<object[]>`

<hr />

### `getDocumentPreview(id, page, height)`

 * **Parameters:**
   * `id` — `number|string`
   * `page` — `number|string`
   * `height` — `number|string`
 * **Returns:** `Promise<string>`

<hr />

### `getClassifyAttributes()`

 * **Returns:** `Promise<number[]>`

<hr />

### `uploadFile(filepath, versionControlled = false)`

 * **Parameters:**
   * `filepath` — `string`
   * `[versionControlled]` — `boolean`
 * **Returns:** `Promise<number>`

<hr />

### `uploadFileWithPdf(filepath, pdfpath, versionControlled = false)`

 * **Parameters:**
   * `filepath` — `string`
   * `pdfpath` — `string`
   * `[versionControlled]` — `boolean`
 * **Returns:** `Promise<number>`

<hr />

### `addVersionToDocument(id, filepath, fixed = false)`

 * **Parameters:**
   * `id` — `number|string`
   * `filepath` — `string`
   * `[fixed]` — `boolean`
 * **Returns:** `Promise<boolean>`

<hr />

### `addVersionWithPdfToDocument(id, filepath, pdfpath, fixed = false)`

 * **Parameters:**
   * `id` — `number|string`
   * `filepath` — `string`
   * `pdfpath` — `string`
   * `[fixed]` — `boolean`
 * **Returns:** `Promise<boolean>`

<hr />

### `createNewClassify(docInfoObject)`

 * **Parameters:** `docInfoObject` — `object`
 * **Returns:** `Promise<number>`

<hr />

### `createFolder(folderObject)`

 * **Parameters:** `folderObject` — `object`
 * **Returns:** `Promise<number>`

<hr />

### `createSubfolder(folderObject, parentFolderId)`

 * **Parameters:**
   * `folderObject` — `object`
   * `parentFolderId` — `number|string`
 * **Returns:** `Promise<number>`


## Examples
```javascript
const EcoDms = require('ecodms-node');

const api = new EcoDms('http://example-ecodms.com');

api.test()
  .then((res) => console.log('API works'))
  .catch((err) => console.log('API does not work'));

api.login('username', 'password');

// Do anything you want from here
```
