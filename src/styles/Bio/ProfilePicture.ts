import styled from "styled-components"

export const ProfilePicture = styled.div`
  --square-profile-picture-dimension: 22rem;

  @media only screen and (max-width: 567px) {
    --square-profile-picture-dimension: 14rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  max-width: var(--square-profile-picture-dimension, 14rem);
  max-height: var(--square-profile-picture-dimension, 14rem);
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`
