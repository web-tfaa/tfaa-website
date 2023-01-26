// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { useAreaRepsData } from '../../utils/hooks/useAreaRepsData';
import PeopleItem from './PeopleItem';

// Local Typings
type Office = 'President' | 'Vice-President' | 'Executive Secretary' | 'Secretary' | 'Past-President';
type Area = 'North Texas' | 'Central Texas' | 'South Texas' | 'Southeast Texas' | 'West Texas';
export interface TfaaPerson {
  districtTitle: string;
  email: string;
  linkToPicture: string;
  name: string;
  schoolDistrict: string;
  title: Office | Area;
}

export interface OfficerList {
  node: TfaaPerson
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.areaRepsContainer': {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '.areaRepsTitle': {
    fontWeight: 900,
  },

  marginTop: theme.spacing(4),
  width: '100%',
}));

// Component Definition
const AreaReps: FC = () => {
  const { edges } = useAreaRepsData();

  const north = edges.find(({ node }: OfficerList) => node.title === 'North Texas').node;
  const central = edges.find(({ node }: OfficerList) => node.title === 'Central Texas').node;
  const south = edges.find(({ node }: OfficerList) => node.title === 'South Texas').node;
  const southeast = edges.find(({ node }: OfficerList) => node.title === 'Southeast Texas').node;
  const west = edges.find(({ node }: OfficerList) => node.title === 'West Texas').node;

  return (
    <StyledRoot>
      <Typography
        className="areaRepsTitle"
        variant="h6"
      >
        {appNameShort} Area Representatives
      </Typography>

      <div className="areaRepsContainer">
        <PeopleItem peopleData={north} />
        <PeopleItem peopleData={central} />
        <PeopleItem peopleData={south} />
        <PeopleItem peopleData={southeast} />
        <PeopleItem peopleData={west} />
      </div>
    </StyledRoot>
  );
};

export default AreaReps;
