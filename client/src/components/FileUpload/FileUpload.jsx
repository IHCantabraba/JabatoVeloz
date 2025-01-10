import React from 'react'
import { Button } from '@mui/material'
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
