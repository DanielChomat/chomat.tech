import React from "react"

import { rhythm } from "../utils/typography"
import Footer from "./Footer"
import Header from "./Header"
import GlobalStyles from "../styles/GlobalStyles"

const Layout = ({ location, title, children }) => {
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header location={location} title={title} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
