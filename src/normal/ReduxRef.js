import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../redux/slices/counter';

const Screen1 = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  console.log(count);
  // const [counter, setCounter] = useState(0);
  // const handleIncreament = () => {
  //   setCounter(counter + 1);
  // };
  // const handleDecreament = () => {
  //   setCounter(counter - 1);
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Counter App</Text>
      <Text style={styles.counter_text}>{count}</Text>

      <TouchableOpacity
        onPress={() => dispatch(increment())}
        style={styles.btn}>
        <Text style={styles.btn_text}> Increment </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(decrement())}
        style={{...styles.btn, backgroundColor: '#6e3b3b'}}>
        <Text style={styles.btn_text}> Decrement </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50,
  },
  title_text: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 55,
    color:'#000'
  },
  counter_text: {
    fontSize: 35,
    fontWeight: '900',
    margin: 15,
    color:'#000'
  },
  btn: {
    backgroundColor: '#086972',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 23,
    color: '#fff',
  },
});

export default Screen1;
