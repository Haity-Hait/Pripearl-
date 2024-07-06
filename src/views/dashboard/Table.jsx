"use client";

import { useState, useEffect } from 'react';

// MUI Imports
import { Typography, Card, Button } from '@mui/material';

import Chip from '@mui/material/Chip';

// Third-party Imports
import classnames from 'classnames';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar';

// Styles Imports
import tableStyles from '@core/styles/table.module.css';

// Hooks Imports
import useVerifyToken from '@/app/(dashboard)/VerifyToken';

// React Imports


const Table = () => {
  const { products: initialProducts } = useVerifyToken();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const deleteProduct = (id) => {
    axios.post("https://pripeals-backend.onrender.com/delete-product", { id })
      .then((res) => {
        toast.success(res.data.message);
        setProducts(products.filter(product => product._id !== id));
      })

      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  const editProduct = (id) => {
    console.log(id);
  }

  return (
    <Card>
      <ToastContainer />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          {products && products.length > 0 ? (
            <tbody>
              {products
                .sort((a, b) => b.productName.localeCompare(a.productName))
                .map((row, index) => (
                  <tr key={row._id}>
                    <td className='!plb-1'>
                      <div className='flex items-center gap-3'>
                        <CustomAvatar src={row.images[0].image1.secure_url} size={34} />
                        <div className='flex flex-col'>
                          <Typography color='text.primary' className='font-medium'>
                            {row.productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.description}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <div className='flex gap-2'>
                        <Typography color='text.primary'>₦{row.price}.00</Typography>
                      </div>
                    </td>
                    <td className='!pb-1'>
                      <Button
                        onClick={() => editProduct(row._id)}
                        variant="contained"
                        sx={{
                          backgroundColor: '#FFEB3B',
                          color: 'black',
                          '&:hover': { backgroundColor: '#FFEB3B' },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteProduct(row._id)}
                        variant="contained"
                        sx={{
                          backgroundColor: '#F44336',
                          color: 'white',
                          '&:hover': { backgroundColor: '#F44336' },
                        }}
                      >
                        Del
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <Typography>No products to show</Typography>
          )}
        </table>
      </div>
    </Card>
  );
}

export default Table;
