// External Dependencies
import React from 'react'
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const Footer = styled.footer`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  background-color: #fbfafc;
  box-sizing: border-box;
  display: flex;
  height: 64;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 2rem;
  border-top: 4px solid #2D456F;
  box-shadow: -2px 0 5px #444;
`;

const FooterLink = styled.a`
  margin-left: 0.25rem;
  text-shadow: none;
`;

// Component Definition
export default () =>
  <Footer>
    <div>Copyright &copy; 2016-2018 | Texas Music Administrators Conference</div>
    <div>Design by
      <FooterLink href="http://www.drumsensei.com">Drumsensei Media</FooterLink>
    </div>
  </Footer>
