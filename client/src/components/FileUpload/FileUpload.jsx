import React from 'react'
import { Button, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
const FileUpload = ({ fileInput }) => {
  return (
    <>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => fileInput.current.click()}
          startIcon={<CloudUploadIcon />}
        >
          upload file
        </Button>

        <input ref={fileInput} type='file' style={{ display: 'none' }} />
      </div>
    </>
  )
}

export default FileUpload

// import React, { useState } from 'react'
// import { MuiFileInput } from 'mui-file-input'
// import CloseIcon from '@mui/icons-material/Close'
// import AttachFileIcon from '@mui/icons-material/AttachFile'
// const FileUpload = ({ fileRef }) => {
//   const [value, setValue] = useState(null)

//   const handleChange = (newValue) => {
//     setValue(newValue)
//   }

//   return (
//     <MuiFileInput
//       inputProps={{ accept: 'image/png, image/gif, image/jpeg' }}
//       clearIconButtonProps={{
//         title: 'select',
//         children: <AttachFileIcon fontSize='small' />
//       }}
//       placeholder='select file'
//       inputRef={fileRef}
//       value={value}
//       onChange={handleChange}
//       size='small'
//       fullWidth
//     />
//   )
// }
// export default FileUpload
