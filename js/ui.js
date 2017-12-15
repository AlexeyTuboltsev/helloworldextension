const chooseFile = function (e, maySelectFolders, fileTypes){
  e.preventDefault()
  const id = e.target.id
  const inputElement =  document.getElementById(id +'-text')
  const fileSelectorData = window.cep.fs.showOpenDialog(false, maySelectFolders, 'hey',"", fileTypes)
  const selectedFile = fileSelectorData.data

  if(selectedFile.length){
    inputElement.value = selectedFile[0]

  }
}

const chooseImgFolder = function(e){
  const maySelectFolders = true
  return chooseFile(e, maySelectFolders, [])
}
const chooseXml = function (e){
  const maySelectFolders = false
  const fileTypes = ['xml']
  return chooseFile(e, maySelectFolders,fileTypes)
}
