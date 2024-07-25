"use client";
import "antd/dist/reset.css";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { featureFlag } from "./MyCustomLayout";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex w-[80vw] h-[80vh]">
      <div className="flex flex-col items-center justify-center bg-[#d4e7fa] py-20 m-auto rounded-md w-full">
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome to ProfileVerse
          </h1>
          <p className="text-xl mb-8 text-center px-4">
            Effortlessly evaluate candidate profiles.
          </p>
          <div className="flex space-x-8">
            <div
              className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={() => router.push("/github")}
            >
              <GithubOutlined
                className="text-5xl sm:text-6xl"
                style={{ color: "#333" }}
              />
            </div>
            {/* {
              <div
                className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out"
                onClick={() => router.push("/linkedin")}
              >
                <LinkedinOutlined
                  className="text-5xl sm:text-6xl"
                  style={{ color: "#0077B5" }}
                />
              </div>
            } */}
          </div>
        </div>
      </div>
    </div>
  );
}
