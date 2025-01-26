"use client";


import React, { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import axios from "axios";

const useVerifyToken = () => {
  const [expired, setExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [verifyData, setVerifyData] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useRouter();
  const pathname = usePathname(); // Get the current pathname

  // Function to log out the user
  const logOut = () => {
    localStorage.removeItem("token");

    // Only redirect to login if the user is not on the '/' page

    if (pathname !== '/') {
      navigate.push("/admin/login");
    }
  };

  // Function to verify the token
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        logOut();

        return;
      }

      const response = await axios.get("https://pripeal.affi9ja.com/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const verificationData = response.data.data;

      if (response.data && verificationData) {
        setVerifyData(verificationData);
        setEmail(verificationData.email);
        setExpired(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setExpired(error.response.data.message);
        logOut();
      }
    }
  };

  const userEmail = "prinpearlsbeads@gmail.com"

  const fetchData = async () => {
    try {
      if (userEmail) {
        const response = await axios.get(`https://pripeal.affi9ja.com/getall-product/${userEmail}`);

        setProducts(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { verifyData, expired, logOut, products };
};

export default useVerifyToken;
