"use client";

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

import { Button } from '@mui/material';

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

import useVerifyToken from '@/app/(dashboard)/VerifyToken';


// Vars



const Table = () => {
  const { products } = useVerifyToken()
  
  return (
    <Card>
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
          <tbody>
            {products ? products.map((row, index) => (
              <tr key={index}>
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
                  <Button>Edit</Button>
                  <Button>Del</Button>
                </td>
              </tr>
            )) :
              "No product to show"
            }
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default Table
