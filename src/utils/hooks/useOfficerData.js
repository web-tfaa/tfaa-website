import { useStaticQuery, graphql } from 'gatsby';

// Hook Definition
export const useOfficerData = () => {
  const { allContentfulOfficer } = useStaticQuery(
    graphql`
      query officerPageQuery {
        allContentfulOfficer(
          filter: {
            node_locale: { eq: "en-US" }
          }
        ) {
          edges {
            node {
              title
              name
              email
              schoolDistrict
              districtTitle
              linkToPicture
            }
          }
        }
      }
    `,
  );
  return allContentfulOfficer.edges;
};
