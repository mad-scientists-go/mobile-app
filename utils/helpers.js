// import React from 'react';
// import { Notifications, Permissions } from 'expo';
// import { View, StyleSheet, AsyncStorage } from 'react-native';
// const NOTIFICATION_KEY = 'MobileFlashcards:notifications';


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
// export function clearLocalNotification () {
//     return AsyncStorage.removeItem(NOTIFICATION_KEY)
//     .then(Notifications.cancelAllScheduledNotificationsAsync)
//   }

//   function createNotification () {
//     return {
//       title: "Study your flashcards!",
//       body: "Don't forget to study today!",
//       ios: {
//         sound: true
//       },
//       android: {
//         sound: true,
//         priority: 'high',
//         sticky: false,
//         vibrate: true
//       }
//     }
//   }

//   export function setLocalNotification () {
//     AsyncStorage.getItem(NOTIFICATION_KEY)
//       .then(JSON.parse)
//       .then((data) => {

//         if (data === null) {
//           Permissions.askAsync(Permissions.NOTIFICATIONS)
//             .then(({ status }) => {
//               if (status === 'granted') {
//                 Notifications.cancelAllScheduledNotificationsAsync()

//                 let tomorrow = new Date()
//                 tomorrow.setDate(tomorrow.getDate() + 1)
//                 tomorrow.setHours(12)
//                 tomorrow.setMinutes(30)

//                 Notifications.scheduleLocalNotificationAsync(
//                   createNotification(),
//                   {
//                     time: tomorrow,
//                     repeat: 'day'
//                   }
//                 )

//                 AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//               }
//             })
//         }
//       })
//   }
