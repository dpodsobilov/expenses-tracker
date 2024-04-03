import { Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkStyledProps {
  to: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
}

const styleLink: Record<string, string> = {
  fontSize: "1.2rem",
  textDecoration: "none",
  textTransform: "uppercase",
  color: "inherit",
  padding: "10px 10px",
  alignSelf: "center",
  borderRadius: "4px",
  backgroundColor: "#1976d2",
  boxShadow:
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
};

export const LinkStyled: FC<LinkStyledProps> = ({ to, onClick, children }) => {
  return (
    <Link to={to} style={styleLink} onClick={onClick}>
      <Typography>{children}</Typography>
    </Link>
  );
};
