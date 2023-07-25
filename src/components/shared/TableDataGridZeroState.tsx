// External Dependencies
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import styled from 'styled-components';

// Internal Dependencies

// Local Variables
const StyledRoot = styled(Box)(({ theme }) => ({
  '& .MuiDialogContentText-root': {
    marginTop: theme.spacing(2.5),
    textAlign: 'center',
  },

  '.emptyStateText': {
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: $maxTextWidth,
    // },
    marginTop: theme.spacing(2.5),
    maxWidth: '80%',
    textAlign: 'center',
  },

  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  position: 'relative',
  zIndex: 1,
}));

// We can reuse the ZeroState from our old tables, but we have use different
//  styles to allow interaction with the ContactUs link

// Component Definition
const TableDataGridZeroState = (): JSX.Element => {
  const theme = useTheme();

  return (
    <StyledRoot
      alignContent="center"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      padding={32}
    >
      <MusicOffIcon
        htmlColor={alpha(theme.palette.grey['400'], 0.8)}
        sx={{
          height: 96,
          width: 96,
        }}
      />

      <DialogContentText
        className="emptyStateText"
        component="div"
        variant="body1"
      >
        Sign in to the view the current member list
      </DialogContentText>
    </StyledRoot>
  );
};

export default TableDataGridZeroState;
