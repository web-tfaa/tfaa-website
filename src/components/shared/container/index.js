// External Dependencies
import React from "react"
import styled from 'styled-components'

// Internal Dependencies
import presets from "../../../utils/presets"
import { rhythm, scale, options } from "../../../utils/typography"

// Local Variables
const Container = styled.div`
  max-width: ${props => props.hasSideBar ? rhythm(presets.maxWidthWithSidebar) : rhythm(presets.maxWidth)};
  margin: 0 auto;
  padding: ${rhythm(1.5)} ${rhythm(options.blockMarginBottom)};
  padding-bottom: ${rhythm(3.5)};
  position: relative;
  ${presets.Tablet}: {
    paddingBottom: ${rhythm(1.5)};
  }
`;

// Component Definition
export default ({ children, className, hasSideBar = true, css = {} }) => (
  <Container className={className}>
    {children}
  </Container>
)
