import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Image from "next/image";
import logo from "../public/logo.svg";

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" p={2}>
        <Image src={logo} alt="Site Logo" />
      </Box>
    </Container>
  );
}
