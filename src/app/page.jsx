"use client";

import React, { useState } from 'react';

import Nav from './__component/Nav';
import HeroCarousel from './__component/Hero';
import ProductDisplay from './__component/ProductDisplay';

import '@fontsource/poppins';

const Page = () => {


  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Nav />
      <div className='w-[96%] m-auto'>
        <HeroCarousel />
      </div>
      <ProductDisplay />
    </div>
  );
};

export default Page;
