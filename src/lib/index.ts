import type { Audio } from '@/types/Audio'
type Link = { text: string; link: string }

const generateLinkDetails = (text: string) => {
  return { link: '/' + text.replace(' ', '-'), text: text.charAt(0).toUpperCase() + text.slice(1) }
}
const links = ['overview', 'sermon', 'users', 'partnership', 'programs', 'locations']

export const linkInfo: Link[] = links.map((link) => generateLinkDetails(link))

export const audios: Audio[] = [
  {
    title: 'Prayer Altar',
    preacher: 'Apostle Arome Osayi',
    duration: '54 min',
    streams: 450,
    downloads: 750
  },
  {
    title: 'The Peace offering',
    preacher: 'Apostle Arome Osayi',
    duration: '2 hr',
    streams: 700,
    downloads: 1020
  },
  {
    title: 'The meal offering',
    preacher: 'Apostle Arome Osayi',
    duration: '2 hr',
    streams: 1040,
    downloads: 567
  }
]
