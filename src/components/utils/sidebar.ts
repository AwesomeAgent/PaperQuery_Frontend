import { PlayCircle, ListMusic, User } from 'lucide-vue-next'

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
    header: 'Chat',
    subItems: [
      {
        title: 'Chat',
        link: '/home/chat',
        icon: User,
      },
    ],
  },
  {
    header: 'Forum',
    subItems: [
      {
        title: '论坛',
        link: '/home/forum/threads',
        icon: User,
      },
    ],
  },
]
