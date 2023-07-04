import {format,isToday,isThisWeek,isValid } from 'date-fns'

function formatTimestamp(timestamp) {


  const date = new Date(timestamp);


  if(isValid(date)){

  
    if (isToday(date)) {
      return format(date, 'p'); // Format time (e.g., 10:30 AM)
    }
  
    if (isThisWeek(date)) {
      return format(date, 'EEE'); // Format day abbreviation (e.g., Mon, Tue)
    }
  
    return format(date, 'MMM d'); // Format month abbreviation and date (e.g., Jan 15)
  }
  else{
    return ''
  }


  }

  
  export default formatTimestamp


