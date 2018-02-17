// External Dependencies
import React from 'react';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';
import Stat from './stat';

// Icons
import locationCityIcon from 'react-icons/lib/md/location-city';
import schoolIcon from 'react-icons/lib/md/school';
import faceIcon from 'react-icons/lib/md/face';

// Local Variables
const texasFlagBlue = '#002868';
const numberOfDistricts = 1246;
const numberOfSchools = 3000;

// Component Definition
const FeaturedStat = ({ children }) => (
  <div
    css={{
      flex: `1 1 100%`,
      backgroundColor: `${hex2rgba(texasFlagBlue, 0.9)}`,
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'space-around',
      padding: '2.5em',
      textAlign: 'center',
    }}
  >
    <Stat
      color="#3598db"
      icon={locationCityIcon}
    >
      <div>{numberOfDistricts.toLocaleString()} School Districts</div>
    </Stat>
    <Stat
      color="#1bbc9b"
      icon={schoolIcon}
    >
      <div>Over {numberOfSchools.toLocaleString()} Schools</div>
    </Stat>
    <Stat
      color="#f9b320"
      icon={faceIcon}
    >
      <div>Over 5 million students</div>
    </Stat>
  </div>
);

export default FeaturedStat;
