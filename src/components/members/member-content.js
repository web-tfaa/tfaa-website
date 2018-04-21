// External Dependencies
import React from 'react';

// Internal Dependencies
import presets from '../../utils/presets';

// Sidebar Data
import SidebarBody from '../shared/sidebar/sidebar-body';
import membersSidebar from '../../pages/members/members-links.yml';

// Component Definition
const MemberContent = ({ data }) => (
  <div>
    So much good stuff for the members!
    <div
      css={{
        display: `block`,
        [presets.Tablet]: {
          display: `none`,
        },
      }}
    >
      <hr css={{
        border: 0,
        height: 2,
        marginTop: 10,
      }} />
      <SidebarBody inline yaml={membersSidebar} />
    </div>
  </div>
);



export default MemberContent;
