import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

class BlogPost extends Component {
  render() {
    const {
      title,
      createdAt,
      featuredImage,
      content
    } = this.props.data.contentfulBlog

    return (
      <div>
        <h1
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem"
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
          dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}
        />
      </div>
    )
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired
}

export default BlogPost;
