import { React } from "react";
import Image from "next/image";
import logo from "../public/logo.svg";

import Box from "@material-ui/core/Box";

export default function Index() {
  return (
    <>
      <Box display="flex" justifyContent="center" p={2}>
        <Image src={logo} alt="Site Logo" />
      </Box>
    </>
  );
}
