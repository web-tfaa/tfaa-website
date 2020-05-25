// const path = require('path');
// const { createFilePath } = require(`gatsby-source-filesystem`);
// const fs = require('fs');

exports.createPages = ({ graphql }) => {
  // const { createPage } = actions;
  return new Promise((resolve, reject) => {
    // const blogPostTemplate = path.resolve('src/templates/blog-post.js');
    resolve(
      graphql(`
        {
          allContentfulFileShare(limit: 100) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        // result.data.allContentfulFileShare.edges.forEach(edge => {
        //   createPage({
        //     path: edge.node.slug,
        //     component: blogPostTemplate,
        //     context: {
        //       slug: edge.node.slug,
        //     },
        //   });
        // });
        // return;
      }),
    );
  });
};
