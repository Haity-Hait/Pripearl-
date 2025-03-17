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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThreeCircles } from 'react-loader-spinner'

import useVerifyToken from '@/app/(dashboard)/VerifyToken'
import SelectableInput from '@/app/__component/SelectableInput'

const FormLayoutsBasic = () => {
  // States
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const { verifyData } = useVerifyToken()

  const handleImageChange = (e) => {
    if (e.target.files.length + images.length > 3) {
      toast.info('You can only upload up to 3 images')

      return
    }

    setImages(prevImages => [...prevImages, ...Array.from(e.target.files)])
  }

  const handleImageDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const convertToBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    if (images.length !== 3) {
      toast.info('Please upload exactly 3 images')
      setLoading(false)

      return
    }

    const base64Images = await Promise.all(images.map(image => convertToBase64(image)))

    const formData = {
      admin: verifyData.email,
      productName,
      price,
      description,
      category,
      image1: base64Images[0],
      image2: base64Images[1],
      image3: base64Images[2],
    }

    console.log(formData);

    try {
      const response = await fetch('https://pripeal.affi9ja.com/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData),
      })


      const data = await response.json()

      if (data.status) {
        toast.success(data.message)
        setLoading(false)
        setProductName("")
        setPrice("")
        setDescription("")
        setImages([])
      } else {
        toast.error(`${data.message}`)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Error creating product')
      setLoading(false)

    }
  }

  const selectImage = (e) => {
    e.preventDefault()
    document.querySelector('input[type="file"]').click()
  }

  const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'unisex', label: 'Unisex' },
  ];

  return (
    <Card>
      <ToastContainer />
      <CardHeader title='Post a Product' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Product Name*'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='number'
                label='Price*'
                placeholder='Amount in naira'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectableInput onChange={(e) => setCategory(e.target.value)} options={options} />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={selectImage} variant='contained'>
                Select Images*
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
                <Button variant='contained' type='submit'>
                  {loading ? <ThreeCircles
                    visible={true}
                    height="30"
                    width="100"
                    color="#fff"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                    : "Create Product"}
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
