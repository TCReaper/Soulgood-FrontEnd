// components/HomeLayout.tsx
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { Typography } from '@/constants/Typography';
import UserIcon from '@/assets/icons/User.svg';
import ExclamationIcon from '@/assets/icons/Exclamation.svg';
import Article1Icon from '@/assets/icons/article/Article1.svg';
import Article2Icon from '@/assets/icons/article/Article2.svg';
import Article3Icon from '@/assets/icons/article/Article3.svg';

const { width } = Dimensions.get('window');

export default function HomeLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const progressSlides = [
    {
      title: "Your average heart rate has been",
      value: "092",
      description: "bpm",
      color: "#C72323",
    },
    {
      title: "Your heart rate has been consistently",
      value: "LOW",
      description: "",
      color: "#C72323",
    },
  ];

  const articleData = [
    { title: 'How to sleep better?', id: '1', icon: <Article1Icon width={100} height={100} />, backgroundColor: '#FFEFE7' },
    { title: 'What are signs of depression?', id: '2', icon: <Article2Icon width={100} height={100} />, backgroundColor: '#E9EDFF' },
    { title: 'How to manage stress?', id: '3', icon: <Article3Icon width={100} height={100} />, backgroundColor: '#E9FFE9' },
  ];  

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderSlide = ({ item }: { item: any }) => (
    <View style={styles.heartRateCard}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.progressValue, { color: item.color }]}>{item.value}</Text>
        {item.description && (
          <Text style={styles.slideDescription}>{item.description}</Text>
        )}
      </View>
    </View>
  );  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 160 }}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Welcome!</Text>
        <View style={styles.avatarCircle}>
          <UserIcon width={40} height={40} />
        </View>
      </View>
        <Text style={styles.userName}>Introducing SoulGood</Text>
  
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
  
        <Text style={styles.sectionTitle}>Pending Task</Text>
        <View style={styles.taskCard}>
          <View style={styles.taskContent}>
            <ExclamationIcon width={24} height={24} style={styles.taskIcon} />
            <Text style={styles.taskText}>
              You’ve got a task waiting for you. {'\n'}
              <Text style={styles.taskHighlight}>Tap to finish it!</Text>
            </Text>
          </View>
        </View>
  
        <Text style={styles.sectionTitle}>For You</Text>
        <FlatList
          data={articleData}
          horizontal
          renderItem={({ item }) => (
            <View style={[styles.articleCard, { backgroundColor: item.backgroundColor }]}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <View style={styles.articleIconContainer}>{item.icon}</View>
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
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',
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
  greeting: { color: '#333', fontSize: Typography.fontSize.larger, fontFamily: Typography.fontFamily.regular },
  userName: { color: '#333', fontSize: Typography.fontSize.larger, fontFamily: Typography.fontFamily.bold, marginBottom: 10 },
  sectionTitle: { color: '#333', fontSize: Typography.fontSize.larger, fontFamily: Typography.fontFamily.medium },
  listContainer: { margin: 10 },
  carousel: { marginVertical: 0 },
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
  slideTitle: { color: '#333', fontSize: Typography.fontSize.small, fontFamily: Typography.fontFamily.medium, marginBottom: 5 },
  progressValue: { color: '#C72323', fontSize: Typography.fontSize.extra, fontFamily: Typography.fontFamily.extrabold },
  valueRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    gap: 5,
    marginTop: 15,
  },  
  slideDescription: { 
    color: '#333333',
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.bold,
    paddingBottom: 10, // pulls it downward to match baseline
  },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  paginationDot: { height: 6, width: 6, backgroundColor: '#FFE1A1', borderRadius: 3, marginHorizontal: 4 },
  activePaginationDot: { backgroundColor: '#FFAE00', width: 20, height: 5, borderRadius: 10 },
  taskCard: { backgroundColor: '#FFAE00', borderRadius: 30, padding: 16, marginBottom: 10, marginTop: 10 },
  taskContent: { flexDirection: 'row', alignItems: 'center' },
  taskIcon: { width: 40, height: 40, marginRight: 10 },
  taskText: { fontSize: Typography.fontSize.small, fontFamily: Typography.fontFamily.semibold, color: '#fff' },
  taskHighlight: { fontFamily: Typography.fontFamily.semibold, fontSize: Typography.fontSize.small },
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
  articleIconContainer: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  articleTitle: {
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'left',
  },  
});
