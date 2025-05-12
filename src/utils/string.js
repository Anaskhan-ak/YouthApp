import {images} from '../assets/images';
import {Moment, Yudio, LiveNow, NearBy, Home} from '../assets/images/svgs';

export const onboardingContent = [
  {
    id: 0,
    image: images.onboarding1,
    heading: 'YOUR TIME IS VALUABLE',
    description:
      '“Time is what we want most but what we use worst.” - The more you spend time and engage the more you Earn',
  },
  {
    id: 1,
    image: images.onboarding2,
    heading: 'CONNECT WITH FRIENDS',
    description:
      '“Time is what we want most but what we use worst.” - The more you spend time and engage the more you Earn',
  },
  {
    id: 2,
    image: images.onboarding3,
    heading: 'SHARE YOUR EXCITEMENT',
    description:
      '“Time is what we want most but what we use worst.” - The more you spend time and engage the more you Earn',
  },
  {
    id: 3,
    image: images.onboarding4,
    heading: 'LEARN, EARN & WORK',
    description:
      '“Time is what we want most but what we use worst.” - The more you spend time and engage the more you Earn',
  },
  {
    id: 4,
    image: images.onboarding5,
    heading: 'TOGETHER WE CAN \n CHANGE THE WORLD!',
    description:
      '“Time is what we want most but what we use worst.” - The more you spend time and engage the more you Earn',
  },
];
export const gender = [
  {
    id: 0,
    name: 'Male',
  },
  {
    id: 1,
    name: 'Female',
  },
  {
    id: 2,
    name: 'Prefer not to say',
  },
];
export const bottomTabs = [
  {
    screen: 'Moments',
    route: 'Moment',
    icon: <Moment width={24} height={24} />,
  },
  {
    screen: 'Yudio',
    route: 'Yudios',
    icon: <Yudio width={24} height={24} />,
  },
  {
    screen: 'Live Now',
    route: 'LiveNow',
    icon: <LiveNow width={24} height={24} />,
  },
  {
    screen: 'nearby',
    route: 'NearBy',
    icon: <NearBy width={24} height={24} />,
  },
];
