import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Head from '@/assets/avatar/head/Head';
import { Typography } from '@/constants/Typography';
import { hairComponents } from '@/assets/avatar/components/avatarComponents';
import { eyeComponents } from '@/assets/avatar/components/avatarComponents';
import { eyebrowsComponents } from '@/assets/avatar/components/avatarComponents';
import { mouthComponents } from '@/assets/avatar/components/avatarComponents';
import { othersComponents } from '@/assets/avatar/components/avatarComponents';
import BackIcon from '@/assets/icons/Back.svg';

const featureTabs = ['Skin Colour', 'Hair', 'Hair Colour', 'Eyes', 'Eyebrows', 'Mouth', 'Others'];

export default function AvatarBuilder() {
  const router = useRouter();

  const [activeFeature, setActiveFeature] = useState('Skin Colour');
  const [selections, setSelections] = useState<Record<string, string | null>>(
    Object.fromEntries(featureTabs.map((f) => [f, null]))
  );

  const handleOptionSelect = (feature: string, value: string) => {
    setSelections((prev) => ({ ...prev, [feature]: value }));
  };

  const isDone = Object.values(selections).every((val) => val !== null);
  const selectedSkinIndex = selections['Skin Colour'] ? parseInt(selections['Skin Colour']) : 0;
  const skinColors = [
    '#FADCD1', '#F8D9CE', '#F6D7CB', '#EDC9BC',
    '#DEB3A3', '#C89583', '#D9A392', '#B78276',
    '#9C6458', '#753D39', '#5F2828', '#501F1F',
  ];
  const hairColors = [
    '#E3E0D9', '#F6C870', '#FCAC15',
    '#CE7230', '#865028', '#4B301C', '#150C0C',
  ];
  const selectedHairColorIndex = selections['Hair Colour'] ? parseInt(selections['Hair Colour']) : 0;
  const selectedHairColor = hairColors[selectedHairColorIndex] || hairColors[0];  
  
  const renderOptions = () => {
    if (activeFeature === 'Skin Colour') {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
          {skinColors.map((color, index) => {
            const key = index.toString();
            const selected = selections['Skin Colour'] === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.option,
                  selected && styles.optionSelected,
                  { backgroundColor: color, borderWidth: selected ? 2 : 0, borderColor: '#999' },
                ]}
                onPress={() => handleOptionSelect('Skin Colour', key)}
              />
            );
          })}
        </ScrollView>
      );
    }

    if (activeFeature === 'Eyes') {
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
            {Object.entries(eyeComponents).map(([key, EyeComp]) => {
              const selected = selections['Eyes'] === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => handleOptionSelect('Eyes', key)}
                >
                  {EyeComp ? <EyeComp width={250} height={250} /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        );
      }

      if (activeFeature === 'Eyebrows') {
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
            {Object.entries(eyebrowsComponents).map(([key, EyebrowsComp]) => {
              const selected = selections['Eyebrows'] === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => handleOptionSelect('Eyebrows', key)}
                >
                  {EyebrowsComp ? <EyebrowsComp width={250} height={250} /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        );
      }

      if (activeFeature === 'Mouth') {
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
            {Object.entries(mouthComponents).map(([key, MouthComp]) => {
              const selected = selections['Mouth'] === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => handleOptionSelect('Mouth', key)}
                >
                  {MouthComp ? <MouthComp width={250} height={250} /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        );
      }

      if (activeFeature === 'Others') {
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
            {Object.entries(othersComponents).map(([key, OthersComp]) => {
              const selected = selections['Others'] === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.option, selected && styles.optionSelected]}
                  onPress={() => handleOptionSelect('Others', key)}
                >
                  {OthersComp ? <OthersComp width={150} height={150} /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        );
      }

    if (activeFeature === 'Hair') {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
          {Object.entries(hairComponents).map(([key, HairComp]) => {
            const selected = selections['Hair'] === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.option, selected && styles.optionSelected]}
                onPress={() => handleOptionSelect('Hair', key)}
              >
                {HairComp ? <HairComp width={80} height={80} /> : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    }
  
    if (activeFeature === 'Hair Colour') {
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
            {hairColors.map((color, index) => {
              const key = index.toString();
              const selected = selections['Hair Colour'] === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.option,
                    selected && styles.optionSelected,
                    { backgroundColor: color, borderWidth: selected ? 2 : 0, borderColor: '#999' },
                  ]}
                  onPress={() => handleOptionSelect('Hair Colour', key)}
                />
              );
            })}
          </ScrollView>
        );
      }      
  
    return null;
  };
  

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.back()}>
            <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.navText}>Skip</Text>
        </TouchableOpacity>
        
      </View>

      {/* Avatar Preview */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarScaleWrapper}>
            <View style={styles.avatarStack}>
            <Head colorIndex={selectedSkinIndex} />

            {selections['Eyes'] && (() => {
            const EyeComponent = eyeComponents[selections['Eyes']!];
            return <EyeComponent style={styles.eyeLayer} />;
            })()}

            {selections['Eyebrows'] && (() => {
            const EyebrowsComponent = eyebrowsComponents[selections['Eyebrows']!];
            return <EyebrowsComponent style={styles.eyebrowsLayer} />;
            })()}

            {selections['Others'] && (() => {
            const OthersComponent = othersComponents[selections['Others']!];
            return <OthersComponent style={styles.othersLayer} />;
            })()}

            {selections['Mouth'] && (() => {
            const MouthComponent = mouthComponents[selections['Mouth']!];
            return <MouthComponent style={styles.mouthLayer} />;
            })()}

            {selections['Hair'] && (() => {
            const HairComponent = hairComponents[selections['Hair']!];
            return <HairComponent color={selectedHairColor} style={styles.hairLayer} />;
            })()}

            </View>
        </View>
        </View>

      <View style={styles.bottomSection}>
      {/* Feature Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
        {featureTabs.map((feature) => (
          <TouchableOpacity
            key={feature}
            style={[styles.tabButton, activeFeature === feature && styles.tabButtonActive]}
            onPress={() => setActiveFeature(feature)}
          >
            <Text style={activeFeature === feature ? styles.tabTextActive : styles.tabText}>
              {feature}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Options */}
      <View style={styles.optionsWrapper}>
        {renderOptions()}
      </View>

      {/* Done Button */}
      <TouchableOpacity
        style={[styles.doneButton, !isDone && styles.doneButtonDisabled]}
        onPress={() => console.log('Avatar completed!')}
        disabled={!isDone}
      >
        <Text style={styles.doneButtonText}>{isDone ? 'Done!' : 'Done!'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const AVATAR_SCALE=0.5
const ORIGINAL_SIZE=800;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F7F0',
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    navText: {
        fontSize: Typography.fontSize.medium,
        color: '#333333',
        textDecorationLine: 'underline',
        fontFamily: Typography.fontFamily.medium,
      },
    avatarContainer: {
      alignItems: 'center',
      marginVertical: 20,
      borderColor: '#333',
    },
    avatarScaleWrapper: {
        transform: [{ scale: AVATAR_SCALE }], // 👈 Scale down the whole avatar
        alignItems: 'center',
        justifyContent: 'center',
        width:AVATAR_SCALE*ORIGINAL_SIZE,
        height:AVATAR_SCALE*ORIGINAL_SIZE,
      },      
    avatarStack: {
        // width: 268,
        // height: 302,
        position: 'relative',
      },
      skinLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      headLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },      
      hairLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },    
      eyeLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },   
      eyebrowsLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },      
      mouthLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },  
      othersLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
      },        
      optionsWrapper: {
        marginBottom: 15,
      },      
    tabRow: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    tabButton: {
      marginRight: 15,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 20,
      backgroundColor: 'transparent',
    },
    tabButtonActive: {
      backgroundColor: '#FFBE31',
      paddingVertical: 10,
      paddingHorizontal: 10,
      alignSelf: 'flex-start',
    },
    tabText: {
      fontSize: Typography.fontSize.medium,
      color: '#333333',
      fontFamily: Typography.fontFamily.medium,
    },
    tabTextActive: {
      color: '#fff',
      fontFamily: Typography.fontFamily.bold,
      fontSize: Typography.fontSize.medium,
    },
    optionRow: {
      paddingVertical: 5,
      paddingHorizontal: 5,
      flexDirection: 'row',
    },
    option: {
      width: 100,
      height: 100,
      borderRadius: 12,
      marginHorizontal: 6,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionSelected: {
      backgroundColor: '#EDEDED',
    },
    optionImage: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    doneButton: {
      marginTop: 20,
      backgroundColor: '#FFBE31',
      padding: 20,
      borderRadius: 30,
      alignItems: 'center',
    },
    doneButtonDisabled: {
      backgroundColor: '#EFEEE7',
    },
    doneButtonText: {
      color: '#B5B5B5',
      fontFamily: Typography.fontFamily.bold,
      fontSize: Typography.fontSize.large,
    },
  });
  