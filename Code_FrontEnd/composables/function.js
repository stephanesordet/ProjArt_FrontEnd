// ---------------------- Function that transform date to format YYYY-MM-DD -----------------------------
export function changeFormatDate(date) {
    let myDate = date;
  
    myDate = myDate.replace(" ", "T");
    const z = "Z";
    myDate = myDate.concat(z);
  
    const time = new Date(myDate).toLocaleTimeString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  // ---------------------- Function that transform date to format YYYY-MM-DD, without hours and minutes  -----------------------------
  export function changeFormatDateWithoutHoursMinutes(date) {
    let myDate = date;
  
    myDate = myDate.replace(" ", "T");
    const z = "Z";
    myDate = myDate.concat(z);
  
    const time = new Date(myDate).toLocaleTimeString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return time.split(',')[0];
  }

    // ---------------------- Function that transform date to format YYYY-MM-DD, to DD/MM/YYYY  -----------------------------
    export function changeFormatDateBasic(date) {
      const [year, month, day] = date.split('-');
      const result = [day, month, year].join(' / ');
      return result;
    }