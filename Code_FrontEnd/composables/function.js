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