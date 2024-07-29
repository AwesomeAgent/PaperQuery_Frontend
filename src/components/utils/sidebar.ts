import {
  Mic2,
  PlayCircle,
  LayoutGrid,
  RadioTower,
  ListMusic,
  Music2,
  User,
  Disc,
} from 'lucide-vue-next'

interface SidbarItems {
  header: string
  subItems: {
    title: string
    icon: any
    link: string
    selected?: boolean
  }[]
}

export const sidebarItems: SidbarItems[] = [
  {
    header: 'DashBoard',
    subItems: [
      {
        title: 'DashBoard',
        icon: PlayCircle,
        link: '/home/dashboard',
        selected: true,
      },
    ],
  },
  {
    header: 'Knowledge',
    subItems: [
      {
        title: 'Library',
        link: '/home/library',
        icon: ListMusic,
      },
    ],
  },
  {
    header: 'Settings',
    subItems: [
      {
        title: 'Settings',
        link: '/settings',
        icon: User,
      },
    ],
  },
]
