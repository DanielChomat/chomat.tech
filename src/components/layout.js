import React from "react"
import styled from "styled-components"

import Footer from "./Footer"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"

const Main = styled.main`
  min-height: 100%;
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
  padding-top: 16vh;
  gap: 3.6rem;

  display: flex;
  //justify-content: flex-start;
  flex-direction: column;
`

const Layout = ({ location, title, children }) => {
  return (
    <>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
      />
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
