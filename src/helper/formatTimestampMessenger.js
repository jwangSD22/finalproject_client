import {format,isToday,isThisWeek } from 'date-fns'

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    if (isToday(date)) {
      return format(date, 'p'); // Format time (e.g., 10:30 AM)
    }
  
    if (isThisWeek(date)) {
      return format(date, 'EEE'); // Format day abbreviation (e.g., Mon, Tue)
    }
  
    return format(date, 'MMM d'); // Format month abbreviation and date (e.g., Jan 15)
  }

  
  export default formatTimestamp
