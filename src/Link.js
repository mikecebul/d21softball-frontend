// Plain JS version + prop-types
// Thanks to @IvanAdmaers

import PropTypes from "prop-types";
import { forwardRef } from "react";
import NextLink from "next/link";
import { Link as MuiLink } from "@material-ui/core";

const Link = forwardRef(({ href, as, prefetch, ...props }, ref) => {
  return (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <MuiLink ref={ref} {...props} />
    </NextLink>
  );
});

Link.displayName = "Link";

Link.defaultProps = {
  href: "#",
  prefetch: false,
};

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default Link;
