import { useStaticQuery, graphql } from 'gatsby';

// Hook Definition
export const useAreaRepsData = () => {
  const { allContentfulAreaReps } = useStaticQuery(
    graphql`
      query areaRepsPageQuery {
        allContentfulAreaReps(
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
              linkToPicture
            }
          }
        }
      }
    `,
  );
  return allContentfulAreaReps;
};
