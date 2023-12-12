import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import PageContainer from "../../components/container/PageContainer";
import AppbarAuth from "../../components/common/AppbarAuth";
import Sidebar from "../../components/sidebar/Sidebar";

export default function MainLayout({ title, children }) {
  return (
    <PageContainer title={title} description={`${title} page`}>
      <Sidebar />
      <AppbarAuth pagename={title} />
      <Stack direction="row" minHeight="100vh" width="100%">
        <Box width={{ xs: "55px", lg: "200px" }} />
        <Stack
          direction="column"
          width={{
            xs: "calc(100vw - 55px)",
            lg: "calc(100vw - 200px)",
          }}
        >
          <Box minHeight={64} />
          <Stack direction="row" padding={1}>
            {children}
          </Stack>
        </Stack>
      </Stack>
    </PageContainer>
  );
}
