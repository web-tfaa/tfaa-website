// External Dependencies
import React from 'react';
import hex2rgba from 'hex2rgba';
import differenceInYears from 'date-fns/difference_in_years'

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';
import Stat from './stat';

// Icons
import locationCityIcon from 'react-icons/lib/md/location-city';
import schoolIcon from 'react-icons/lib/md/school';
import faceIcon from 'react-icons/lib/md/face';
import queueMusicIcon from 'react-icons/lib/md/queue-music';

// Local Variables
const texasFlagBlue = '#002868';
const numberOfDistricts = 1246;
const numberOfSchools = 3000;
const ageOfTmac = differenceInYears(new Date(), new Date('Tue Feb 15 1983 00:00:00 GMT-0600 (CST)'));

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
      icon={queueMusicIcon}
    >
      <div>{ageOfTmac} YEARS serving our students</div>
    </Stat>
    <Stat
      color="#1bbc9b"
      icon={locationCityIcon}
    >
      <div>{numberOfDistricts.toLocaleString()} School Districts</div>
    </Stat>
    <Stat
      color="#f9b320"
      icon={schoolIcon}
    >
      <div>Over {numberOfSchools.toLocaleString()} Schools</div>
    </Stat>
    <Stat
      color="#b96af7"
      icon={faceIcon}
    >
      <div>Over 5 million students</div>
    </Stat>
  </div>
);

export default FeaturedStat;
