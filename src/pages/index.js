// External Dependencies
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import Card from '../components/shared/cards/card';
import Cards from '../components/shared/cards';
import FeaturedStat from '../components/shared/featured-stat';
import FuturaParagraph from '../components/shared/futura-paragraph';
import Layout from '../components/layout';
import MastheadBg from '../components/masthead/masthead-bg';
import MastheadContent from '../components/masthead';

// Local Variables
const propTypes = {
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

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
const Home = (props) => {
  const {
    // data,
    location,
  } = props;
  const classes = useStyles(props);

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Home</title>
      </Helmet>

      <MastheadBg />

      <div className={classes.root}>
        <MastheadContent />

        <Cards>
          <Card>
            <FuturaParagraph>
              <strong>Greetings from the Texas Music Administrators Conference!</strong>{' '}
              The Texas Music Administrators Conference (TMAC) is an organization of
              fine arts administrators with a common goal&mdash;the
              continued pursuit of excellence in fine arts education in Texas for all
              students. While our roles may be varied in our individual school
              districts we stand together to create a supportive environment so
              that all children in Texas are offered a quality fine arts education.
            </FuturaParagraph>
            <FuturaParagraph>
              If you are a fine arts administrator, an aspiring
              administrator, or if you are responsible for the organizing or
              supervision of fine arts activities in your district, we encourage you
              to become a member of TMAC. We meet as a group three times per year and everyone is invited to attend.  We just ask that you first join as a member of TMAC.  We meet in July in San Antonio during the summer TBA/TODA/TCDA conference, in November in Austin, and in February as part of the TMEA All-State Music Conference. If you would like more information regarding any of these events, please <Link to="/events/fall-retreat/">visit the events page</Link>.
            </FuturaParagraph>
          </Card>
        </Cards>
        <FeaturedStat />
        {/* {props.data.allContentfulBlog.edges.map((edge) =>
          <BlogPost key={edge.node.id} node={edge.node} />)} */}
      </div>
    </Layout>
  );
};

Home.propTypes = propTypes;

export default Home;

export const pageQuery = graphql`
  query pageQuery {
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
}`;
