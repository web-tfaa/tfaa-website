// External Dependencies
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// Internal Dependencies
import FeaturedStat from '../components/shared/featured-stat';
import Layout from '../components/layout';
import HomeBanner from '../components/home/HomeBanner';
import TakeAction from '../components/home/TakeAction';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
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
const Home: FC<Props> = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Home</title>
    </Helmet>

    <StyledRoot>
      <HomeBanner />

      <TakeAction />

      <FeaturedStat />
      {/* {props.data.allContentfulBlog.edges.map((edge) =>
        <BlogPost key={edge.node.id} node={edge.node} />)} */}
    </StyledRoot>
  </Layout>
);

export default Home;
