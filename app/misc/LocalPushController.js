import PushNotification from 'react-native-push-notification';

export const LocalNotification = data => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: '',
    subText: 'Local Notification Demo',
    title: data.pushNotification,
    message: '',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes","No"]',
    tag: 'some_tag',
    // date: new Date(Date.now() + 20 * 1000), // in 60 secs
  });
};
