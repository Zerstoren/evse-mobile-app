export const getTimeInMinutes = (time: number) => {
  const dateWithTimeZone = new Date(time);
  const userTimezoneOffset = dateWithTimeZone.getTimezoneOffset() * 60000;
  const date = new Date(dateWithTimeZone.getTime() - userTimezoneOffset);
  return date.getUTCHours() * 60 + date.getUTCMinutes();
};

export const transformMinutesToTime = (time: number) => {
  const hours = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (time % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const transformFromMinutesToDateTime = (time: number) => {
  const date = new Date();
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  date.setHours(hours, minutes, 0, 0);
  return date;
};
