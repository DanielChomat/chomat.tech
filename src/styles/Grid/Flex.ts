import styled from "styled-components";
import { flexbox } from "styled-system";
import { Property } from "csstype";

export interface FlexProps {
  readonly justifyContent?: Property.JustifyContent;
  readonly alignItems?: Property.AlignItems;
  readonly flexDirection?: Property.FlexDirection;
  readonly flexWrap?: Property.FlexWrap;
  readonly gap?: Property.Gap;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${prop => prop.justifyContent ?? "stretch"};
  align-items: ${prop => prop.alignItems ?? "stretch"};
  flex-direction: ${prop => prop.flexDirection ?? "row"};
  flex-wrap: ${prop => prop.flexWrap ?? "wrap"};
  gap: ${prop => prop.gap ?? 0};
  ${flexbox}
`
