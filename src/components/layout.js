import React from "react"
import styled from "styled-components"

import Footer from "./Footer"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"

const Layout = ({ location, title, children }) => {
  const Main = styled.main`
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `

  return (
    <>
      <GlobalStyles />
      <Header location={location} title={title} />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
