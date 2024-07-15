"use client";

import React, { useState, useEffect } from 'react';

import { Grid, Container, Typography, Dialog, DialogContent, DialogContentText, DialogActions, Button, Card, CardMedia } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';

import EachProduct from './EachProduct';

import 'react-toastify/dist/ReactToastify.css';

import useVerifyToken from '../(dashboard)/VerifyToken';

const ProductDisplay = () => {
  const [cart, setCart] = useState([]);
  const { products } = useVerifyToken();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(); // State to track selected image index

  const add2Cart = (id) => {

    if (!cart.includes(id)) {
      const newCart = [...cart, id];

      console.log(newCart);
      setCart(newCart);
      localStorage.setItem("pripearl_cart", JSON.stringify(newCart));
      toast.success("Product added to cart successfully");

      // Dispatch a custom event when the cart is updated
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.info(`Product already exists in cart.`);
    }
  };

  const details = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.images[0].image1.secure_url);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setSelectedImage(null);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("pripearl_cart"));

    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    console.log(imageUrl);
  };

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" component="div" sx={{ mt: 4, color: "#222", fontWeight: "600", textAlign: 'center' }}>
        NEW COLLECTION
      </Typography>
      <Typography variant="p" component="div" sx={{ mb: 4, fontWeight: "400", color: "gray", textAlign: 'center' }}>
        Discover our latest bead collection, where timeless elegance meets modern design, creating the perfect blend of classic and contemporary styles.
      </Typography>
      <Grid container spacing={2}>
        {!products.length == 0 ? products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <EachProduct
              id={product._id}
              category={product.category}
              image={product.images[0].image1.secure_url}
              name={product.productName}
              description={product.description}
              price={product.price}
              add2Cart={add2Cart}
              details={() => details(product)}
            />
          </Grid>
        )) : <Typography variant="p" component="div" sx={{ fontWeight: "500", my: 8, width: "100%", textAlign: 'center' }}>No products available.</Typography>}
      </Grid>

      {selectedProduct && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  {selectedProduct.images[0].image1 && (
                    <CardMedia
                      component="img"
                      image={selectedProduct.images[0].image1.secure_url}
                      alt={selectedProduct.productName}
                      onClick={() => handleImageClick(selectedProduct.images[0].image1.secure_url)}
                      style={{ cursor: 'pointer', height: 100, objectFit: 'cover', borderRadius: "10px", margin: "8px 0" }}
                    />
                  )}
                  {selectedProduct.images[0].image2 && (
                    <CardMedia
                      component="img"
                      image={selectedProduct.images[0].image2.secure_url}
                      alt={selectedProduct.productName}
                      onClick={() => handleImageClick(selectedProduct.images[0].image2.secure_url)}
                      style={{ cursor: 'pointer', height: 100, objectFit: 'cover', borderRadius: "10px", margin: "8px 0" }}
                    />
                  )}
                  {selectedProduct.images[0].image3 && (
                    <CardMedia
                      component="img"
                      image={selectedProduct.images[0].image3.secure_url}
                      alt={selectedProduct.productName}
                      onClick={() => handleImageClick(selectedProduct.images[0].image3.secure_url)}
                      style={{ cursor: 'pointer', height: 100, objectFit: 'cover', borderRadius: "10px", margin: "8px 0" }}
                    />
                  )}
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <img
                  src={selectedImage}
                  alt={selectedProduct.productName}
                  style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
                />
                <Typography variant="h4" component="div" sx={{ mt: 2, textTransform: "capitalize", fontWeight: "bold" }}>
                  {selectedProduct.productName}
                </Typography>

                <Typography variant="body1" component="div" sx={{ my: 2, fontWeight: "bold", fontSize: "25px" }}>
                  ₦{selectedProduct.price}
                </Typography>
                <DialogContentText>
                  {selectedProduct.description}
                </DialogContentText>
                <Typography variant="body2" color="textSecondary" component="p" sx={{ mt: 2 }}>
                  Category: <span className='capitalize'>{selectedProduct.category}</span>
                </Typography>

                <Button onClick={() => add2Cart(selectedProduct._id)} variant="contained" color="primary" sx={{ mt: 2 }}>
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default ProductDisplay;
