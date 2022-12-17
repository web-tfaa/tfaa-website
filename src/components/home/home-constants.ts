// Internal Dependencies
import theme from '../../gatsby-theme-material-ui-top-layout/theme';
import { appName, appNameShort, appNameOldShort } from '../../utils/app-constants';

export const TAKE_ACTION_DATA = [
  {
    color: theme.palette.tfaa.about,
    subtitle: "Learn how we're helping Texas Fine Arts leaders",
    title: `About ${appNameShort}`,
    to: '/about',
  },
  {
    color: theme.palette.tfaa.events,
    subtitle: 'Find out about upcoming events and how to participate',
    title: 'Events',
    to: '/events',
  },
  {
    color: theme.palette.tfaa.resources,
    subtitle: 'Enhance your leadership and management skills',
    title: 'Resources',
    to: '/resources',
  },
  {
    color: theme.palette.tfaa.membership,
    subtitle: 'Be a part of the most influential Fine Arts organization in Texas',
    title: 'Membership',
    to: '/members',
  },
  {
    color: theme.palette.tfaa.signIn,
    subtitle: 'Access to your account and resources.',
    title: 'Sign In',
    to: '/members/login',
  },
];

export const WHAT_WE_DO_DATA = [
  {
    imgSrc: 'https://res.cloudinary.com/tmac/image/upload/v1670856123/bearded-man-looking-at-paintings-in-art-gallery.png',
    subtitle: `${appNameOldShort} ${appName} is launching a new website in the coming weeks that will allow for improved communication and organization among its members...`,
    title: `${appNameShort} will launch a new website in 2022`,
    to: '/about',
  },
  {
    imgSrc: 'https://res.cloudinary.com/tmac/image/upload/v1670856123/joyful-young-female-artist-painting-on-canvas.png',
    subtitle: 'Learn how you can join advocacy efforts to keep Fine Arts education strong in Texas.',
    title: 'The State of Fine Arts Education in Texas',
    to: '/members',
  },
  {
    imgSrc: 'https://res.cloudinary.com/tmac/image/upload/v1671285343/spray-paint-artist-performing-at-a-street-exhibit.png',
    subtitle: 'Soon',
    title: appNameShort,
    to: '/about',
  },
];

export const STATISTICS_DATA = [
  {
    statLabel: '52 years dedicated to Fine Arts education',
    statValue: '52',
  },
  {
    statLabel: 'Board committee Voluntary members',
    statValue: '18',
  },
  {
    statLabel: 'over 3,000 schools',
    statValue: '3,000',
  },
  {
    statLabel: '5+ million students served',
    statValue: '5+',
  },
];
