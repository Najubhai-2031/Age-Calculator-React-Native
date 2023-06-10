import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import BannerAds from './BannerAd';
import TextComponent from './Text';
import TextInputComponent from './TextInput';

const AgeCalculator = () => {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [ageResult, setAgeResult] = useState('');
  const [yearResult, setYearResult] = useState('00');
  const [monthResult, setMonthResult] = useState('00');
  const [dayResult, setDayResult] = useState('00');
  const [weeks, setWeeks] = useState('00')
  const [extraDays, setExtraDays] = useState('00')


  const calculateAge = () => {
    const bd = parseInt(birthDay);
    const bm = parseInt(birthMonth);
    const by = parseInt(birthYear);
    const cd = parseInt(currentDay);
    const cm = parseInt(currentMonth);
    const cy = parseInt(currentYear);

    if (!by || !bm || !bd || !cy || !cm || !cd) {
      setAgeResult('Please enter valid dates.');
      return;
    }

    const birthDate = new Date(by, bm - 1, bd);
    const currentDate = new Date(cy, cm - 1, cd);

    if (birthDate > currentDate) {
      setAgeResult('Birth date cannot be in the future.');
      return;
    }

    const ageInMilliseconds = currentDate - birthDate;
    const ageDate = new Date(ageInMilliseconds);

    const ageYears = ageDate.getUTCFullYear() - 1970;
    const ageMonths = ageDate.getUTCMonth();
    const ageDays = ageDate.getUTCDate() - 1;
    const startDate = `${birthDay}-${birthMonth}-${birthYear}`;
    const endDate = `${currentDay}-${currentMonth}-${currentYear}`;

    setYearResult(ageYears)
    setMonthResult(ageMonths)
    setDayResult(ageDays)
    setAgeResult('')
    countWeeks(startDate, endDate)
    countDays(startDate, endDate)
  };

  const validateInput = () => {
    const isValidDay = /^\d{1,2}$/.test(birthDay) && /^\d{1,2}$/.test(currentDay);
    const isValidMonth = /^\d{1,2}$/.test(birthMonth) && /^\d{1,2}$/.test(currentMonth);
    const isValidYear = /^\d{4}$/.test(birthYear) && /^\d{4}$/.test(currentYear);

    if (!isValidDay) {
      setAgeResult('Day should have only 2 letters.');
      return false;
    }
    if (!isValidMonth) {
      setAgeResult('Month should have only 2 letters.');
      return false;
    }
    if (!isValidYear) {
      setAgeResult('Year should have only 4 letters.');
      return false;
    }

    const maxDay = birthMonth === '2' ? (isLeapYear(birthYear) ? 29 : 28) : (birthMonth === '4' || birthMonth === '6' || birthMonth === '9' || birthMonth === '11' ? 30 : 31);

    const maxCurrentDay = currentMonth === '2' ? (isLeapYear(currentYear) ? 29 : 28) : (currentMonth === '4' || currentMonth === '6' || currentMonth === '9' || currentMonth === '11' ? 30 : 31);


    if (birthMonth > 12 || currentMonth > 12) {
      setAgeResult('Please enter valid Month.');
      return false;
    }

    if (birthYear > 9999 || currentYear > 9999) {
      setAgeResult('Please enter valid Year.');
      return false;
    }
    if (parseInt(birthDay) > maxDay || parseInt(currentDay) > maxCurrentDay) {
      setAgeResult('Please enter valid days.');
      return false;
    }
    return true;
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  function countWeeks(startDate, endDate) {
    const startParts = startDate.split("-");
    const endParts = endDate.split("-");

    const start = new Date(startParts[2], startParts[1] - 1, startParts[0]);
    const end = new Date(endParts[2], endParts[1] - 1, endParts[0]);

    const timeDifference = end - start;
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    setWeeks(weeks);
  }

  const clearValue = () => {
    setBirthDay('')
    setBirthMonth('')
    setBirthYear('')
    setCurrentDay('')
    setCurrentMonth('')
    setCurrentYear('')
    setAgeResult('')
    setYearResult('00')
    setMonthResult('00')
    setDayResult('00')
    setWeeks('00')
    setExtraDays('00')
  }

  function countDays(startDate, endDate) {
    const startParts = startDate.split("-");
    const endParts = endDate.split("-");

    const start = new Date(startParts[2], startParts[1] - 1, startParts[0]);
    const end = new Date(endParts[2], endParts[1] - 1, endParts[0]);

    const timeDifference = end - start;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setExtraDays(days);
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    const [year, month, day] = currentDate.split('-');
    setCurrentYear(year);
    setCurrentMonth(month);
    setCurrentDay(day);
  }, []);

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={styles.content}>
          <TextComponent name={'Heading'} title={'Date of Birth'} />

          <View style={styles.inputContainer}>
            <TextInputComponent
              placeholder={'DD'}
              keyboardType={'numeric'}
              value={birthDay}
              onChangeText={setBirthDay}
              maxLength={2}
            />
            <TextInputComponent
              placeholder={'MM'}
              keyboardType={'numeric'}
              value={birthMonth}
              onChangeText={setBirthMonth}
              maxLength={2}
            />
            <TextInputComponent
              placeholder={'YYYY'}
              keyboardType={'numeric'}
              value={birthYear}
              onChangeText={setBirthYear}
              maxLength={4}
            />
          </View>

          <TextComponent name={'Heading'} title={`Today's Date`} />

          <View style={styles.inputContainer}>
            <TextInputComponent
              placeholder={'DD'}
              keyboardType={'numeric'}
              value={currentDay}
              onChangeText={setCurrentDay}
              maxLength={2}
            />
            <TextInputComponent
              placeholder={'MM'}
              keyboardType={'numeric'}
              value={currentMonth}
              onChangeText={setCurrentMonth}
              maxLength={2}
            />
            <TextInputComponent
              placeholder={'YYYY'}
              keyboardType={'numeric'}
              value={currentYear}
              onChangeText={setCurrentYear}
              maxLength={4}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.clearButton} onPress={() => { clearValue() }}>

              <TextComponent name={'button'} title={'Clear'} />

            </TouchableOpacity>
            <TouchableOpacity style={styles.calculateButton} onPress={() => {
              if (validateInput()) {
                calculateAge();
              }
            }}>
              <TextComponent name={'button'} title={'Calculate'} />

            </TouchableOpacity>
          </View>
          <TextComponent name={"Error"} info={ageResult}/>
          <View style={styles.displayData}>
            <TextComponent name={'Heading'} title={'Your Age'} />

            <TextComponent name={'result'} ageResult={ageResult} info={ageResult ? '00' : yearResult} title={'Years'} />

            <TextComponent name={'result'} ageResult={ageResult} info={ageResult ? '00' : monthResult} title={'Months'} />

            <TextComponent name={'result'} ageResult={ageResult} info={ageResult ? '00' : dayResult} title={'Days'} />

          </View>

          <View style={styles.bannerAds}>
            <BannerAds />
          </View>

          <View style={styles.displayExtraData}>
            <TextComponent name={'Heading'} title={'Extra Info'} />

            <View style={styles.displayExtraResult}>
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : yearResult} title={'Total Years:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : yearResult !== '00' && monthResult !== '00' ? ((yearResult * 12) + (monthResult)) : '00'} title={'Total Months:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={weeks} title={'Total Weeks:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : extraDays} title={'Total Days:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : extraDays !== '00' ? (extraDays * 24) : '00'} title={'Total Hours:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : extraDays !== '00' ? (extraDays * 24 * 60) : '00'} title={'Total Minuts:'} />
              <TextComponent name={'extraInfo'} ageResult={ageResult} info={ageResult ? '00' : extraDays !== '00' ? (extraDays * 24 * 60 * 60) : '00'} title={'Total seconds:'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '50%'
  },
  displayData: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    padding: 10,
    borderColor: '#1B6DC1',
    backgroundColor: '#fff'
  },
  displayExtraData: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 5,
    width: 330,
    padding: 10,
    borderColor: '#1B6DC1',
    margin: 10,
    marginBottom: 180
  },
  displayExtraResult: {
    padding: 10,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: '#f0f0f0'
  },
  clearButton: {
    padding: 10,
    width: "40%",
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    color: 'black',
    borderColor: '#1B6DC1'
  },
  calculateButton: {
    padding: 10,
    backgroundColor: '#1B6DC1',
    borderRadius: 5,
    width: "40%",
    color: 'white',
  },
  bannerAds: {
    marginBottom: 5,
    backgroundColor: "#fff"
  }
});

export default AgeCalculator;
