// External Dependencies
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

// Local Variables
const propTypes = {
  data: PropTypes.shape({
    contentfulBlog: PropTypes.shape({
      title: PropTypes.string,
      createdAt: PropTypes.string,
      featuredImage: PropTypes.string,
      content: PropTypes.string,
    }),
  }).isRequired,
};

const BlogPost = ({ data }) => {
  const {
    title,
    createdAt,
    featuredImage,
    content,
  } = data.contentfulBlog;

  return (
    <div>
      <h1
        style={{
          borderBottom: '1px solid #ccc',
          paddingBottom: '0.5rem',
        }}
      >
        {title}
      </h1>
      <p>{createdAt}</p>
      <div>
        <Img sizes={featuredImage.sizes} />
      </div>
      <hr />
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}
      />
    </div>
  );
};

BlogPost.propTypes = propTypes;

export default BlogPost;
