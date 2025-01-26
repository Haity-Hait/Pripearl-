"use client";

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  CardMedia,
  Skeleton,
  Box
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import EachProduct from './EachProduct';
import 'react-toastify/dist/ReactToastify.css';
import useVerifyToken from '../(dashboard)/VerifyToken';

const ProductDisplay = () => {
  const [cart, setCart] = useState([]);
  const { products, isLoading } = useVerifyToken(); // Assuming useVerifyToken returns isLoading
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(products);

  const add2Cart = (id) => {
    if (!cart.includes(id)) {
      const newCart = [...cart, id];
      setCart(newCart);
      localStorage.setItem("pripearl_cart", JSON.stringify(newCart));
      toast.success("Product added to cart successfully");
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.info("Product already exists in cart.");
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("pripearl_cart") || "[]");
    setCart(savedCart);
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={40} sx={{ mt: 1 }} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Empty state component
  const EmptyState = () => (
    <Box sx={{
      textAlign: 'center',
      py: 8,
      px: 2,
      bgcolor: '#f5f5f5',
      borderRadius: 2,
      mt: 4
    }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#666' }}>
        No Products Available
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Check back later for our latest collection of beautiful beads and accessories.
      </Typography>
    </Box>
  );

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" component="div"
        sx={{
          mt: 4,
          color: "#222",
          fontWeight: "600",
          textAlign: 'center'
        }}>
        NEW COLLECTION
      </Typography>
      <Typography variant="body1" component="div"
        sx={{
          mb: 4,
          fontWeight: "400",
          color: "gray",
          textAlign: 'center'
        }}>
        Discover our latest bead collection, where timeless elegance meets modern design,
        creating the perfect blend of classic and contemporary styles.
      </Typography>

      {isLoading ? (
        <LoadingSkeleton />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
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
          ))}
        </Grid>
      )}

      {selectedProduct && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#f5f5f5', p: 1 }}>
                  {['image1', 'image2', 'image3'].map((imageKey) => (
                    selectedProduct.images[0][imageKey] && (
                      <CardMedia
                        key={imageKey}
                        component="img"
                        image={selectedProduct.images[0][imageKey].secure_url}
                        alt={`${selectedProduct.productName} - ${imageKey}`}
                        onClick={() => handleImageClick(selectedProduct.images[0][imageKey].secure_url)}
                        sx={{
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: "10px",
                          my: 0.5,
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)'
                          }
                        }}
                      />
                    )
                  ))}
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <img
                  src={selectedImage}
                  alt={selectedProduct.productName}
                  style={{
                    width: '100%',
                    maxHeight: 400,
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    mt: 2,
                    textTransform: "capitalize",
                    fontWeight: "bold"
                  }}>
                  {selectedProduct.productName}
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    my: 2,
                    fontWeight: "bold",
                    color: 'primary.main'
                  }}>
                  ₦{selectedProduct.price.toLocaleString()}
                </Typography>

                <DialogContentText
                  sx={{
                    textTransform: "capitalize",
                    mb: 2
                  }}>
                  {selectedProduct.description}
                </DialogContentText>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{ mb: 2 }}>
                  Category: <span style={{ textTransform: 'capitalize' }}>{selectedProduct.category}</span>
                </Typography>

                <Button
                  onClick={() => add2Cart(selectedProduct._id)}
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 4
                  }}>
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: 2,
                textTransform: 'none'
              }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default ProductDisplay;

