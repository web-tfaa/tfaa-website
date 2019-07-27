// External Dependencies
import React from 'react';
import Face from '@material-ui/icons/Face';
import LocationCity from '@material-ui/icons/LocationCity';
import School from '@material-ui/icons/School';

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import Stat from './stat';

// Icon colors
const queueMusicIconColor = '#3598db';
const locationCityIconColor = '#1bbc9b';
const schoolIconColor = '#f9b320';
const faceIconColor = '#b96af7';

// Local Variables
const numberOfDistricts = 1246;
const numberOfSchools = 3000;

// Component Definition
const FeaturedStat = ({ children }) => (
  <div
    css={{
      backgroundColor: `${colors.ui.light}`,
      display: 'flex',
      flex: '1 1 100%',
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
      title
    >
      <div>Since 1983 TMAC Serves:</div>
    </Stat>
    <Stat
      color={locationCityIconColor}
      icon={LocationCity}
    >
      <div>{numberOfDistricts.toLocaleString()} School Districts</div>
    </Stat>
    <Stat
      color={schoolIconColor}
      icon={School}
    >
      <div>Over {numberOfSchools.toLocaleString()} Schools</div>
    </Stat>
    <Stat
      color={faceIconColor}
      icon={Face}
    >
      <div>5+ Million Students</div>
    </Stat>
  </div>
);

export default FeaturedStat;
