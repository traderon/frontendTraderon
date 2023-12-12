import { Link } from "react-router-dom";
import { ReactComponent as LogoFull } from "../../../../assets/logo/templogo.svg";
import { styled } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoFull height={28} />
    </LinkStyled>
  );
};

export default Logo;
