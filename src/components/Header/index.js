import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderContainer = styled.nav`
  position: absolute;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  padding: 2.4rem 3rem;

  .header__logo {
    font-size: 4rem;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 4ch;

    li {
      a {
        font-size: 2.8rem;

        font-weight: 500;
      }
    }
  }
`

const Header = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

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
        <span role={"img"} aria-label={"Shaka!"} id={header}>
          🤙
        </span>
      </Link>
      {/*<ul>
        <li>
          <Link to={"#about"}>About</Link>
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
      </ul>*/}
    </HeaderContainer>
  )
}

export default Header
