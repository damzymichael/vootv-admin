type Link = { text: string; link: string }

export const generateLinkDetails = (text: string) => {
  return { link: '/' + text.replace(' ', '-'), text: text.charAt(0).toUpperCase() + text.slice(1) }
}
const links = ['overview', 'sermon', 'users', 'partnership', 'programs', 'locations']

export const linkInfo: Link[] = links.map((link) => generateLinkDetails(link))
