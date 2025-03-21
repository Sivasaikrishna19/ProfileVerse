"use client";
import "antd/dist/reset.css";
import {
  GithubOutlined,
  LinkedinOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex w-[80vw] h-[80vh]">
      <div className="flex flex-col items-center justify-center bg-[#d4e7fa] py-5 m-auto rounded-md w-full">
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Welcome to <span className="text-blue-600">ProfileVerse</span>
          </h1>
          <p className="text-xl text-center px-6 text-gray-700">
            Evaluating early-career candidates based on real contributions, not
            just keywords.
          </p>

          {/* Unified Information Section */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why ProfileVerse & How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Traditional hiring methods rely on resume keyword matching. <br />
              <span className="font-semibold text-blue-600">
                ProfileVerse
              </span>{" "}
              changes this by assessing real contributions on GitHub and beyond.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Future integrations with{" "}
              <span className="font-semibold">LinkedIn</span> and{" "}
              <span className="font-semibold">LeetCode</span> APIs are planned!
            </p>

            <div className="mt-4 border-t border-gray-300 pt-4 text-left">
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>
                  Integrates with{" "}
                  <span className="font-semibold">GitHub APIs</span> to analyze
                  open-source contributions.
                </li>
                <li>
                  Uses <span className="font-semibold">LLMs</span> and{" "}
                  <span className="font-semibold">AWS</span> for end-to-end
                  evaluation.
                </li>
                <li>
                  Provides an{" "}
                  <span className="font-semibold">interactive leaderboard</span>{" "}
                  to prioritize candidate profiles.
                </li>
              </ul>
            </div>
          </div>

          {/* API Integration Section */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div
              className="flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out"
              onClick={() => router.push("/github")}
            >
              <GithubOutlined
                className="text-5xl sm:text-6xl"
                style={{ color: "#333" }}
              />
              <p className="text-sm text-gray-700 mt-2">GitHub Integrated</p>
            </div>

            <div className="flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-full shadow-lg cursor-not-allowed opacity-50">
              <LinkedinOutlined
                className="text-5xl sm:text-6xl"
                style={{ color: "#0077B5" }}
              />
              <p className="text-sm text-gray-700 mt-2">Coming Soon</p>
            </div>

            <div className="flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-full shadow-lg cursor-not-allowed opacity-50">
              <RocketOutlined
                className="text-5xl sm:text-6xl"
                style={{ color: "#ff9800" }}
              />
              <p className="text-sm text-gray-700 mt-2">LeetCode Future</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
