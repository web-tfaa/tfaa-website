// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import Sidebar from '../sidebar';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  sidebarYaml: PropTypes.shape().isRequired,
};

// Component Definition
const PageContainer = props => {
  const { children, sidebarYaml } = props;

  return (
    <div>
      <Sidebar sidebarYaml={sidebarYaml} />
    </div>
  );
};

PageContainer.propTypes = propTypes;
export default Sidebar;
