import { images } from '../assets/images';
import { Chat, Eye, LiveNow, Moment, NearBy, Notification, Plus, QR, Search, SwitchAcc, Trending, UserFollow, YouthCoin, Yudio } from '../assets/images/svgs';

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
    route: 'Moments',
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
      icon: <Plus width={14} height={14} />,
    },
    {
      screen: 'notification',
      route: 'Notifications',
      icon: <Notification width={18} height={18} />,
    },
    {
      screen: 'chat',
      route: 'ChatInbox',
      icon: <Chat width={24} height={24} />,
    },
    {
      screen: 'search',
      route: 'Search',
      icon: <Search width={14} height={14} />,
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
   {
    id: 4,
    name: 'Swipe',
    icon: null,
  },
];
export const sideBottomSheetOptions = [
  {
    id: 'post',
    title: 'Post',
    desc: 'To make sure your post reaches the right people...',
    route:'CreatePost'
  },
  {
    id: 'moments',
    title: 'Moments',
    desc: 'To make sure your Moments reach the right people...',
    route:'CreateMoment'
  },
  {
    id: 'yudio',
    title: 'Yudio',
    desc: 'To make sure your Yudio reaches the right people...',
    route:'CreateYudio'
  },
  {
    id: 'story',
    title: 'Story',
    desc: 'Share your Daily best moments with the friends...',
    route:'CreateStory'
  },
  {
    id: 'live',
    title: 'Live',
    desc: 'Go live and share more moments and values...',
    route:''
  },
  {
    id: 'event',
    title: 'Event',
    desc: 'Arrange an event with friends in your city...',
    route:''
  },
];
export const profileOptions = [
  {
    id: 'follow',
    icon:<UserFollow/>,
    route:''
  },
  {
    id: 'qr',
    icon:<QR/>,
    route:''
  },
  {
    id: 'eye',
    icon:<Eye/>,
    route:''
  },
  {
    id: 'youth',
    icon:<YouthCoin/>,
    route:''
  },
  {
    id: 'changeAcc',
    icon:<SwitchAcc/>,
    route:''
  },
  {
   id: 'editProfile',
    icon:'Edit Profile',
    route:''
  },
];

export const albumIds = [
  {
    type : 'MEDIA',
    id : 'cmc33arm10003r2tj2x6rutlq'
  },
  {
    type : 'YUDIO',
    id : 'cmc33e3ae0007r2tjabp0hmyh'
  },
  {
    type : 'DOCUMENT',
    id : 'cmc33ehcb000dr2tjka5tftlo'
  },
  {
    type : 'EVENT',
    id : 'cm6hvc3lt00091jdq5xgnd47r'
  },
]
