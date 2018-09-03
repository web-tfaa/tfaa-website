// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { colors } from '../../utils/presets';

// Component Definition
const FormHr = ({ red }) => <hr css={{ background: red ? colors.texasFlagRed : 'darkred', height: 3 }} />;

FormHr.propTypes = {
  red: PropTypes.bool,
};

FormHr.defaultProps = {
  red: false,
};

export default FormHr;
