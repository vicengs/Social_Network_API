/* ----------------------------- */
/* Project  : Social Network API */
/* File     : dateFormat.js      */
/* Author   : Vicente Garcia     */
/* Date     : 06/10/2022         */
/* Modified : 06/10/2022         */
/* ----------------------------- */
// Function to get ordinal date
const addDateSuffix = date => {
    // Declare variable
    let dateStr = date.toString();
    // Get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
    // Validate number to prepare suffix
    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    };
    // Return the formated date
    return dateStr;
};
// Function to format a timestamp, accepts the timestamp and an options object as optional parameters
module.exports = ( timestamp, { monthLength = 'short', dateSuffix = true } = {} ) => {
    // Variable to store letters month
    let months;
    // Validation to get the month in short word
    if (monthLength === 'short') {
        months = { 0: 'Jan'
                  ,1: 'Feb'
                  ,2: 'Mar'
                  ,3: 'Apr'
                  ,4: 'May'
                  ,5: 'Jun'
                  ,6: 'Jul'
                  ,7: 'Aug'
                  ,8: 'Sep'
                  ,9: 'Oct'
                  ,10: 'Nov'
                  ,11: 'Dec'};
    // Validation to get the month in large word
    } else {
        months = { 0: 'January'
                  ,1: 'February'
                  ,2: 'March'
                  ,3: 'April'
                  ,4: 'May'
                  ,5: 'June'
                  ,6: 'July'
                  ,7: 'August'
                  ,8: 'September'
                  ,9: 'October'
                  ,10: 'November'
                  ,11: 'December'
        };
    };
    // Variable to store the new Date object
    const dateObj = new Date(timestamp);
    // Variable to store month in word
    const formattedMonth = months[dateObj.getMonth()];
    // Variable to store day of month
    let dayOfMonth;
    // Validation to get the ordinal day of month
    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }
    // Variable to store the year
    const year = dateObj.getFullYear();
    // Variable to store the hour
    let hour;
    // Validate format time
    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }
    // Ff hour is 0 (12:00am), change it to 12
    if (hour === 0) {
        hour = 12;
    }
    // Variable to store minutes
    const minutes = dateObj.getMinutes();
    // Variable to store ante meridiem or post meridiem
    let periodOfDay;
    // Validate if it is post meridiem or ante meridiem
    if (dateObj.getHours() >= 12) {
        periodOfDay = 'pm';
    } else {
        periodOfDay = 'am';
    }
    // Variable to store the formated date
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
    // Return the formated date
    return formattedTimeStamp;
};
