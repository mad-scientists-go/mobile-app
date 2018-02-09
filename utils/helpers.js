

export const dateReformat = (date) => {
  let regDate = (stamp) => {
  stamp = stamp.slice(1, stamp.indexOf('.'))
  let hrs = Number(stamp.slice(0, stamp.indexOf(':')));
  hrs > 12 ? stamp = (hrs-12) + ':' + stamp.slice(stamp.indexOf(':' ) + 1, stamp.length-3) : hrs
  return stamp
}
  let dateArr = date.slice(0, 10).split('-'),
  stamp = date.slice(10, date.length);
  console.log(stamp)
  let year = dateArr[0],
      month = dateArr[1],
      day = dateArr[2];
      dateArr[0] = month;
      dateArr[2] = year,
      dateArr[1] = day;

      return dateArr.join('-') + ' ' +  regDate(stamp)
}

