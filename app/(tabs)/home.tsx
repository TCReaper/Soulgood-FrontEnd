import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const progressSlides = [
    {
      title: "Your average heart rate for the week has been",
      value: "092 bpm",
      description: "",
      color: "#FF6B6B",
    },
    {
      title: "Your heart rate has been consistently",
      value: "LOW",
      description: "the past week.",
      color: "#FF6B6B",
    },
    {
      title: "You have been sleeping an average of",
      value: "7 hours and 34 minutes",
      description: "per day over the past week.",
      color: "#FF6B6B",
    },
  ];

  const renderSlide = ({ item }: { item: any }) => (
    <View style={styles.heartRateCard}>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={[styles.progressValue, { color: item.color }]}>{item.value}</Text>
      {item.description && <Text style={styles.slideDescription}>{item.description}</Text>}
    </View>
  );

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Good Morning!</Text>
      <Text style={styles.userName}>John</Text>
      
      <Text></Text>

      {/* Carousel for Progress Section */}
      <Text style={styles.sectionTitle}>Weekly Progress</Text>
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

      {/* Pending Task Section */}
      <Text style={styles.sectionTitle}>Pending Task</Text>
      <TouchableOpacity style={styles.taskCard}
      onPress={() => router.replace('/checkin')}>
        <Text style={styles.taskText}>You’ve got a task waiting for you. Tap to finish it!</Text>
      </TouchableOpacity>

      {/* For You Section */}
      <Text style={styles.sectionTitle}>For you</Text>
      <FlatList
        data={[
          { title: 'How to sleep better?', id: '1' },
          { title: 'What are signs of depression?', id: '2' },
          { title: 'How to manage stress?', id: '3' },
        ]}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 70, backgroundColor: '#FFFFFF', flex: 1 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  userName: { fontSize: 24, color: '#FFA500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },

  // Carousel styles
  carousel: { marginVertical: 20 },
  heartRateCard: {
    backgroundColor: '#FFF4E0',
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  slideTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  progressValue: { fontSize: 32, fontWeight: 'bold' },
  slideDescription: { fontSize: 14, textAlign: 'center', marginTop: 5 },

  // Pagination styles for the carousel
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  paginationDot: {
    height: 6,
    width: 6,
    backgroundColor: '#DDD',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#FFA500',
    width: 8,
    height: 8,
  },

  // Pending Task Section
  taskCard: {
    backgroundColor: '#FFC107',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  taskText: { fontSize: 16, fontWeight: '600', color: '#fff' },

  // For You Section
  articleCard: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 150,
    alignItems: 'center',
  },
});
