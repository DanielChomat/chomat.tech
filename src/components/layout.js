import React from "react"
import styled from "styled-components"

import Footer from "./Footer"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"

const Main = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Layout = ({ location, title, children }) => {
  return (
    <>
      <GlobalStyles />
      <Header location={location} title={title} />
      <Main>
        {children}

        <Footer />
      </Main>
    </>
  )
}

export default Layout
