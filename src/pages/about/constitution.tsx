// External Dependencies
import { Box } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import Layout from '../../components/layout';
import MembershipByLaws from './MembershipByLaws';
import MobileDivider from '../../components/shared/MobileDivider';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.paddingMedium': {
    paddingLeft: theme.spacing(2),
  },
  '.paddingLarge': {
    paddingLeft: theme.spacing(4),
  },
  '.purposeSubGroup': {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(4),
  },
  '.purposeSubGroupLetter': {
    marginRight: theme.spacing(1),
  },
  '.strong': {
    fontWeight: 600,
  },
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  lineHeight: 1.6,
}));

// Component Definition
const Constitution: FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="Constitution and Bylaws"
  >
    <StyledRoot>
      <Container>
        <h1>BYLAWS OF TEXAS MUSIC ADMINISTRATORS CONFERENCE, INC.</h1>
        <Box mb={3}>
          <FuturaAnchor
            download
            href="https://res.cloudinary.com/tmac/image/upload/v1661895580/TMAC_Bylaws_-_Updated_7-22-22.pdf"
            rel="noreferrer noopener"
            target="_blank"
          >
            Download
          </FuturaAnchor>
        </Box>
        <CardHeadline>ARTICLE I &mdash; ORGANIZATION</CardHeadline>

        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Name</dt>
            <dd className="paddingMedium">
              The name of this Corporation shall be the{' '}
              <span className="strong">Texas Music Administrators Conference, Inc.</span>{' '}
              and is a nonprofit corporation as defined under Chapter 22 of the Texas Business
              Organizations Code.
            </dd>
            <dt>Section 2 &mdash; Purpose</dt>
            <dd className="paddingMedium">
              {`Beyond the general purposes of the Corporation described in its Certificate of
              Formation, the specific purposes for which the Corporation was formed are:`}
            </dd>
            <div className="purposeSubGroup">
              <span className="purposeSubGroupLetter">(a)</span>
              <dd>
                The Corporation is organized exclusively for charitable, scientific and
                educational purposes, more specifically to equip leaders
                to advance high quality fine arts education for all.
              </dd>
            </div>
            <div className="purposeSubGroup">
              <span className="purposeSubGroupLetter">(b)</span>
              <dd>
                To receive by gift, grant, devise, bequest or otherwise, and from any
                private or public sources, personal or real property, and to hold,
                administer, sell, invest, reinvest, manage, use, disburse and distribute,
                and apply the income and/or principal of the same in accordance with the
                directions and intent of the donor or donors of such property, or, in the
                absence of such directions, as the Corporation may deem best from time to
                time, for the promotion of any or all of the foregoing purposes.
              </dd>
            </div>
            <div className="purposeSubGroup">
              <span className="purposeSubGroupLetter">(c)</span>
              <dd>
                To do any and all things, either alone or in cooperation with other
                organizations or institutions, and either directly or by contribution to
                such other organizations or institutions, which it may deem necessary or
                proper in order to carry into effect any or all of the foregoing objects
                or purposes.
              </dd>
            </div>
          </dl>
        </section>

        <MembershipByLaws />

        <CardHeadline>ARTICLE III &mdash; MEETINGS OF MEMBERS</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Fall Retreat</dt>
            <dd className="paddingMedium">
              {`A fall retreat for the members shall be held annually. The specific date, time and
              location of the retreat will be designated by the President.`}
            </dd>
            <dt>Section 2 &mdash; Annual meeting</dt>
            <dd className="paddingMedium">
              {`Meeting(s) of the membership shall take place during the Texas Music Educators
              Association Conference in the designated conference city. The specific dates, times
              and locations of these meetings will be designated by the President.`}
            </dd>
            <dt>Section 3 &mdash; Special meetings</dt>
            <dd className="paddingMedium">
              {`Special meetings may be called by the President when it is deemed to be in the best
              interest of this Corporation.`}
            </dd>
            <dt>Section 4 &mdash; Notice of meetings</dt>
            <dd className="paddingMedium">
              {` Written notice of each meeting shall be sent to the membership via e-mail, and
              posted on the web site, not less than two weeks prior to the meeting.`}
            </dd>
            <dt>Section 5 &mdash; Quorum</dt>
            <dd className="paddingMedium">
              The members present at any properly noticed meeting shall constitute a quorum.
            </dd>
            <dt>Section 6 &mdash; Voting</dt>
            <dd className="paddingMedium">
              {`All issues to be voted on shall be duly moved and seconded prior to the call for a
              vote. Each vote shall be decided by a simple majority of those present at the
              meeting in which the vote takes place. A voice or hand vote is acceptable for issues
              except the election of officers. A written ballot may be taken on any issue at the
              discretion of the chair of the Board of Directors.`}
            </dd>
            <dt>Section 7 &mdash; Order of Business</dt>
            <dd className="paddingMedium">
              {`The order of business for board and general membership meetings shall be conducted
              according to Robert’s Rules of Order and follow the general outline below:`}
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
        </section>

        <CardHeadline>ARTICLE IV &mdash; BOARD OF DIRECTORS</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Board Role, Size, Compensation</dt>
            <dd className="paddingMedium">
              {`The Board of Directors, which may otherwise be referred to as the Executive Board,
              is responsible for overall policy and direction of this Corporation, and may
              delegate responsibility for day-to- day operations to individual Directors and
              committees. The Board of Directors shall have up to 4 elected members and 1 member
              who serves as an Executive Secretary (see Section 10 below). The Directors shall
              receive no compensation other than reasonable expenses, except as noted in Article
              10 below.`}
            </dd>
            <dt>Section 2 &mdash; Terms</dt>
            <dd className="paddingMedium">
              {`All elected Directors shall serve a one-year term in each officer position in the
              following sequence: Secretary, Vice-President, President and Past President. Terms begin and end the day after the TMEA convention.`}
            </dd>
            <dt>Section 3 &mdash; Meetings</dt>
            <dd className="paddingMedium">
              {`The Board of Directors shall meet at least twice per year, at a time and place set
              by the President, in conjunction with the general membership meetings.`}
            </dd>
            <dt>Section 4 &mdash; Board Elections</dt>
            <dd className="paddingMedium">
              {`New Directors and current Directors shall be elected or re-elected by the voting
              members at the annual meeting. Directors will be elected by a simple majority of
              members present at the annual meeting on a written ballot. Unopposed candidates may
              be elected through a voice vote, by consensus of the members present.`}
            </dd>
            <dt>Section 5 &mdash; Election Procedures</dt>
            <dd className="paddingMedium">
              A Nominating Committee, chaired by the Vice-President, shall be responsible for
              presenting a slate of prospective Secretary candidates to the Board of Directors
              In addition, any member may nominate a candidate for Secretary
              to the slate of nominees from the floor.
            </dd>
            <dt>Section 6 &mdash; Officers and Duties</dt>
            <dd className="paddingMedium">
              {`There shall be four officers of the Board of Directors consisting of a President,
              Vice-President, Past President, and Secretary. Their duties are as follows:`}
            </dd>
            <dd className="paddingLarge">
              The <em className="strong">President</em> shall convene regularly scheduled
              Board of Directors meetings, shall preside or arrange for other Directors to preside
              at each meeting as chair in the following order: Vice-President, Past President,
              Secretary.
            </dd>
            <dd className="paddingLarge">
              The <em className="strong">Vice-President</em> will chair the Nominating
              Committee, the Recognitions Committee and any committees on special subjects as
              designated by the Board of Directors.
            </dd>
            <dd className="paddingLarge">
              The <em className="strong">Past President</em> will chair any committees on
              special subjects as designated by the Board of Directors.
            </dd>
            <dd className="paddingLarge">
              The <em className="strong">Secretary</em> shall be responsible for keeping
              records of Board of Directors and Membership actions, including overseeing the
              taking of minutes at all meetings of the Executive Board and general membership,
              sending out meeting announcements, distributing copies of minutes and the agenda to
              each member, and assure that membership records are accurately maintained.
            </dd>
            <dt>Section 7 &mdash; Vacancies</dt>
            <dd className="paddingMedium">
              {`When a vacancy on the Board of Directors exists, the Director in the preceding
              position shall fill the vacant position, and the remaining Directors shall have the
              authority to appoint a replacement for the remaining vacancy from the current
              membership. Such appointments shall last only to the end of the resigning or removed
              Director’s regular term.`}
            </dd>
            <dt>Section 8 &mdash; Resignation and Termination</dt>
            <dd className="paddingMedium">
              {`Resignation as a member of the Board of Directors must be in writing and received by
              the President. A Director may be removed for other reasons by a two-third vote of
              the remaining Directors.`}
            </dd>
            <dt>Section 9 &mdash; Special Meetings</dt>
            <dd className="paddingMedium">
              {`Special meetings of the Board of Directors shall be called at the request of the
              President as deemed necessary to conduct the business of this Corporation.`}
            </dd>
            <dt>Section 10 &mdash; Executive Secretary</dt>
            <dd className="paddingMedium">
              {`An Executive Secretary shall be appointed annually by the Board of Directors. The current Executive Secretary may be re-appointed by the Board of Directors. If the position is vacant, a new Executive Secretary may be recommended to the Board of Directors by a committee appointed by the President. The Executive Secretary reports to the Finance Committee and serves as an ex-
officio, non-voting member of the Board of Directors. The Executive Secretary’s duties include, but are not limited to, handling financial operations of this Corporation, including assisting in the preparation of the budget, helping develop fundraising plans, executing payment for all expenses authorized by the Board of Directors, and making financial information available to members; provide an annual financial report to the general membership; provide timely and efficient communication to the membership pertaining to organizational events, and to the Executive Board pertaining to required tasks and duties; attend all meetings of the Executive Board and general membership; generate membership lists for selected events; and other duties as required for the health and benefit of this Corporation. The Executive Secretary shall receive an annual Honorarium, set by the Executive Board paid by the end of each fiscal year. The amount of such Honorarium shall not exceed compensation that is commensurate with the duties that the Executive Secretary performs for the Board of Directors.`}
            </dd>
            <dt>Section 11 &mdash; Powers</dt>
            <dd className="paddingMedium">
              {`In addition to the powers expressly conferred by these Bylaws, the Board may
              exercise such powers and do such lawful things as are not prohibited by statute or
              by these Bylaws.`}
            </dd>
            <dt>Section 12 &mdash; Voting</dt>
            <dd className="paddingMedium">
              The presence at a meeting of not less than a majority of the Directors
              then serving shall constitute a quorum. Action by a majority of votin
              Directors where a quorum is present shall constitute th
              action of the Directors of this Corporation
            </dd>
            <dt>Section 13 &mdash; Participation by Telephone</dt>
            <dd className="paddingMedium">
              Directors may participate in and hold a meeting of the Board by
              means of conference telephone or similar communications equipment
              by means of which all persons participating in the meeting can hear
              and speak to each other, and participation in the meeting pursuant to
              this paragraph shall constitute presence at such meeting, except
              where a Director participates in the meeting for the express purpose
              of objecting to the transaction of any business on the grounds that
              the meeting was not lawfully called or convened.
            </dd>
            <dt>Section 14 &mdash; Consent</dt>
            <dd className="paddingMedium">
              Any action required or permitted to be taken at a meeting of
              the Board may be taken without a meeting if a consent in
              writing setting forth the action so taken is signed by all
              members of the Board. Any such signed consent, or an
              electronically transmitted copy thereof, shall be
              placed in the minutes book of the Corporation.
            </dd>
            <dt>Section 15 &mdash; Indemnification</dt>
            <dd className="paddingMedium">
              To the fullest extent allowed by, and in accordance with, the
              terms and provisions of the Texas Business Organizations Code,
              including, but not limited to the indemnifications provided
              by Sections 8.101, 8.051, 8.052 and 8.104 thereof, or any
              other applicable law, no person shall be liable to the
              Corporation for monetary damages for or with respect to
              any acts or omissions in his/her capacity as a member of
              the Board or a committee. No amendment to or repeal of
              this provision shall apply to or have any effect on
              the liability of any Director or committee member
              with respect to acts or omissions of such Director
              or committee member prior to any such repeal or amendment.
            </dd>
          </dl>
        </section>

        <CardHeadline>ARTICLE V &mdash; COMMITTEES</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Committee Formation</dt>
            <dd className="paddingMedium">
              {`The Board may create committees as needed, such as fundraising, nominating, data
              collection, etc. The President appoints all committee chairs.`}
            </dd>
            <dt>Section 2 &mdash; Finance Committee</dt>
            <dd className="paddingMedium">
              The Finance Committee shall be appointed by the President and
              consist of two Directors and three Past Presidents. The Finance
              Committee has oversight of the Executive Secretary in all
              matters pertaining to finances, including but not limited
              to the annual budget. The Finance Committee is responsible
              for developing and reviewing fiscal procedures and annual budget.
              The Board of Directors must approve the budget, and all
              expenditures must be within the budget. Any major change
              in the budget must be approved by the Board of Directors.
              The fiscal year shall run July 1 to June 30 annually.
              Annual reports are required to be submitted to the
              Board showing income, expenditures and pending income.
              The financial records of this Corporation are public
              information and shall be made available to the
              membership, the Directors, and the public.
            </dd>
            <dt>Section 3 &mdash; Nominating Committee</dt>
            <dd className="paddingMedium">
              The Vice-President will chair the nominating committee and
              will invite active members to serve on this committee as
              directed by the President. The committee shall contact all
              possible nominees to determine their willingness to serve.
              A slate, containing the name of one or more active members
              who have agreed to run for the Secretary position must be
              presented to the Board for ratification prior to placing
              the election on a meeting agenda for the members. The
              committee members shall serve as the election officials,
              should a written ballot be taken on the election of
              the new board member.
            </dd>
            <dt>Section 4 &mdash; Recognitions Committee</dt>
            <dd className="paddingMedium">
              The Vice-President will chair the recognitions committee and
              invite no less than 2 active members to serve on this
              committee prior to the Fall Retreat. This committee will
              be charged with the task of soliciting nominations for
              “Outstanding Administrator” from the general Texas Music
              Educators Association Membership. From those TMAC members
              in good standing who are nominated, the committee will
              recommend a single honoree to the Board for approval.
              The honoree will be announced at the conclusion of the
              Fall Retreat and a formal presentation will be coordinated
              with the TMEA board during a general session at the February conference.
            </dd>
          </dl>
        </section>

        <CardHeadline>ARTICLE VI &mdash; AMENDMENTS</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Amendments</dt>
            <dd className="paddingMedium">
              These Bylaws may be amended, when necessary, by a two-thirds
              majority of the membership in good standing who are present
              and voting at a regular meeting. Proposed amendments must
              be submitted to the Secretary to be sent out to all members,
              prior to the meeting, with regular Membership meeting announcements.
            </dd>
          </dl>
        </section>

        <CardHeadline>ARTICLE VII &mdash; STANDING RULES</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dt>Section 1 &mdash; Memorials</dt>
            <dd className="paddingMedium">
              At the passing of a current or former TMAC member, this Corporation will
              make the donation of a sum not to exceed $500 per individual, to be
              designated by the Directors, to the Texas Music Educators Association
              Scholarship Fund in memory of the individual, their service to music
              education and their participation in TMAC.
            </dd>
          </dl>
        </section>

        <CardHeadline>ARTICLE VIII &mdash; FISCAL YEAR</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dd className="paddingMedium">
              The fiscal year of this Corporation shall be from July 1<sup>st</sup> through June
              30<sup>th</sup>.
            </dd>
          </dl>
        </section>

        <CardHeadline>ARTICLE IX &mdash; NONDISCRIMINATION</CardHeadline>
        <section>
          <dl className="paddingMedium">
            <dd className="paddingMedium">
              The officers, Directors, committee members, employees and persons served by
              this Corporation shall be selected entirely on a nondiscriminatory basis
              with respect to age, sex, color, race, religion, national origin, and disability.
            </dd>
          </dl>
        </section>

        <section>
          <em>
            These Bylaws were originally approved at a meeting of the Texas Music Administrators
            Conference membership on February 15, 2008. These Bylaws were amended on November 21,
            2013; February 12, 2014; July 26, 2019; September 16, 2019;
            November 19, 2020; July 23, 2021; November 18, 2021; and July 22, 2022.
          </em>
        </section>

        <MobileDivider>
          <SidebarBody
            inline
            yaml={aboutSidebar}
          />
        </MobileDivider>
      </Container>
    </StyledRoot>
  </Layout>
);

export default Constitution;
