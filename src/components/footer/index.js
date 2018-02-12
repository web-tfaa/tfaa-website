// External Dependencies
import React from 'react'
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const Footer = styled.footer`
  align-items: center;
  background-color: #efefef;
  box-sizing: border-box;
  display: flex;
  height: 64;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 2rem;
  border-top: 4px solid #2D456F;
  box-shadow: -3px 0 5px #2D456F;
`;

const PageLink = styled(Link)`
  margin-left: 0.8rem;
`;

const TmacTitle = styled.span`
  margin-left: 0.8rem;
`;

const LinkWrapper = styled.span`
  justify-content: space-between;
`;

// Component Definition
export default () =>
  <Footer>
    Copyright &copy; 2016-2018 Texas Music Administrators Conference
  </Footer>
