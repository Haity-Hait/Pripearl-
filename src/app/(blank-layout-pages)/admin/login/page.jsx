"use client";

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Login from '@views/Login';

const LoginPage = () => {
  const [mode, setMode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMode = async () => {
      const response = await fetch('/api/get-mode');
      const data = await response.json();

      setMode(data.mode);
    };

    fetchMode();

    // if (localStorage.getItem("token")) {
    //   router.push("/admin/dashboard");
    // }
  }, [router]);

  // if (mode === null) return <div>Loading...</div>;

  return <Login mode={mode} />;
};

export default LoginPage;
