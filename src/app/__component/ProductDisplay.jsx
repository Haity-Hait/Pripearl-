"use client";

import React, { useState, useEffect } from 'react';

import { Grid, Container, Typography } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';

import EachProduct from './EachProduct';

import 'react-toastify/dist/ReactToastify.css';

import useVerifyToken from '../(dashboard)/VerifyToken';


const ProductDisplay = () => {
  const [cart, setCart] = useState([]);
  const { products } = useVerifyToken()


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


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("pripearl_cart"));

    if (savedCart) {
      setCart(savedCart);
    }
  }, []);


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
            <EachProduct id={product._id} category={product.category} image={product.images[0].image1.secure_url} name={product.productName} description={product.description} price={product.price} add2Cart={add2Cart} />
          </Grid>
        )) : <Typography variant="p" component="div" sx={{ fontWeight: "500", my: 8, width: "100%", textAlign: 'center' }}>No products available.</Typography>}
      </Grid>
    </Container>
  );
};

export default ProductDisplay;
