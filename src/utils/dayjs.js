import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

// 扩展插件
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

// 默认语言
dayjs.locale("zh-cn");

/**
 * 设置 dayjs 语言
 */
export function setDayjsLocale(locale) {
  const localeMap = {
    "zh-CN": "zh-cn",
    "en-US": "en",
  };
  dayjs.locale(localeMap[locale] || "zh-cn");
}

/**
 * 格式化日期
 */
export function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") {
  return date ? dayjs(date).format(format) : "";
}

/**
 * 相对时间
 */
export function fromNow(date) {
  return date ? dayjs(date).fromNow() : "";
}

/**
 * 获取日期范围
 */
export function getDateRange(type = "today") {
  const now = dayjs();

  switch (type) {
    case "today":
      return [now.startOf("day"), now.endOf("day")];
    case "yesterday":
      return [
        now.subtract(1, "day").startOf("day"),
        now.subtract(1, "day").endOf("day"),
      ];
    case "week":
      return [now.startOf("week"), now.endOf("week")];
    case "month":
      return [now.startOf("month"), now.endOf("month")];
    case "year":
      return [now.startOf("year"), now.endOf("year")];
    default:
      return [now.startOf("day"), now.endOf("day")];
  }
}

export default dayjs;
