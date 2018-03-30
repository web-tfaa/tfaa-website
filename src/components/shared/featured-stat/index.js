// External Dependencies
import React from 'react';
import differenceInYears from 'date-fns/difference_in_years'

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import { rhythm, scale, options } from '../../../utils/typography';
import { vP, vPHd, vPVHd, vPVVHd } from '../../../utils/gutters';
import Stat from './stat';

// Icons
import Face as FaceIcon from 'react-icons/lib/md/face';
import LocationCity as LocationCityIcon from 'react-icons/lib/md/location-city';
import QueueMusic as QueueMusicIcon from 'react-icons/lib/md/queue-music';
import School as SchoolIcon from 'react-icons/lib/md/school';

// Icon colors
const queueMusicIconColor = '#3598db';
const locationCityIconColor = '#1bbc9b';
const schoolIconColor = '#f9b320';
const faceIconColor = '#b96af7';

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
      backgroundColor: `${colors.ui.light}`,
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'space-around',
      padding: '2.5em',
      textAlign: 'center',
    }}
  >
    <Stat
      color={queueMusicIconColor}
      icon={QueueMusicIcon}
    >
      <div>{ageOfTmac} Years Serving Our Students</div>
    </Stat>
    <Stat
      color={locationCityIconColor}
      icon={LocationCityIcon}
    >
      <div>Serving {numberOfDistricts.toLocaleString()} School Districts</div>
    </Stat>
    <Stat
      color={schoolIconColor}
      icon={SchoolIcon}
    >
      <div>Serving Over {numberOfSchools.toLocaleString()} Schools</div>
    </Stat>
    <Stat
      color={faceIconColor}
      icon={FaceIcon}
    >
      <div>Serving 5+ Million Students</div>
    </Stat>
  </div>
);

export default FeaturedStat;
