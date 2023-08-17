export function parseDate(date) {
  let str = date.toString()
  return {
    year: str.slice(0,4),
    month: str.slice(5,7),
    day: str.slice(8,10),
    hour: str.slice(11,13),
    minute: str.slice(14,16),
    second: str.slice(17,19)
  }
}

export function parseMonth(str) {
  switch(str) {
    case '1':
      return 'January'
    case '2':
      return 'February'
    case '3':
      return 'March'
    case '4':
      return 'April'
    case '5':
      return 'May'
    case '6':
      return 'June'
    case '7':
      return 'July'
    case '8':
      return 'August'
    case '9':
      return 'September'
    case '10':
      return 'October'
    case '11':
      return 'November'
    case '12':
      return 'December'
  }
}

export function daySuffix(str) {
  switch (str) {
    case '1':
    case '21':
    case '31':
      return 'st'
    case '2':
    case '22':
      return 'nd'
    case '3':
    case '23':
      return 'rd'
    default:
      return 'th'
  }
}