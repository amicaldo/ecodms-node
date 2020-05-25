const axios = require('axios');
const fs = require('fs');
const yup = require('yup');
const FormData = require('form-data');


class EcoDms {
  /**
   * @param {object} config
   */
  constructor(config) {
    /** Validate config */
    const configSchema = yup.object().shape({
      origin: yup.string().url().required(),
      port: yup.number().default(8180),
      username: yup.string().required(),
      password: yup.string().required()
    });

    config = configSchema.validateSync(config);

    this.__api = axios.create({
      baseURL: `${new URL(config.origin).origin}:${config.port}/api`,
      auth: {
        username: config.username,
        password: config.password
      }
    });

    /** Middleware to extract data from successful request */
    this.__api.interceptors.response.use(({ data }) => data);
  }
}


/**
 * @return {Promise<string>}
 */
EcoDms.prototype.test = function() {
  return this.__api.get('/test');
};


/**
 * @return {Promise<object[]>}
 */
EcoDms.prototype.getStatus = function() {
  return this.__api.get('/status');
};


/**
 * @return {Promise<string[]>}
 */
EcoDms.prototype.getRoles = function() {
  return this.__api.get('/roles');
};


/**
 * @return {Promise<string[]>}
 */
EcoDms.prototype.getUserRoles = function() {
  return this.__api.get('/userRoles');
};


/**
 * @return {Promise<object[]>}
 */
EcoDms.prototype.getTypes = function() {
  return this.__api.get('/types');
};


/**
 * @return {Promise<object[]>}
 */
EcoDms.prototype.getFolders = function() {
  return this.__api.get('/folders');
};


/**
 * @param {number|string} id
 *
 * @return {Promise<object>}
 */
EcoDms.prototype.getFolderById = function(id) {
  return this.__api.get(`/folders/${id}`);
};


/**
 * @param {number|string} id
 *
 * @return {Promise<string>}
 */
EcoDms.prototype.getDocumentById = function(id) {
  return this.__api.get(`/document/${id}`);
};


/**
 * @param {number|string} id
 * @param {number|string} version
 *
 * @return {Promise<string>}
 */
EcoDms.prototype.getDocumentByIdAndVersion = function(id, version) {
  return this.__api.get(`/document/${id}/version/${version}`);
};


/**
 * @param {number|string} id
 *
 * @return {Promise<boolean>}
 */
EcoDms.prototype.deleteDocumentById = function(id) {
  return this.__api.get(`/document/${id}/moveToTrash`);
};


/**
 * @param {number|string} id
 *
 * @return {Promise<boolean>}
 */
EcoDms.prototype.recoverDocumentById = function(id) {
  return this.__api.get(`/document/${id}/removeFromTrash`);
};


/**
 * @param {number|string} id
 *
 * @return {Promise<number[]>}
 */
EcoDms.prototype.getLinkedDocumentsById = function(id) {
  return this.__api.get(`/document/${id}/readLinkedDocuments`);
};


/**
 * @param {number|string} id
 * @param {number[]|string[]} linkIds
 *
 * @return {Promise<number[]>}
 */
EcoDms.prototype.linkDocuments = function(id, linkIds) {
  return this.__api.post(`/document/${id}/linkToDocuments`, linkIds);
};


/**
 * @param {number|string} id
 * @param {number[]|string[]} linkIds
 *
 * @return {Promise<boolean>}
 */
EcoDms.prototype.deleteLinked = function(id, linkIds) {
  return this.__api.post(`/document/${id}/removeDocumentLink`, linkIds);
};


/**
 * @param {number|string} id
 *
 * @return {Promise<object[]>}
 */
EcoDms.prototype.getDocumentInfoById = function(id) {
  return this.__api.get(`/documentInfo/${id}`);
};


/**
 * @param {number|string} id
 * @param {number|string} page
 * @param {number|string} height
 *
 * @return {Promise<string>}
 */
EcoDms.prototype.getDocumentPreview = function(id, page, height) {
  return this.__api.get(`/thumbnail/${id}/page/${page}/height/${height}`);
};


/**
 * @return {Promise<number[]>}
 */
EcoDms.prototype.getClassifyAttributes = function() {
  return this.__api.get('/classifyAttributes');
};


/**
 * @param {string} filepath
 * @param {boolean} [versionControlled]
 *
 * @return {Promise<number>}
 */
EcoDms.prototype.uploadFile = function(filepath, versionControlled = false) {
  const form = new FormData();

  form.append('file', fs.createReadStream(filepath));

  return this.__api.post(`/uploadFile/${versionControlled}`, form, {
    headers: form.getHeaders()
  });
};


/**
 * @param {string} filepath
 * @param {string} pdfpath
 * @param {boolean} [versionControlled]
 *
 * @return {Promise<number>}
 */
EcoDms.prototype.uploadFileWithPdf = function(
  filepath,
  pdfpath,
  versionControlled = false
) {
  const form = new FormData();

  form.append('file', fs.createReadStream(filepath));
  form.append('pdfFile', fs.createReadStream(pdfpath));

  return this.__api.post(`/uploadFileWithPdf/${versionControlled}`, form, {
    headers: form.getHeaders()
  });
};


/**
 * @param {number|string} id
 * @param {string} filepath
 * @param {boolean} [fixed]
 *
 * @return {Promise<boolean>}
 */
EcoDms.prototype.addVersionToDocument = function(id, filepath, fixed = false) {
  const form = new FormData();

  form.append('file', fs.createReadStream(filepath));

  return this.__api.post(`/addVersionToDocument/${id}/${fixed}`, form, {
    headers: form.getHeaders()
  });
};


/**
 * @param {number|string} id
 * @param {string} filepath
 * @param {string} pdfpath
 * @param {boolean} [fixed]
 *
 * @return {Promise<boolean>}
 */
EcoDms.prototype.addVersionWithPdfToDocument = function(
  id,
  filepath,
  pdfpath,
  fixed = false
) {
  const form = new FormData();

  form.append('file', fs.createReadStream(filepath));
  form.append('pdfFile', fs.createReadStream(pdfpath));

  return this.__api.post(`/addVersionToDocument/${id}/${fixed}`, form, {
    headers: form.getHeaders()
  });
};


/**
 * @param {object} docInfoObject
 *
 * @return {Promise<number>}
 */
EcoDms.prototype.createNewClassify = function(docInfoObject) {
  return this.__api.post('/createNewClassify', docInfoObject);
};


/**
 * @param {object} folderObject
 *
 * @return {Promise<number>}
 */
EcoDms.prototype.createFolder = function(folderObject) {
  return this.__api.post('/createFolder', folderObject);
};


/**
 * @param {object} folderObject
 * @param {number|string} parentFolderId
 *
 * @return {Promise<number>}
 */
EcoDms.prototype.createSubfolder = function(folderObject, parentFolderId) {
  return this.__api.post(`/createFolder/parent/${parentFolderId}`)
};


module.exports = EcoDms;
