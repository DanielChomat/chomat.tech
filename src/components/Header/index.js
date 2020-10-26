import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Header = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const HeaderContainer = styled.nav`
    position: absolute;
    width: 100%;
    height: 80px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    padding-right: 2rem;
    padding-left: 2rem;

    .header__logo {
      font-size: 4rem;
    }
  `

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }

  return (
    <HeaderContainer>
      <Link to={"/"} className={"header__logo"}>
        <span role={"img"} aria-label={"Shaka!"}>
          🤙
        </span>
      </Link>
      <ul>
        <li>
          <Link to={"#words"}>Words</Link>
        </li>
        <li>
          <Link to={"#experience"}>Experience</Link>
        </li>
        <li>
          <Link to={"#projects"}>Projects</Link>
        </li>
        <li>
          <Link to={"/blog"}>Blog</Link>
        </li>
      </ul>
    </HeaderContainer>
  )
}

export default Header
