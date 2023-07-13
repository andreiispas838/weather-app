import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { AccordionItemButton } from "react-accessible-accordion";
import { jumpAnimation, shakeAnimation, trembleAnimation } from "../services/animations";

export const StyledAccordionItemButton = styled(AccordionItemButton)(() => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const StyledMititeiPercentage = styled(Typography)(({ theme, percentage }) => ({
  animation: percentage >= 75 ? `${shakeAnimation} 0.8s infinite` : percentage >= 50 ? `${trembleAnimation} 0.8s infinite` : `${jumpAnimation} 0.8s infinite`,
}));