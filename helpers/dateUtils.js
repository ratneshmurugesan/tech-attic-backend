var eachDayOfInterval = require("date-fns/eachDayOfInterval");
const { getDate, getMonth, getYear, getWeek, getQuarter } = require("date-fns");

const getDateColln = function (start, end) {
  const dt = eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
  });
  return dt;
};

const timeAggMap = {
  dateindex: {
    timeAggLabel: date =>
      `${getYear(new Date(date))}${(getMonth(new Date(date)) + 1)
        .toString()
        .padStart(2, 0)}${getDate(new Date(date)).toString().padStart(2, 0)}`,
  },
  weekindex: {
    timeAggLabel: date =>
      `${getYear(new Date(date))}${getWeek(new Date(date))
        .toString()
        .padStart(2, 0)}`,
  },
  monthindex: {
    timeAggLabel: date =>
      `${getYear(new Date(date))}${(getMonth(new Date(date)) + 1)
        .toString()
        .padStart(2, 0)}`,
  },
  quarterindex: {
    timeAggLabel: date =>
      `${getYear(new Date(date))}${getQuarter(new Date(date))
        .toString()
        .padStart(2, 0)}`,
  },
};

module.exports = {
  getDateColln,
  timeAggMap,
};
