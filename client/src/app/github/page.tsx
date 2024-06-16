"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const page = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token: any = Cookies.get("access_token");
    setAccessToken(token || "No token found");
  }, []);

  useEffect(() => {
    console.log("token", accessToken);
  }, [accessToken]);

  return (
    <div>
      <h1>Github</h1>
      <p>Access Token: {accessToken}</p>
    </div>
  );
};

export default page;
