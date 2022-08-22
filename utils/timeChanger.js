const korToUtc = (date) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const curr = new Date(date);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  return new Date(utc - KR_TIME_DIFF);
};

const utcToKor = (date) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const curr = new Date(date);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  return new Date(utc + KR_TIME_DIFF);
};

const YYMMDDhhmmss = (date) => {
  if (date == null) return null;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const curr = new Date(date);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  const kor = new Date(utc + KR_TIME_DIFF);

  const YY = kor.getFullYear();
  const MM =
    kor.getMonth() + 1 < 10 ? "0" + (kor.getMonth() + 1) : kor.getMonth() + 1;
  const DD = kor.getDate() < 10 ? "0" + kor.getDate() : kor.getDate();
  const hh = kor.getHours() < 10 ? "0" + kor.getHours() : kor.getHours();
  const mm = kor.getMinutes() < 10 ? "0" + kor.getMinutes() : kor.getMinutes();
  const ss = kor.getSeconds() < 10 ? "0" + kor.getSeconds() : kor.getSeconds();

  return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};

const YYMMDD = (date) => {
  if (date == null) return null;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const curr = new Date(date);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  const kor = new Date(utc + KR_TIME_DIFF);

  const YY = kor.getFullYear();
  const MM =
    kor.getMonth() + 1 < 10 ? "0" + (kor.getMonth() + 1) : kor.getMonth() + 1;
  const DD = kor.getDate() < 10 ? "0" + kor.getDate() : kor.getDate();
  return `${YY}-${MM}-${DD}`;
};

const to_date = (date_str) => {
  const yyyyMMdd = String(date_str);
  const sYear = yyyyMMdd.substring(0, 4);
  const sMonth = yyyyMMdd.substring(4, 6);
  const sDate = yyyyMMdd.substring(6, 8);

  const hour = yyyyMMdd.substring(8, 10);
  const minute = yyyyMMdd.substring(10, 12);
  const second = yyyyMMdd.substring(12, 14);

  return new Date(
    Number(sYear),
    Number(sMonth) - 1,
    Number(sDate),
    Number(hour),
    Number(minute),
    Number(second)
  );
};

const checkValidDate = (value) => {
  var result = true;
  try {
    var date = value.split("-");
    var y = parseInt(date[0], 10),
      m = parseInt(date[1], 10),
      d = parseInt(date[2], 10);

    var dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    result = dateRegex.test(d + "-" + m + "-" + y);
  } catch (err) {
    result = false;
  }
  return result;
};

const getID = () => {
  return (
    YYMMDD(new Date()).replaceAll("-", "") + "-" + generateRandomString(10)
  );
};

const generateRandomString = (num) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export {
  korToUtc,
  utcToKor,
  YYMMDDhhmmss,
  YYMMDD,
  to_date,
  checkValidDate,
  getID,
};
