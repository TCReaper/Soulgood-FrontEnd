import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import { useAvatarStore } from '@/stores/avatarStore';
import { useTaskStore } from '@/stores/taskStore';
import Head from '@/assets/avatar/head/Head';
import { hairComponents, eyesComponents, eyebrowsComponents, mouthComponents, othersComponents } from '@/assets/avatar/components/avatarComponents';
import ExclamationIcon from '@/assets/icons/Exclamation.svg';
import UserIcon from '@/assets/icons/User.svg';
import Article1Icon from '@/assets/icons/article/Article1.svg';
import Article2Icon from '@/assets/icons/article/Article2.svg';
import Article3Icon from '@/assets/icons/article/Article3.svg';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const isCheckInCompleted = useTaskStore((state) => state.isCheckInCompleted);
  const selections = useAvatarStore((state) => state.selections);
  const useAvatar = useAvatarStore((state) => state.useAvatar);  
  const skinIndex = selections['Skin Colour'] ? parseInt(selections['Skin Colour']) : 0;
  const hairColor = ['#E3E0D9', '#F6C870', '#FCAC15', '#CE7230', '#865028', '#4B301C', '#150C0C'][parseInt(selections['Hair Colour'] || '0')];
  
  const progressSlides = [
    {
      title: "Your average heart rate has been",
      value: "142",
      description: "bpm",
      color: "#C72323",
      details: "If you have been feeling stressed or experiencing physical discomfort, consider:\n1. Going out for a run\n2. Deep breathing\n3. Listening to some upbeat music",
    },
    {
      title: "Your heart rate has been consistently",
      value: "HIGH",
      description: "",
      color: "#C72323",
      details: "This could be linked to stress or emotional shifts. Try incorporating calming activities like deep breathing or a short walk to see if it helps.",
    },
  ];
  

  const renderSlide = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/activity', params: { data: JSON.stringify(item) } })}>
      <View style={styles.heartRateCard}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <View style={styles.valueRow}>
          <Text style={[styles.progressValue, { color: item.color }]}>{item.value}</Text>
          {item.description && (
            <Text style={styles.slideDescription}>{item.description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>  
  );  

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const articleData = [
    {
      id: '1',
      title: 'How to sleep better?',
      icon: <Article1Icon width={100} height={100} />,
      backgroundColor: '#FFEFE7', // light peach
    },
    {
      id: '2',
      title: 'What are signs of depression?',
      icon: <Article2Icon width={100} height={100} />,
      backgroundColor: '#E9EDFF', // light purple
    },
    {
      id: '3',
      title: 'How to manage stress?',
      icon: <Article3Icon width={100} height={100} />,
      backgroundColor: '#E9FFE9', // light green
    },
  ];  

  return (
    <View style={{ flex: 1 }}>
      {showUserMenu && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setShowUserMenu(false)}
        >
          <View style={styles.dropdownWrapper}>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  setShowUserMenu(false);
                  router.push('/AvatarBuilder');
                }}
              >
                <Text style={styles.menuButtonText}>Change Avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => {
                  setShowUserMenu(false);
                  useAvatarStore.getState().setUseAvatar(false);
                  router.replace('/');
                }}
              >
                <Text style={styles.menuButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
  
      <ScrollView style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <TouchableOpacity onPress={() => setShowUserMenu(true)}>
            <View style={styles.avatarCircle}>
              {useAvatar ? (
                <View style={styles.avatarLayerWrapper}>
                  <Head colorIndex={skinIndex} width={50} height={50} />
                  {selections['Hair'] && (() => {
                    const Comp = hairComponents[selections['Hair']!];
                    return <Comp width={50} height={50} color={hairColor} style={styles.avatarLayer} />;
                  })()}
                  {selections['Eyes'] && (() => {
                    const Comp = eyesComponents[selections['Eyes']!];
                    return <Comp width={50} height={50} style={styles.avatarLayer} />;
                  })()}
                  {selections['Eyebrows'] && (() => {
                    const Comp = eyebrowsComponents[selections['Eyebrows']!];
                    return <Comp width={50} height={50} style={styles.avatarLayer} />;
                  })()}
                  {selections['Mouth'] && (() => {
                    const Comp = mouthComponents[selections['Mouth']!];
                    return <Comp width={50} height={50} style={styles.avatarLayer} />;
                  })()}
                  {selections['Others'] && (() => {
                    const Comp = othersComponents[selections['Others']!];
                    return <Comp width={50} height={50} color={hairColor} style={styles.avatarLayer} />;
                  })()}
                </View>
                  ) : (
                    <UserIcon width={40} height={40} />
                  )}
              </View>
            </TouchableOpacity>
          </View>
        <Text style={styles.userName}>John</Text>
  
        {/* Carousel */}
        <Text style={styles.sectionTitle}>Progress for the week</Text>
        <FlatList
          data={progressSlides}
          renderItem={renderSlide}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onScroll={handleScroll}
          style={styles.carousel}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.pagination}>
          {progressSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index && styles.activePaginationDot,
              ]}
            />
          ))}
        </View>
  
        {/* Task Section */}
        <Text style={styles.sectionTitle}>Pending Task</Text>
        {isCheckInCompleted ? (
          <View style={[styles.taskCard, { backgroundColor: '#EDEDED' }]}>
            <Text style={[styles.taskText, { color: '#333', paddingLeft: 10 }]}>
              <Text style={{ fontFamily: Typography.fontFamily.bold }}>
                Congratulations!
              </Text>
              {'\n'}
              <Text style={{ fontFamily: Typography.fontFamily.medium }}>
                You’ve completed all your tasks. Great job!
              </Text>
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.taskCard} onPress={() => router.replace('/checkin')}>
            <View style={styles.taskContent}>
              <ExclamationIcon width={24} height={24} style={styles.taskIcon} />
              <Text style={styles.taskText}>
                You’ve got a task waiting for you. {'\n'}
                <Text style={styles.taskHighlight}>Tap to finish it!</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}

  
        {/* For You */}
        <Text style={styles.sectionTitle}>For You</Text>
        <FlatList
          data={articleData}
          horizontal
          renderItem={({ item }) => (
            <View style={[styles.articleCard, { backgroundColor: item.backgroundColor }]}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <View style={styles.articleIconContainer}>
                {item.icon}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 70, backgroundColor: '#F9F7F0', flex: 1 },
  greetingContainer: {
    flexDirection: 'row', // Places "Good Morning" and icon in the same row
    justifyContent: 'space-between', // Pushes them apart
    alignItems: 'center', // Aligns them properly
    width: '100%', // Makes sure it spans the full width
  },
  greeting: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.regular,
  },
  avatarCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  
  avatarLayerWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  
  avatarLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  listContainer:{
    margin: 10,
  } , 
  userName: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 10,
  },  
  sectionTitle: {
    color: '#333333',
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.medium,
  },  
  // Carousel styles
  carousel: { 
    marginVertical: 0,
  },
  heartRateCard: {
    backgroundColor: '#FAF0D9',
    width: width * 0.8,
    height: 160,
    padding: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'flex-start', 
    marginTop: 5,
  },
  slideTitle: {
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 5,
  }, 
  progressValue: {     
    color: '#C72323',
    fontSize: Typography.fontSize.extra,
    fontFamily: Typography.fontFamily.extrabold,
  },
  valueRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end', // Aligns the whole row to the right
    alignItems: 'flex-end', // Vertically aligns text baseline
    gap: 5, // Optional: spacing between value and description
    marginTop: 15,
  },  
  slideDescription: { 
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.bold,
    paddingBottom: 10, // pulls it downward to match baseline
  },
  

  // Pagination styles for the carousel
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  paginationDot: {
    height: 6,
    width: 6,
    backgroundColor: '#FFE1A1',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#FFAE00',
    width: 20,
    height: 5,
    borderRadius: 10,
  },

  // Pending Task Section
  taskCard: {
    backgroundColor: '#FFAE00',
    borderRadius: 30,
    padding: 16,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 5 },
  },

  taskContent: {
    flexDirection: 'row', // 🔹 Puts the icon and text in a row
    alignItems: 'center', // 🔹 Centers them vertically
  },

  taskIcon: {
    width: 40 , // Adjust icon size
    height: 40,
    marginRight: 10, // Adds spacing between the icon and text
  },

  taskText: { 
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.semibold,
    color: '#fff',
  },

  taskHighlight: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.small,
  },

  // For You Section
  articleIconContainer: {
    marginLeft: 20, // <-- tweak this value to adjust right shift
    alignSelf: 'flex-start', // makes sure marginLeft takes effect
  },
  
  articleCard: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 150,
    height: 200,
    justifyContent: 'space-between', 
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  
  articleTitle: {
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'left',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
  
  dropdownWrapper: {
    position: 'absolute',
    top: 65, // adjust based on paddingTop of screen + icon height
    right: 20, // align under the UserIcon
    zIndex: 11,
  },
  
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  
  menuButton: {
    paddingVertical: 6,
  },
  
  menuButtonText: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.medium,
    color: '#333',
  },  
  
});
