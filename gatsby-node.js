const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require('fs');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  // console.log(node.internal.type);

  if (node.internal.mediaType === `application/pdf`) {
    console.log('heelllo, ', node.internal.type);
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blog-post.js');
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
      `).then(result => {
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
        return;
      })
    );
  });
};
