// External Dependencies
import { useStaticQuery, graphql } from 'gatsby';

// Hook Definition
export const useEventData = () => {
  const { allContentfulEvent } = useStaticQuery(
    graphql`
      query eventsQuery {
        allContentfulEvent(
          filter: {
            node_locale: { eq: "en-US" }
          }
        ) {
          edges {
            node {
              titleOfEvent
              dateOfEvent
              timeOfEvent
            }
          }
        }
      }
    `,
  );
  return allContentfulEvent;
};
