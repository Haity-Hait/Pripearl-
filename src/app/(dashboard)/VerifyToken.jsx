"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const useVerifyToken = () => {
  const [expired, setExpired] = useState(false);
  const [verifyData, setVerifyData] = useState();
  const [products, setProducts] = useState([]);

  const navigate = useRouter();

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate.push("/admin/login");
  };
  
  const fetchData = async () => {
    try {
      
      const response = await axios.get("https://pripeals-backend.onrender.com/getall-product");
      
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          LogOut();

          return;
        }

        const response = await axios.get("https://pripeals-backend.onrender.com/verify-token", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        console.log("response " + response);
        const gg = response.data.data;
        if (response.data && gg) {
          setVerifyData(gg);
          setExpired(false);

        }
      } catch (error) {
        if (error.response && error.response.data) {
          const tokenExpire = error.response?.data?.message;
          setExpired(tokenExpire);
          LogOut();
        }
      }
    };

    fetchData()
    verifyToken();
  }, []);

  return { verifyData, expired, LogOut, products };
};

export default useVerifyToken;
