export function formatTime(time24: string) {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`
}

export function formatDay(date: Date) {
  const day = date.getDate()
  const suffixes = ['st', 'nd', 'rd']
  const suffix =
    day % 10 < 4 && day % 10 > 0 && (day < 11 || day > 13) ? suffixes[(day % 10) - 1] : 'th'
  return day + suffix
}

export function formatDate(date: Date) {
  const day = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  const suffix =
    day % 10 < 4 && day % 10 > 0 && (day < 11 || day > 13)
      ? ['st', 'nd', 'rd'][(day % 10) - 1]
      : 'th'
  return `${day}${suffix} ${monthNames[monthIndex]}, ${year}`
}
