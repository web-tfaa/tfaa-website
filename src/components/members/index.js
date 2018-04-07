// External Dependencies
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import CardHeadline from '../shared/cards/card-headline';
import Container from '../shared/container';
import FuturaParagraph from '../shared/futura-paragraph';
import SidebarBody from '../shared/sidebar/sidebar-body';
import presets from '../../utils/presets';

// Sidebar data
import membersSidebar from '../../pages/members/members-links.yml';

// Local Variables
const texasFlagRed = '#BF0A30';

// Local Styles
const rootStyles = {
  width: `0 auto`,
};

const titleStyles = {
  display: 'inline-block',
  borderBottom: 'solid 1px',
};

const contentStyles = {
  display: 'flex',
};

const paddingStyles = {
  paddingLeft: 16,
};

// Component Definition
class Members extends Component {
  state = {
    username: '',
    password: '',
  };

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    handleLogin(this.state);
  }

  render() {
    const membersContent = (
      <div>
        <h2 css={titleStyles}>
          Members
        </h2>
        <div css={contentStyles}>
          Our members promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.
        </div>

        <section
          className="members-constitution"
          css={{ marginTop: 36 }}
        >
          <CardHeadline>ARTICLE II &mdash; MEMBERSHIP</CardHeadline>
          <FuturaParagraph>(from the Texas Music Administrators Conference's <Link to="/about/constitution">Constitution and Bylaws</Link>)</FuturaParagraph>
          <FuturaParagraph>
            <dl css={paddingStyles}>
              <dt>Section 1 &mdash; Membership</dt>
              <dd css={paddingStyles}>
                Membership in this organization shall be open to all individuals who are currently serving in any administrative capacity, retired from such an administrative position, or interested in administration related to music education programs at any level. Membership shall be designated as “Active” or “Retired” as appropriate to the employment status of the member.
              </dd>
              <dt>Section 2 &mdash; Annual dues</dt>
              <dd css={paddingStyles}>
                A registration fee of $50 (Active Member) or $30 (Retired Member) per year shall entitle an individual to full membership in the Texas Music Administrators Conference. A majority vote of the members present at a regular meeting of the full membership is required to change these amounts. Continued membership is contingent upon being up-to-date on annual membership registration.
              </dd>
              <dt>Section 3 &mdash; Rights of members</dt>
              <dd css={paddingStyles}>
                Each member in good standing shall be eligible to vote on actions before the full membership, to vote for candidates for the executive board, serve on committees and bring business before the general membership.
              </dd>
              <dt>Section 4 &mdash; Non-voting membership</dt>
              <dd css={paddingStyles}>
                The non-voting membership categories must be adopted by the Board of Directors and proposed as an amendment to these by-laws to the membership as outlined in Article VI.
              </dd>
            </dl>
          </FuturaParagraph>
        </section>

        <hr />

        <section>
          <p>
            Complete the <strong>TMAC Membership Form</strong> below to join the Texas Music Administrators Conference and participate in our events.
          </p>

          <iframe
            allowfullscreen
            aria-label="Google Forms, TMAC Membership Form 2017-2018"
            css={{
              height: 600,
              width: '100%',
            }}
            data-iframe-loaded="true"
            frameborder="0"
            onload="this.setAttribute('data-iframe-loaded', true)"
            src="https://docs.google.com/forms/d/1uFOMrV52KJKXqO6ilM0Jern-suFxUfwGjjPgmGG6iOk/viewform?authuser=0&embedded=true"
          >
          </iframe>
        </section>

        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}
        >
          <hr css={{
            height: 6,
            border: 0,
            boxShadow: `inset 0 12px 12px -12px ${hex2rgba(texasFlagRed, 0.9)}`,
          }} />
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    );

    return (
      <div css={rootStyles}>
        <Container>
          <Helmet>
            <title>TMAC | Members</title>
          </Helmet>
          {membersContent}
        </Container>
      </div>
    );
  }
}

export default Members;
