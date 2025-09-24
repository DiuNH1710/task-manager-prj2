import moment from "moment";
import "moment/locale/vi";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

const weekdaysVi = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

// export const formatDate = (date, lang = "en") => {
//   if (lang === "vi") {
//     const d = new Date(date);
//     const dayName = weekdaysVi[d.getDay()];
//     return `${dayName}, ${d.getDate()} tháng ${
//       d.getMonth() + 1
//     } ${d.getFullYear()}`;
//   } else {
//     return moment(date).locale("en-gb").format("dddd, Do MMM YYYY");
//   }
// };

export const formatDate = (date, lang = "en", formatType = "short") => {
  const m = moment(date);

  if (lang === "vi") {
    if (formatType === "short") {
      // Dạng ngắn tiếng Việt: 24/09/2025
      return m.format("DD/MM/YYYY");
    } else {
      // Dạng dài tiếng Việt: Thứ 4, 24 tháng 09 2025
      const dayOfWeek = weekdaysVi[m.day()];
      return `${dayOfWeek}, ${m.format("DD [tháng] MM YYYY")}`;
    }
  } else {
    // EN: Moment tự handle thứ, th, st, nd
    if (formatType === "short") {
      return m.format("Do MMM YYYY"); // 30th Sep 2025
    } else {
      return m.format("dddd, Do MMM YYYY"); // Wednesday, 30th Sep 2025
    }
  }
};
