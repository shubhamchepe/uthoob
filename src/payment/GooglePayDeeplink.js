import { Linking } from 'react-native';

const openGooglePay = () => {
const url = `https://pay.google.com/gp/v/send?pa=shubhamchepe@oksbi&am=100&cu=INR`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Unable to open Google Pay');
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

export default openGooglePay;