import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { Footer } from "./Footer";
import { Header } from "./Header";

import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import { Main } from "../styles/Layout";

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Main>
        {children}
        <Footer />
      </Main>
    </ThemeProvider>
  )
}
