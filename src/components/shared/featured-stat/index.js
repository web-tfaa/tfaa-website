// External Dependencies
import React from 'react';
import differenceInYears from 'date-fns/difference_in_years'

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import Stat from './stat';

// Icons
import Face from 'react-icons/lib/md/face';
import LocationCity from 'react-icons/lib/md/location-city';
import QueueMusic from 'react-icons/lib/md/queue-music';
import School from 'react-icons/lib/md/school';

// Icon colors
const queueMusicIconColor = '#3598db';
const locationCityIconColor = '#1bbc9b';
const schoolIconColor = '#f9b320';
const faceIconColor = '#b96af7';

// Local Variables
const numberOfDistricts = 1246;
const numberOfSchools = 3000;
const ageOfTmac = differenceInYears(new Date(), new Date('Tue Feb 15 1983 00:00:00 GMT-0600 (CST)'));

// Component Definition
const FeaturedStat = ({ children }) => (
  <div
    css={{
      backgroundColor: `${colors.ui.light}`,
      display: 'flex',
      flex: `1 1 100%`,
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginBottom: 68,
      padding: '2.5em',
      textAlign: 'center',
      [presets.Tablet]: {
        marginBottom: 0,
      },
    }}
  >
    <Stat
      color={queueMusicIconColor}
      icon={QueueMusic}
    >
      <div>{ageOfTmac} Years Serving Our Students</div>
    </Stat>
    <Stat
      color={locationCityIconColor}
      icon={LocationCity}
    >
      <div>Serving {numberOfDistricts.toLocaleString()} School Districts</div>
    </Stat>
    <Stat
      color={schoolIconColor}
      icon={School}
    >
      <div>Serving Over {numberOfSchools.toLocaleString()} Schools</div>
    </Stat>
    <Stat
      color={faceIconColor}
      icon={Face}
    >
      <div>Serving 5+ Million Students</div>
    </Stat>
  </div>
);

export default FeaturedStat;
