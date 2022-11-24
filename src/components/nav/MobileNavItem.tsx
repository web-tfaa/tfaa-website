// External Dependencies
import { Box, SvgIconProps } from '@mui/material';
import { FC, ReactElement } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import { rhythm, scale, options } from '../../utils/typography';

// Local Typings
interface Props {
  icon: (props: SvgIconProps) => ReactElement<SvgIconProps>;
  label: string;
  linkTo: string;
}

// Local Variables
const StyledLink = styled(Link)(({ theme }) => ({
  '.iconWrapper': {
    display: 'block',
    margin: '0 auto',
  },
  '.label': {
    color: theme.palette.legacyGray.dark,
  },

  color: theme.palette.legacyGray.dark,
  fontSize: scale(-1 / 2).fontSize,
  letterSpacing: '0.0075rem',
  lineHeight: 1,
  padding: `${rhythm(options.blockMarginBottom / 4)} ${rhythm(
    options.blockMarginBottom,
  )} ${rhythm(options.blockMarginBottom / 2)} `,
  textDecoration: 'none',
  textAlign: 'center',
}));

// Component Definition
const MobileNavItem: FC<Props> = ({ linkTo, label, icon: Icon }) => {
  const theme = useTheme();

  return (
    <StyledLink to={linkTo}>
      <div className="iconWrapper">
        <Icon htmlColor={theme.palette.texasFlag.blue} />
      </div>
      <Box
        className="label"
        marginTop={1}
      >
        {label}
      </Box>
    </StyledLink>
  );
};

export default MobileNavItem;
