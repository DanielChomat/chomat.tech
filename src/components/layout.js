import React from "react"
import { ThemeProvider } from "styled-components"

import Footer from "./Footer"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"
import theme from "../styles/theme"
import { Main } from "../styles/Layout"

const Layout = ({ location, title, children }) => {
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

export default Layout
