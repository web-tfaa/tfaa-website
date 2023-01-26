// Internal Dependencies
import { appName, appNameShort, appNameOldShort } from '../../utils/app-constants';
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
