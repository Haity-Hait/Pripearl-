"use client";

import React, { useState } from 'react';

import Nav from './__component/Nav';
import HeroCarousel from './__component/Hero';


const Page = () => {


  return (
    <div>
      <Nav />
      <div className='w-[96%] m-auto'>
        <HeroCarousel />
      </div>
    </div>
  );
};

export default Page;
