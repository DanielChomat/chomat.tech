import { ThemeProvider } from "styled-components";

import { Footer } from "./Footer";
import { Header } from "./Header";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import { Main } from "../styles/Layout";
import { PageProps } from "gatsby";
import { ReactNode } from "react";

type Props = {location: PageProps['location']; title: string; children: ReactNode}

export const Layout = ({ location, title, children }: Props) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header location={location} title={title} />
        <Main>
          {children}
          <Footer />
        </Main>
      </ThemeProvider>
    </>
  )
}
