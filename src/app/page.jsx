import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Welcome to pripearl</h1>
      <Link href="/admin/login"><Button>Admin Login</Button></Link>
      
    </div>
  )
}

export default page
