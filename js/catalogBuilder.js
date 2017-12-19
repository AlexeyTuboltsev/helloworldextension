let __dir = null
let xmlFilePath = null
let xslFilePath = null
let imgFolderPath = null

const fileReadable = function (path) {
  const res = window.cep.fs.readFile(path)
  return res.err === 0
}

const findFileByPartialName = function (fileList, name) {
  const found = fileList.filter(function (fileName) {
    return RegExp(name).test(fileName)
  })
  return found.length !== 0 ? found[0] : null
}

const chooseFile = function (e, maySelectFolders, fileTypes) {
  e.preventDefault()
  const fileSelectorData = window.cep.fs.showOpenDialogEx(false, maySelectFolders, 'hey', '', fileTypes)
  const selectedFile = fileSelectorData.data
  if (selectedFile.length) {
    return selectedFile[0]
  } else {
    return null
  }
}

const chooseImgFolder = function (e) {
  const maySelectFolders = true
  imgFolderPath = chooseFile(e, maySelectFolders, [])
  if (imgFolderPath !== null) {
    const inputElement = document.getElementById('image-folder-selector-text')
    inputElement.value = imgFolderPath
  }
}
const chooseXml = function (e) {
  const maySelectFolders = false
  const fileTypes = ['xml']
  xmlFilePath = chooseFile(e, maySelectFolders, fileTypes)
  if (xmlFilePath !== null) {
    const inputElement = document.getElementById('xml-selector-text')
    inputElement.value = xmlFilePath
    getXslPath()
  }
}

const getXslPath = function () {
  const folderPathArr = xmlFilePath.split('/')
  const fileName = folderPathArr.pop()
  const folderPath = folderPathArr.join('/')
  __dir = folderPath + '/'
  const xslFileName = 'transform_' + fileName.replace(/\.xml$/, '.xsl')
  const xslPath = folderPath + '/' + xslFileName
  if (fileReadable(xslPath)) {
    xslFilePath = xslPath
    const inputElement = document.getElementById('xsl-selector-text')
    inputElement.value = xslFilePath
  }
}

const chooseXsl = function (e) {
  const maySelectFolders = false
  const fileTypes = ['xsl']
  xslFilePath = chooseFile(e, maySelectFolders, fileTypes)
  if (xslFilePath !== null) {
    const inputElement = document.getElementById('xsl-selector-text')
    inputElement.value = xslFilePath
  }
}

const checkImgFolder = function (imgFolderPath) {
  const files = window.cep.fs.readdir(imgFolderPath)
  if (files.err !== 0) {
    alert(files.err)
    return files.err
  }
  const folders = {
    'Katalog':      findFileByPartialName(files.data, 'Katalog'),
    'QR':           findFileByPartialName(files.data, 'QR'),
    'ProductImage': findFileByPartialName(files.data, 'ProductImage')
  }
  for (const key in folders) {
    if (folders[key] === null) {
      window.cep.fs.makedir(imgFolderPath + '/' + key)
      //todo error handling
      folders[key] = key
    }
  }
  return folders
}

const onSaxonLoad = function (xslFile, xmlFile, imgFolderPath, imgFolders) {
  const saxon = window.Saxon
  saxon.setLogLevel('FINEST')
  const xml = saxon.parseXML(xmlFile)
  const xsl = saxon.parseXML(xslFile)
  const proc = saxon.newXSLT20Processor(xsl)
  proc.setParameter(null, 'var_imagePathPrefix', imgFolderPath + '/')
  proc.setParameter(null, 'var_logoFolder', imgFolders['Katalog'] + '/')
  proc.setParameter(null, 'var_QRCodeFolder', imgFolders['QR'] + '/')
  proc.setParameter(null, 'var_productImageFolder', imgFolders['ProductImage'] + '/')
  return proc.transformToFragment(xml)
}

const rebuildXML = function (xmlFilePath, xslFilePath, imgFolderPath, imgFolders) {
  const myXml = window.cep.fs.readFile(xmlFilePath).data
  const myXsl = window.cep.fs.readFile(xslFilePath).data

  const saxon = window.Saxon
  saxon.setLogLevel('FINEST')
  const xml = saxon.parseXML(myXml)
  const xsl = saxon.parseXML(myXsl)
  const proc = saxon.newXSLT20Processor(xsl)
  proc.setParameter(null, 'var_imagePathPrefix', imgFolderPath + '/')
  proc.setParameter(null, 'var_logoFolder', imgFolders['Katalog'] + '/')
  proc.setParameter(null, 'var_QRCodeFolder', imgFolders['QR'] + '/')
  proc.setParameter(null, 'var_productImageFolder', imgFolders['ProductImage'] + '/')
  return proc.transformToFragment(xml)
}

const buildCatalog = function (e) {
  e.preventDefault()
  const folders = checkImgFolder(imgFolderPath)
  const rebuiltXML = rebuildXML(xmlFilePath, xslFilePath, imgFolderPath, folders)
  const serializedXML = new XMLSerializer().serializeToString(rebuiltXML)
  const path = __dir + 'asd.xml'
  const result = window.cep.fs.writeFile(path, serializedXML)
  if (result.err !== 0) {
    console.log('error on saving: ' + result.err)
  }
  const csInterface = new CSInterface();
  csInterface.evalScript('main("'+ __dir + 'asd.xml' +'")', function(result){
    // alert(result)
  });
}

