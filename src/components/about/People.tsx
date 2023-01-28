// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { useOfficerData } from '../../utils/hooks/useOfficerData';
import AreaReps from './AreaReps';
import PeopleItem from './PeopleItem';

// Local Typings
type Office = 'President' | 'Vice-President' | 'Executive Secretary' | 'Secretary' | 'Past-President';
export interface TfaaPerson {
  districtTitle: string;
  email: string;
  linkToPicture: string;
  name: string;
  schoolDistrict: string;
  title: Office;
}

export interface OfficerList {
  node: TfaaPerson
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.officerPeopleContainer': {
    [theme.breakpoints.down('mobile')]: {
      paddingLeft: theme.spacing(2),
    },
    display: 'flex',
    flexWrap: 'wrap',
  },

  '.peopleSectionTitle': {
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },
  '.officersTitle': {
    fontWeight: 900,
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(4),
  },
  padding: theme.spacing(10, 15, 4),
  width: '100%',
}));

// Component Definition
const People: FC = () => {
  const { edges } = useOfficerData();

  const president = edges.find(({ node }: OfficerList) => node.title === 'President').node;
  const vicePresident = edges.find(({ node }: OfficerList) => node.title === 'Vice-President').node;
  const executiveSecretary = edges.find(({ node }: OfficerList) => node.title === 'Executive Secretary').node;
  const secretary = edges.find(({ node }: OfficerList) => node.title === 'Secretary').node;
  const pastPresident = edges.find(({ node }: OfficerList) => node.title === 'Past-President').node;

  return (
    <StyledRoot>
      <Typography
        className="peopleSectionTitle"
        variant="h5"
      >
        People Dedicated to Fine Arts
        Education
      </Typography>

      <section>
        <Typography
          className="officersTitle"
          variant="h6"
        >
          {appNameShort} Officers
        </Typography>

        <div className="officerPeopleContainer">
          <PeopleItem peopleData={president} />
          <PeopleItem peopleData={vicePresident} />
          <PeopleItem peopleData={secretary} />
          <PeopleItem peopleData={pastPresident} />
          <PeopleItem peopleData={executiveSecretary} />
        </div>
      </section>

      <AreaReps />
    </StyledRoot>
  );
};

export default People;
