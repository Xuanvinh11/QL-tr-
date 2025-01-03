import { formatInTimeZone } from "date-fns-tz";

class StringUtils {
  static formatPriceVND(value) {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  static formatTime(time) {
    const dateStr = `1970-01-01T${time}Z`;
    const date = new Date(dateStr);
    const formattedTime = formatInTimeZone(date, "Asia/Ho_Chi_Minh", "HH:mm");

    return formattedTime;
  }
}

export default StringUtils;
