'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteIcon from '@mui/icons-material/Delete'

const FormLayoutsBasic = () => {
  // States
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const handleImageChange = (e) => {
    if (e.target.files.length + images.length > 3) {
      alert('You can only upload up to 3 images')
      return
    }
    setImages(prevImages => [...prevImages, ...Array.from(e.target.files)])
  }

  const handleImageDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      productName,
      price,
      description,
      images
    }
    console.log(formData)
  }
  const selectImage = (e) => {
    e.preventDefault()
    document.querySelector('input[type="file"]').click()

  }
  return (
    <Card>
      <CardHeader title='Post a Product' />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Product Name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Price'
                placeholder='Amount in naira'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={(e) => selectImage(e)} variant='contained' type='submit'>
                Select Images
              </Button>
              <input
                accept="image/*"
                type='file'
                multiple
                hidden
                onChange={handleImageChange}
              />
              {images.length > 0 && (
                <div>
                  {images.map((image, index) => (
                    <div key={index} style={{ display: 'inline-block', position: 'relative', marginTop: "20px", marginRight: 10 }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product Image ${index + 1}`}
                        style={{ width: "200px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                      />
                      <IconButton
                        style={{ position: 'absolute', color: "#8C57FF", top: 0, right: 0 }}
                        onClick={() => handleImageDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                rows={4}
                multiline
                label='Description'
                placeholder='Your perfect pack for everyday use and walks in the forest.'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className='flex items-center justify-between flex-wrap gap-5'>
                <Button variant='contained' onClick={handleSubmit} type='submit'>
                  Create Product
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
