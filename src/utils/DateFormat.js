




import moment from 'jalali-moment';

const DateFormat = ({ dateString = '' } = {}) => {
  // بررسی اینکه آیا dateString ارسال شده است
  // if (!dateString) return "تاریخ نامعتبر است";
  if (!dateString) return "";

  // تبدیل تاریخ میلادی به شمسی
  const date = moment(dateString, 'YYYY-MM-DDTHH:mm:ssZ').locale('fa');

  // بررسی معتبر بودن تاریخ
  // if (!date.isValid()) return "تاریخ نامعتبر است";
  if (!date.isValid()) return " ";

  // استخراج سال، ماه و روز شمسی
  const year = date.jYear();
  const month = String(date.jMonth() + 1).padStart(2, '0');
  const day = String(date.jDate()).padStart(2, '0');

  // استخراج ساعت، دقیقه و ثانیه
  const hours = String(date.hour()).padStart(2, '0');
  const minutes = String(date.minute()).padStart(2, '0');
  const seconds = String(date.second()).padStart(2, '0');

  // بازگشت تاریخ به فرمت مورد نظر
  return ` ${year}/${month}/${day} - ${hours}:${minutes}`;
};

export default DateFormat;

















// const DateFormat = (dateString) => {
//     // Parse the date string into a Date object
//   const date = new Date(dateString);

//   // Extract the year, month, and day
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero if necessary
//   const day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero if necessary

//   // Extract the hours, minutes, and seconds
//   const hours = String(date.getHours()).padStart(2, '0'); // Pad with leading zero if necessary
//   const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad with leading zero if necessary
//   const seconds = String(date.getSeconds()).padStart(2, '0'); // Pad with leading zero if necessary

//   // Return the formatted date and time string
//   return ` ${year}/${month}/${day}`;
//   };
  
// export default DateFormat



