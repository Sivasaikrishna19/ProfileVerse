// src/app/MyCustomLayout.tsx
"use client";
import { useRouter } from "next/router";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSelectedKey from "@/hooks/useSelectedKey";

// import { useRouter } from 'next/router';

const { Content, Footer, Sider } = Layout;

export default function MyCustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const pathname = usePathname();
  const selectedKey = useSelectedKey();

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken: any) => {
          //   console.log(broken);
        }}
        onCollapse={(collapsed: any, type: any) => {
          //   console.log(collapsed, type);
        }}
      >
        <div className="flex items-center justify-center py-4 text-[24px]">
          ProfileVerse
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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
