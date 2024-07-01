"use client";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import "antd/dist/reset.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSelectedKey from "@/hooks/useSelectedKey";

const { Content, Footer, Sider } = Layout;

export default function MyCustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };
  const items = [
    {
      key: "1",
      icon: <GithubOutlined />,
      label: <Link href="/github">GitInsight</Link>,
    },
    {
      key: "2",
      icon: <LinkedinOutlined />,
      label: <Link href="/linkedin">LinkedIn</Link>,
    },
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
        <Footer style={{ textAlign: "center" }}>
          Created by ©<b>NSSK</b>
        </Footer>
      </Layout>
    </Layout>
  );
}
