// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import { options } from '../../utils/typography';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Local Variables
const paddingStyles = {
  paddingLeft: 16,
};

const officerStyles = {
  paddingLeft: 32,
};

const FuturaSection = ({ children }) => (
  <section
    css={{
      fontFamily: options.headerFontFamily.join(`,`),
      lineHeight: '1.6',
    }}>
    {children}
  </section>
);
FuturaSection.propTypes = {
  children: PropTypes.element.isRequired,
};

// Component Definition
const Constitution = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Constitution and Bylaws</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      <Container>
        <h1>
          Constitution and Bylaws of Texas Music Administrators Conference
        </h1>
        <CardHeadline>ARTICLE I &mdash; ORGANIZATION</CardHeadline>

        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Name</dt>
            <dd css={paddingStyles}>
              The name of the organization shall be the&nbsp;
              <span css={{ fontWeight: 600 }}>
                Texas Music Administrators Conference.
              </span>
            </dd>
            <dt>Section 2 &mdash; Purpose</dt>
            <dd css={paddingStyles}>
              The Texas Music Administrators Conference is organized exclusively
              for charitable, scientific and educational purposes, more
              specifically to promote and support music education and music
              educators through collaboration, networking, and the sharing of
              best practices so that every child in Texas is assured of
              receiving quality instruction in the understanding, appreciation,
              and performance of music.
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE II &mdash; MEMBERSHIP</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Membership</dt>
            <dd css={paddingStyles}>
              Membership in this organization shall be open to all individuals
              who are currently serving in any administrative capacity, retired
              from such an administrative position, or interested in
              administration related to music education programs at any level.
              Membership shall be designated as “Active” or “Retired” as
              appropriate to the employment status of the member.
            </dd>
            <dt>Section 2 &mdash; Annual dues</dt>
            <dd css={paddingStyles}>
              A registration fee of $50 (Active Member) or $30 (Retired Member)
              per year shall entitle an individual to full membership in the
              Texas Music Administrators Conference. A majority vote of the
              members present at a regular meeting of the full membership is
              required to change these amounts. Continued membership is
              contingent upon being up-to-date on annual membership
              registration.
            </dd>
            <dt>Section 3 &mdash; Rights of members</dt>
            <dd css={paddingStyles}>
              Each member in good standing shall be eligible to vote on actions
              before the full membership, to vote for candidates for the
              executive board, serve on committees and bring business before the
              general membership.
            </dd>
            <dt>Section 4 &mdash; Non-voting membership</dt>
            <dd css={paddingStyles}>
              The non-voting membership categories must be adopted by the Board
              of Directors and proposed as an amendment to these by-laws to the
              membership as outlined in Article VI.
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE III &mdash; MEETINGS OF MEMBERS</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Fall Retreat</dt>
            <dd css={paddingStyles}>
              A fall retreat for the members shall be held annually. The
              specific date, time and location of the retreat will be designated
              by the President.
            </dd>
            <dt>Section 2 &mdash; Annual meeting</dt>
            <dd css={paddingStyles}>
              Meeting(s) of the membership shall take place during the Texas
              Music Educators Association Conference in the designated
              conference city. The specific dates, times and locations of these
              meetings will be designated by the President.
            </dd>
            <dt>Section 3 &mdash; Special meetings</dt>
            <dd css={paddingStyles}>
              Special meetings may be called by the President when it is deemed
              to be in the best interest of the organization.
            </dd>
            <dt>Section 4 &mdash; Notice of meetings</dt>
            <dd css={paddingStyles}>
              Written notice of each meeting shall be sent to the membership via
              e-mail, and posted on the web site, not less than two weeks prior
              to the meeting.
            </dd>
            <dt>Section 5 &mdash; Quorum</dt>
            <dd css={paddingStyles}>
              The members present at any properly announced meeting shall
              constitute a quorum.
            </dd>
            <dt>Section 6 &mdash; Voting</dt>
            <dd css={paddingStyles}>
              All issues to be voted on shall be duly moved and seconded prior
              to the call for a vote. Each vote shall be decided by a simple
              majority of those present at the meeting in which the vote takes
              place. A voice or hand vote is acceptable for issues except the
              election of officers. A written ballot may be taken on any issue
              at the discretion of the chair or the Board of Directors.
            </dd>
            <dt>Section 7 &mdash; Order of Business</dt>
            <dd css={paddingStyles}>
              The order of business for board and general membership meetings
              shall be conducted according to Robert’s Rules of Order and follow
              the general outline below:
              <ol>
                <li>Introductions – Roll Call</li>
                <li>Adoption of the Minutes of the preceding meeting.</li>
                <li>Reports of Committees.</li>
                <li>Old and Unfinished Business.</li>
                <li>New Business.</li>
                <li>Announcements for the Good of the Order.</li>
                <li>Adjournment.</li>
              </ol>
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE IV &mdash; BOARD OF DIRECTORS</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Board Role, Size, Compensation</dt>
            <dd css={paddingStyles}>
              The Board of Directors is responsible for overall policy and
              direction of the organization, and may delegate responsibility for
              day-to-day operations to individual board members and committees.
              The Board shall have up to 5 members. The board receives no
              compensation other than reasonable expenses.
            </dd>
            <dt>Section 2 &mdash; Terms</dt>
            <dd css={paddingStyles}>
              All board members shall serve a one-year term in each board
              positions in the following sequence: Secretary, Treasurer,
              Vice-President, President and Past President.
            </dd>
            <dt>Section 3 &mdash; Meetings</dt>
            <dd css={paddingStyles}>
              The Board of Directors shall meet at least twice per year, at an
              agreed upon time and place, in conjunction with the general
              membership meetings.
            </dd>
            <dt>Section 4 &mdash; Board Elections</dt>
            <dd css={paddingStyles}>
              New directors and current directors shall be elected or re-elected
              by the voting members at the annual meeting. Directors will be
              elected by a simple majority of members present at the annual
              meeting on a written ballot. Unopposed candidates may be elected
              through a voice vote, by consensus of the members present.
            </dd>
            <dt>Section 5 &mdash; Election Procedures</dt>
            <dd css={paddingStyles}>
              A Nominating Committee, chaired by the Vice-President, shall be
              responsible for presenting a slate of prospective Secretary
              candidates to the Board. In addition, any member may nominate a
              candidate to the slate of nominees from the floor.
            </dd>
            <dt>Section 6 &mdash; Officers and Duties</dt>
            <dd css={paddingStyles}>
              There shall be five officers of the Board of Directors consisting
              of a President, Vice-President, Past President, Treasurer, and
              Secretary. Their duties are as follows:
            </dd>
            <dd css={officerStyles}>
              The <em>President</em> shall convene regularly scheduled Board
              meetings, shall preside or arrange for other directors to preside
              at each meeting in the following order: Vice-President, Past
              President, Treasurer, Secretary.
            </dd>
            <dd css={officerStyles}>
              The <em>Vice-President</em> will chair the nominating committee,
              the recognitions committee and any committees on special subjects
              as designated by the Board of Directors.
            </dd>
            <dd css={officerStyles}>
              The <em>Past President</em> will chair any committees on special
              subjects as designated by the Board of Directors.
            </dd>
            <dd css={officerStyles}>
              The <em>Treasurer</em> shall make a report at each Board and
              General Membership meeting regarding the finances of the
              organization, assist in the preparation of the budget, help
              develop fundraising plans, execute payment for all expenses
              authorized by the Board and make financial information available
              to members.
            </dd>
            <dd css={officerStyles}>
              The <em>Secretary</em> shall be responsible for keeping records of
              Board and Membership actions, including overseeing the taking of
              minutes at all meetings of the Executive Board and General
              Membership, sending out meeting announcements, distributing copies
              of minutes and the agenda to each member, and assure that
              membership records are accurately maintained.
            </dd>
            <dt>Section 7 &mdash; Vacancies</dt>
            <dd css={paddingStyles}>
              When a vacancy on the Board of Directors exists, the remaining
              Board members shall have the authority to appoint a replacement
              from the current membership. Such appointments shall last only to
              the end of the particular Board members regular term.
            </dd>
            <dt>Section 8 &mdash; Resignation and Termination</dt>
            <dd css={paddingStyles}>
              Resignation from a Board must be in writing and received by the
              President. A Board member may be removed for other reasons by a
              two-third vote of the remaining directors.
            </dd>
            <dt>Section 9 &mdash; Special Meetings</dt>
            <dd css={paddingStyles}>
              Special meetings of the Board of Directors shall be called at the
              request of the President as deemed necessary to conduct the
              business of the organization.
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE V &mdash; COMMITTEES</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Committee Formation</dt>
            <dd css={paddingStyles}>
              The Board may create committees as needed, such as fundraising,
              nominating, data collection, etc. The President appoints all
              committee chairs.
            </dd>
            <dt>Section 2 &mdash; Finance Committee</dt>
            <dd css={paddingStyles}>
              The Treasurer will chair the Finance Committee, which includes two
              other Board members. The Finance Committee is responsible for
              developing and reviewing fiscal procedures and annual budget. The
              Board of Directors must approve the budget, and all expenditures
              must be within the budget. Any major change in the budget must be
              approved by the Board. The fiscal year shall run April 1 to March
              30 annually. Annual reports are required to be submitted to the
              Board showing income, expenditures and pending income. The
              financial records of the organization are public information and
              shall be made available to the membership, Board members and the
              public.
            </dd>
            <dt>Section 3 &mdash; Nominating Committee</dt>
            <dd css={paddingStyles}>
              The Vice-President will chair the nominating committee and will
              invite active members to serve on this committee as directed by
              the President. The committee shall contact all possible nominees
              to determine their willingness to serve. A slate, containing the
              name of one or more active members who have agreed to run for the
              Secretary position must be presented to the Board for ratification
              prior to placing the election on a meeting agenda for the members.
              The committee members shall serve as the election officials,
              should a written ballot be taken on the election of the new board
              member.
            </dd>
            <dt>Section 4 &mdash; Recognitions Committee</dt>
            <dd css={paddingStyles}>
              The Vice-President will chair the recognitions committee and
              invite no less than 2 active members to serve on this committee
              prior to the Fall Retreat. This committee will be charged with the
              task of soliciting nominations for “Outstanding Administrator”
              from the general Texas Music Educators Association Membership.
              From those TMAC members in good standing who are nominated, the
              committee will recommend a single honoree to the Board for
              approval. The honoree will be announced at the conclusion of the
              Fall Retreat and a formal presentation will be coordinated with
              the TMEA board during a general session at the February
              conference.
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE VI &mdash; AMENDMENTS</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Amendments</dt>
            <dd css={paddingStyles}>
              These Bylaws may be amended, when necessary, by a two-thirds
              majority of the membership present and voting at a regular
              meeting. Proposed amendments must be submitted to the Secretary to
              be sent out to all members, prior to the meeting, with regular
              Membership meeting announcements.
            </dd>
          </dl>
        </FuturaSection>

        <CardHeadline>ARTICLE VII &mdash; STANDING RULES</CardHeadline>
        <FuturaSection>
          <dl css={paddingStyles}>
            <dt>Section 1 &mdash; Memorials</dt>
            <dd css={paddingStyles}>
              At the passing of a current or former TMAC member, the
              organization will make the donation of a sum not to exceed $500
              per individual, to be designated by the Executive Board, to the
              Texas Music Educators Association Scholarship Fund in memory of
              the individual, their service to music education and their
              participation in TMAC.
            </dd>
          </dl>
        </FuturaSection>

        <FuturaSection>
          <em>
            These Bylaws were originally approved at a meeting of the Texas
            Music Administrators Conference membership on February 15, 2008.
            These by-laws were amended on November 21, 2013 and again on
            February 12, 2014.
          </em>
        </FuturaSection>
        {/* Mobile sidebar */}
        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}>
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
          <SidebarBody inline yaml={aboutSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

Constitution.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default Constitution;
