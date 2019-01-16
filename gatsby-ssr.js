// /* eslint-disable react/no-danger */

// const React = require('react');
// const { renderToString } = require('react-dom/server');
// const { JssProvider } = require('react-jss');
// const getPageContext = require('./src/utils/getPageContext').default;

// function replaceRenderer({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents,
// }) {
//   // Get the context of the page to collected side effects.
//   const pageContext = getPageContext();

//   const bodyHTML = renderToString(
//     <JssProvider
//       generateClassName={pageContext.generateClassName}
//       registry={pageContext.sheetsRegistry}
//     >
//       {bodyComponent}
//     </JssProvider>,
//   );

//   replaceBodyHTMLString(bodyHTML);
//   setHeadComponents([
//     <style
//       type="text/css"
//       id="jss-server-side"
//       key="jss-server-side"
//       dangerouslySetInnerHTML={{
//         __html: pageContext.sheetsRegistry.toString(),
//       }}
//     />,
//   ]);
// }

// exports.replaceRenderer = replaceRenderer;

// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// const withRoot = require('./src/withRoot').default;
// const WithRoot = withRoot(props => props.children);

// exports.wrapRootElement = ({ element }) => {
//   return <WithRoot>{element}</WithRoot>;
// };
