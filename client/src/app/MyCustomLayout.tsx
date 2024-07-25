"use client";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import "antd/dist/reset.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSelectedKey from "@/hooks/useSelectedKey";

const { Content, Footer, Sider } = Layout;
export const featureFlag = process.env.NODE_ENV === "production" ? false : true;

export default function MyCustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const items = featureFlag
    ? [
        {
          key: "1",
          icon: <GithubOutlined />,
          label: <Link href="/github">GitInsight</Link>,
        },
        // {
        //   key: "2",
        //   icon: <LinkedinOutlined />,
        //   label: <Link href="/linkedin">LinkedInLens</Link>,
        // },
      ]
    : [
        {
          key: "1",
          icon: <GithubOutlined />,
          label: <Link href="/github">GitInsight</Link>,
        },
        // {
        //   key: "2",
        //   icon: <LinkedinOutlined />,
        //   label: <Link href="/linkedin">LinkedInLens</Link>,
        // },
      ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const selectedKey = useSelectedKey();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="flex items-center justify-center py-4 text-[24px] text-white cursor-pointer"
          onClick={() => {
            navigateToPage("/");
          }}
        >
          ProfileVerse
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKey!]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0", overflow: "auto" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "calc(100vh - 88px)", // Adjust the height to ensure footer visibility
              overflow: "auto",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#f0f2f5",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              Created by ©<b>NSSK</b>
            </div>
            <div style={{ marginLeft: "20px", display: "flex", gap: "20px" }}>
              <a
                href="https://github.com/sivasaikrishna19"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
              >
                <GithubOutlined />
              </a>
              <a
                href="https://linkedin.com/in/nssk"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "20px" }}
              >
                <LinkedinOutlined />
              </a>
            </div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}
