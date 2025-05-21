import {images} from '../assets/images';
import {Moment, Yudio, LiveNow, NearBy, Plus,Notification,Chat,Search, Trending} from '../assets/images/svgs';

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
export const sideBarOptions = [
    {
      screen: 'openSheet',
      func: 'openSheet',
      icon: <Plus width={18} height={18} />,
    },
    {
      screen: 'notification',
      route: 'Notification',
      icon: <Notification width={24} height={24} />,
    },
    {
      screen: 'chat',
      route: 'Chat',
      icon: <Chat width={24} height={24} />,
    },
    {
      screen: 'search',
      route: 'Search',
      icon: <Search width={18} height={18} />,
    },
];
export const homeCategoryOptions = [
  {
    id: 1,
    name: 'Trending Now',
    icon: <Trending width={18} height={18} />,
  },
  {
    id: 2,
    name: 'For You',
    icon: null,
  },
  {
    id: 3,
    name: 'Following',
    icon: null,
  },
];
export const sideBottomSheetOptions = [
  {
    id: 'post',
    title: 'Post',
    desc: 'To make sure your post reaches the right people...',
  },
  {
    id: 'moments',
    title: 'Moments',
    desc: 'To make sure your Moments reach the right people...',
  },
  {
    id: 'yudio',
    title: 'Yudio',
    desc: 'To make sure your Yudio reaches the right people...',
  },
  {
    id: 'story',
    title: 'Story',
    desc: 'Share your Daily best moments with the friends...',
  },
  {
    id: 'live',
    title: 'Live',
    desc: 'Go live and share more moments and values...',
  },
  {
    id: 'event',
    title: 'Event',
    desc: 'Arrange an event with friends in your city...',
  },
];
