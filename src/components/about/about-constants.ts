// Internal Dependencies
import { appName, appNameShort } from '../../utils/app-constants';
import AdvocatingIconSvg from './about-icons/AdvocatingIconSvg';
import CollaboratingIconSvg from './about-icons/CollaboratingIconSvg';
import DevelopingIconSvg from './about-icons/DevelopingIconSvg';
import HoldingIconSvg from './about-icons/HoldingIconSvg';
import SupportingIconSvg from './about-icons/SupportingIconSvg';

export const ABOUT_VIRTUES_DATA = [
  {
    description: 'Advocating tirelessly for the advancement of fine arts education, community engagement, and increased access to arts education.',
    icon: AdvocatingIconSvg,
    title: 'Advocating',
  },
  {
    description: 'Collaborating as Fine Arts Administrators to provide support, guidance, and professional learning opportunities.',
    icon: CollaboratingIconSvg,
    title: 'Collaborating',
  },
  {
    description: 'Consciously supporting all students, educators, and programs in ways that develop lasting relationships with all stakeholders.',
    icon: SupportingIconSvg,
    title: 'Supporting',
  },
  {
    description: 'Developing partnerships that allow for lasting collaborative relationships between arts organizations, school districts, and other stakeholders.',
    icon: DevelopingIconSvg,
    title: 'Developing',
  },
  {
    description: 'Holding students and their potential for achievement at the center of all decision-making, instructional support, and planned trainings.',
    icon: HoldingIconSvg,
    title: 'Holding',
  },
];

export const WHERE_WE_HAVE_BEEN_DATA = [
  {
    imgSrc: 'https://res.cloudinary.com/tmac/image/upload/v1670856123/bearded-man-looking-at-paintings-in-art-gallery.png',
    subtitle: `View a list of all past ${appName} Presidents going back to 1983.`,
    title: `${appNameShort} Past Presidents`,
    to: '/about/past-presidents',
  },
  {
    imgSrc: 'https://res.cloudinary.com/tmac/image/upload/v1670856123/joyful-young-female-artist-painting-on-canvas.png',
    subtitle: `View a list of all ${appName} Outstanding Administrators since ${appNameShort} started awarding this honor in 1999.`,
    title: `${appNameShort} Past Oustanding Administrators`,
    to: '/about/past-outstanding-administrators',
  }
];

export const outstandingAdmin = [
  {
    year: '1999',
    name: 'Woody Schober',
  },
  {
    year: '2000',
    name: 'Henry Schraub',
  },
  {
    year: '2001',
    name: 'Mike Mamminga',
  },
  {
    year: '2002',
    name: 'Jan Schronk',
  },
  {
    year: '2003',
    name: 'David Lambert',
  },
  {
    year: '2004',
    name: 'Craig Welle',
  },
  {
    year: '2005',
    name: 'Camille Bach',
  },
  {
    year: '2006',
    name: 'John Kline',
  },
  {
    year: '2007',
    name: 'Larry Tucker',
  },
  {
    year: '2008',
    name: 'Bob Bryant',
  },
  {
    year: '2009',
    name: 'Nellie Ponikvar',
  },
  {
    year: '2010',
    name: 'Jim McDaniel',
  },
  {
    year: '2011',
    name: 'Jim Van Zandt',
  },
  {
    year: '2012',
    name: 'George W. Jones',
  },
  {
    year: '2013',
    name: 'Mitzi Jones',
  },
  {
    year: '2014',
    name: 'Peter Warshaw',
  },
  {
    year: '2015',
    name: 'Cody Myers',
  },
  {
    year: '2016',
    name: 'David Cain',
  },
  {
    year: '2017',
    name: 'Kathy Kuddes',
  },
  {
    year: '2018',
    name: 'Monte Mast',
  },
  {
    year: '2019',
    name: 'James Drew',
  },
  {
    year: '2020',
    name: 'Lisa Roebuck',
  },
  {
    year: '2021',
    name: 'Sam Harris',
  },
  {
    year: '2022',
    name: 'Linda Fletcher',
  },
];

export const pastPresidents = [
  {
    year: '1983-1985',
    name: 'Dick Winters',
  },
  {
    year: '1985-1986',
    name: 'Woody Schober',
  },
  {
    year: '1986-1987',
    name: 'Ken Howard',
  },
  {
    year: '1987-1988',
    name: 'Paul Mann',
  },
  {
    year: '1988-1989',
    name: 'Bob Lewis',
  },
  {
    year: '1989-1990',
    name: 'Pete Cisneros',
  },
  {
    year: '1990-1992',
    name: 'Jan Schronk',
  },
  {
    year: '1992-1994',
    name: 'Woody Schober',
  },
  {
    year: '1994-1996',
    name: 'Craig Welle',
  },
  {
    year: '1996-1997',
    name: 'Mollie Tower',
  },
  {
    year: '1997-2000',
    name: 'Larry Tucker',
  },
  {
    year: '2000-2002',
    name: 'Camille Bach',
  },
  {
    year: '2002-2003',
    name: 'Danna Rothlisberger',
  },
  {
    year: '2003-2004',
    name: 'Cody Myers',
  },
  {
    year: '2004-2005',
    name: 'John Kline',
  },
  {
    year: '2005-2006',
    name: 'Mitzi Jones',
  },
  {
    year: '2006-2007',
    name: 'Randy Bartlett',
  },
  {
    year: '2007-2008',
    name: 'Dan White',
  },
  {
    year: '2008-2009',
    name: 'Jim McDaniel',
  },
  {
    year: '2009-2010',
    name: 'Robert Rumph',
  },
  {
    year: '2010-2011',
    name: 'George W. Jones',
  },
  {
    year: '2011-2012',
    name: 'Peter Warshaw',
  },
  {
    year: '2012-2013',
    name: 'Sam Harris',
  },
  {
    year: '2013-2014',
    name: 'Rick Ghinelli',
  },
  {
    year: '2014-2015',
    name: 'Bob Bryant',
  },
  {
    year: '2015-2016',
    name: 'Kathy Kuddes',
  },
  {
    year: '2016-2017',
    name: 'Dean Muths',
  },
  {
    year: '2017-2018',
    name: 'JD Janda',
  },
  {
    year: '2018-2019',
    name: 'Patricia Moreno',
  },
  {
    year: '2019-2020',
    name: 'Jay Lester',
  },
  {
    year: '2020-2021',
    name: 'Jim Egger',
  },
  {
    year: '2021-2022',
    name: 'Joe Clark',
  },
  {
    year: '2022-2023',
    name: 'Dinah Menger',
  },
];
