// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

// Internal Dependencies
import Card from '../components/shared/cards/card';
import CardHeadline from '../components/shared/cards/card-headline';
import Cards from '../components/shared/cards';
import FeaturedStat from '../components/shared/featured-stat';
import FuturaParagraph from '../components/shared/futura-paragraph';
import MastheadBg from '../components/masthead/masthead-bg';
import MastheadContent from '../components/masthead/';
import Stat from '../components/shared/featured-stat/stat';
import { rhythm } from '../utils/typography';

// const BlogPost = ({node}) => {
//   return (
//     <div style={{
//       marginBottom: '1.5rem',
//       padding: '1.5rem',
//       border: '1px solid #ccc'
//     }}>
//       <h3><Link to={node.slug}>{node.title}</Link></h3>
//       <p>{node.createdAt}</p>
//       <div>
//         <div>
//           <Img resolutions={node.featuredImage.resolutions}/>
//         </div>
//         <div>{node.content.childMarkdownRemark.excerpt}</div>
//       </div>
//     </div>
//   )
// }

// Component Definition
export default (props) => (
  <div>
    <Helmet>
      <title>TMAC | Home</title>
    </Helmet>
    <MastheadBg />
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <MastheadContent />

      <Cards>
        <Card>
          <CardHeadline>Message from the President</CardHeadline>
          <FuturaParagraph>
            Greetings from the Texas Music Administrators Conference! The Texas Music Administrators Conference (TMAC) is an organization of music/fine arts administrators with a common goal&mdash;the continued pursuit of excellence in music education in Texas for all students. While our roles may be varied in our individual school districts we stand together to create a supportive environment so that all children in Texas are offered a quality music education.
          </FuturaParagraph>
          <FuturaParagraph>
            If you are a music/fine arts administrator, an aspiring administrator, or if you are responsible for the organizing or supervision of music activities in your district, we encourage you to become a member of TMAC. We will be hosting a Summer Round Table session during the summer TBA/TCDA/TODA conferences in San Antonio on Friday, July 21, 2017 - everyone is invited to attend! Our Fall Conference, for TMAC members only, will be held November 15-17, 2017 in Austin, Texas. If you would like more information on registering for the Fall Conference, please contact a TMAC Officer.
          </FuturaParagraph>

          <FuturaParagraph>
            <a href="mailto:johnjanda@tomballisd.net">JD Janda</a>, President
            <br />
            Texas Music Administrators Conference
          </FuturaParagraph>
        </Card>
      </Cards>

      <FeaturedStat />
      {/* {props.data.allContentfulBlog.edges.map((edge) => <BlogPost key={edge.node.id} node={edge.node} />)} */}
    </div>
  </div>
);

// export const pageQuery = graphql`
//   query pageQuery {
//     allContentfulBlog(
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
//           featuredImage {
//             resolutions(width: 300) {
//               ...GatsbyContentfulResolutions
//             }
//           }
//           content {
//             childMarkdownRemark {
//               excerpt
//             }
//           }
//         }
//       }
//     }
//   }
// `
