type Link = { text: string; link: string }

const generateLinkDetails = (text: string) => {
  return { link: '/' + text.replace(' ', '-'), text: text.charAt(0).toUpperCase() + text.slice(1) }
}
const links = ['overview', 'sermon', 'users', 'payments', 'programs', 'locations']

export const linkInfo: Link[] = links.map((link) => generateLinkDetails(link))
