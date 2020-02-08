import PushNotification from 'react-native-push-notification';

export const LocalNotification = data => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'This is loacal notification in RN App. Only show,when expanded.',
    subText: 'Local Notification Demo',
    title: 'some message',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes","No"]',
    tag: 'some_tag',
    // date: new Date(Date.now() + 20 * 1000), // in 60 secs
  });
};
