import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const UiTest = () => {
  const [isLoading, SetLoading] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center'}}>
      {/* UPPER PART OF HEADER INCLUDING LOGO & SEARCH PART === START*/}
      <View
        style={{
          width: '100%',
          height: '7%', // 7 PERCENT
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/play_store_512.png')}
              style={{width: 30, height: 30, marginLeft: 10, borderRadius: 10}}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '900',
                marginLeft: 10,
                letterSpacing: 1,
              }}>
              UTHOOB
            </Text>
          </View>
        </View>
        {/* DIVISION BETWEEN TWO PARTS OF HEADER*/}
        <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 40}}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/search.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginRight: 20}}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* UPPER PART OF HEADER INCLUDING LOGO & SEARCH PART ==== END*/}
      {/* SUBSCRIPTION COMPONENT === START*/}
      <View
        style={{
          width: '100%',
          height: '12%', //12 PERCENT
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                {isLoading ? (
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.12)',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                    }}></View>
                ) : (
                  <Image
                    source={require('../../assets/avatar.png')}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: '#cccccc',
                    }}
                  />
                )}

                <Text style={{color: '#000', fontSize: 12, marginTop: 5}}>
                  Channel Title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#cccccc',
                  }}
                />
                <Text style={{color: '#000', fontSize: 12, marginTop: 5}}>
                  Channel Title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#cccccc',
                  }}
                />
                <Text style={{color: '#000', fontSize: 12, marginTop: 5}}>
                  Channel Title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#cccccc',
                  }}
                />
                <Text style={{color: '#000', fontSize: 12, marginTop: 5}}>
                  Channel Title
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../assets/avatar.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#cccccc',
                  }}
                />
                <Text style={{color: '#000', fontSize: 12, marginTop: 5}}>
                  Channel Title
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* SUBSCRIPTION COMPONENT === END*/}
      {/* VIDEO LIST COMPONENT === START*/}

      <View
        style={{flex: 1, width: '100%', height: '81%', alignItems: 'center'}}>
        <View
          style={{
            width: '90%',
            height: '45%',
            marginTop: 5,
            borderRadius: 15,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', height: '75%', borderRadius: 15}}>
            <Image
              source={require('../../assets/thumb.jpg')}
              style={{width: '100%', height: '100%', borderRadius: 15}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '25%',
              borderRadius: 15,
            }}>
            <View
              style={{
                width: '15%',
                height: '100%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/avatar.png')}
                style={{width: 50, height: 50, borderRadius: 15}}
              />
            </View>
            <View
              style={{flex: 1, width: '85%', height: '100%', borderRadius: 15}}>
              <Text
                style={{
                  color: '#fff',
                  marginTop: 12,
                  marginLeft: 10,
                  fontSize: 12,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* VIDEO LIST COMPONENT === END*/}
    </View>
  );
};

export default UiTest;
