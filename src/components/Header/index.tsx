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

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to={"/"} className={"header__logo"}>
        <span role={"img"} aria-label={"Shaka!"}>
          🤙
        </span>
      </Link>
    </HeaderContainer>
  )
}
