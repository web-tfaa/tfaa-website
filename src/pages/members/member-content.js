// External Dependencies
import React from 'react';

// Internal Dependencies
import presets from '../../utils/presets';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Component Definition
export const MemberContent = ({ data }) => (
  <div>
    So much good stuff for the members!
    {data.allContentfulFileUpload.edges.map((edge) => (
      <div
        css={{ color: 'hotpink' }}
        key={edge.node.id}
        node={edge.node}
      />
    ))}
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

// export const pageQuery = graphql`
//   query pageQuery {
//     allContentfulFileUpload(
//       filter: {
//         node_locale: { eq: "en-US" }
//       },
//       sort: {
//         fields: [createdAt], order: DESC
//       }
//     ) {
//       edges {
//         node {
//           id
//           title
//           slug
//           createdAt(formatString: "MMMM DD, YYYY")
//         }
//       }
//     }
//   }
// `
