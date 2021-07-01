import styled from "styled-components"

export const Flex = styled.div`
  display: flex;
  justify-content: ${prop => prop.justifyContent ?? "stretch"};
  align-items: ${prop => prop.alignItems ?? "stretch"};
  flex-direction: ${prop => prop.flexDirection ?? "row"};
  flex-wrap: ${prop => prop.flexWrap ?? "wrap"};
`
