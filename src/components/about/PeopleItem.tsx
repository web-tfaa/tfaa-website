// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaPerson } from './People';
import { appNameShort } from '../../utils/app-constants';
import Avatar from '../shared/Avatar';

// Local Typings
interface Props {
  peopleData: TfaaPerson;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.peopleName': {
    fontWeight: 500,
  },
  '.peopleTextContainer': {
    [theme.breakpoints.down('mobile')]: {
      marginLeft: 0,
      maxWidth: '80%',
      textAlign: 'center',
    },
    marginLeft: theme.spacing(6),
  },
  '.peopleTitle': {
    [theme.breakpoints.down('mobile')]: {
      marginBottom: theme.spacing(1),
    },
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },

  [theme.breakpoints.down('mobile')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4, 2),
  },

  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(4, 12),
  width: '100%',
}));

// Component Definition
const PeopleItem: FC<Props> = ({ peopleData }) => {
  return (
    <StyledRoot>
      <Avatar
        alt={`${appNameShort} ${peopleData.title}`}
        src={peopleData.linkToPicture}
      />

      <section className="peopleTextContainer">
        <Typography
          className="peopleTitle"
          variant="h6"
        >
          {peopleData.title}
        </Typography>

        <Typography className="peopleName">
          <Link href={`mailto:${peopleData.email}`}>
            {peopleData.name}
          </Link>
        </Typography>

        <Typography variant="body2">
          {peopleData.districtTitle
            ? `${peopleData.districtTitle}, ${peopleData.schoolDistrict}`
            : peopleData.schoolDistrict}
        </Typography>
      </section>
    </StyledRoot>
  );
};

export default PeopleItem;
