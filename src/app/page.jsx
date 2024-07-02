import React from 'react'

import Link from 'next/link'

import { Button } from '@mui/material'

const page = () => {
  return (
    <div>
      <h1>Welcome to pripearl</h1>
      <Link href="/admin/login"><Button>Admin Login</Button></Link>
      
    </div>
  )
}

export default page
