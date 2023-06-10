import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid, View } from 'react-native';
import AgeCalculator from './component/AgeCalculator';
import WelcomeScreen from './component/WelcomeScreen';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import HeaderComponent from './component/Header';


const adUnitId = 'ca-app-pub-5281232809145309/3351031309';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true
});

const App = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(true)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false)
    }, 4000)

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
    interstitial.load();
    return unsubscribe;
  }, [isSplashScreen])

  useEffect(() => {
    setTimeout(() => {
      interstitial.show();
    }, 6000)
  }, [])

  const backPressCountRef = useRef(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (backPressCountRef.current < 1) {
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
        backPressCountRef.current += 1;
        setTimeout(() => {
          backPressCountRef.current = 0;
        }, 2000);
        return true;
      }
      return false;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View>
      {isSplashScreen ? null : <HeaderComponent />}
      {isSplashScreen ? <WelcomeScreen /> : <AgeCalculator />}
    </View>
  );
};

export default App;
