"use client";

import useVerifyToken from '../../VerifyToken';
import Table from '@/views/dashboard/Table'
import React from 'react'

const page = () => {
  const { verifyData, expired, LogOut } = useVerifyToken();

 
  if (expired) {
    return <div>You are currently logged out. Please <button style={{ textDecoration: "underline" }} onClick={LogOut}>Log in</button> back to continue your adventure.</div>;
  }

  return (
    <div>
      <Table />
    </div>
  )
}

export default page
