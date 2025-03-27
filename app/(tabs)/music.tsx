import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import BackIcon from '@/assets/icons/Back.svg';

const songs = [
  { id: '1', title: 'PROVE', artist: 'NiL', image: require('@/assets/icons/music/prove.jpg') },
  { id: '2', title: 'Prescribing God', artist: 'Last Minute', image: require('@/assets/icons/music/prescribing_god.jpg') },
  { id: '3', title: 'Homecoming', artist: 'Kanye West', image: require('@/assets/icons/music/homecoming.jpg') },
  { id: '4', title: "Man Who Can’t Be Moved", artist: 'The Script', image: require('@/assets/icons/music/man_moved.jpg') },
  { id: '5', title: 'I Need A Dollar', artist: 'Aloe Blacc', image: require('@/assets/icons/music/i_need_a_dollar.jpg') },
  { id: '6', title: 'Demons', artist: 'Imagine Dragons', image: require('@/assets/icons/music/demons.jpg') },
];

export default function MusicPage() {
  const router = useRouter();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleBack = () => {
    setShowExitConfirm(true); // Show the popup instead of navigating immediately
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Title */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.goBackButton}>
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Music</Text>
        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.header}>Recommended Songs</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={item.image} style={styles.songImage} />
            <View style={styles.songTextContainer}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false} // Hide scrollbar
        overScrollMode="never"
      />

      {/* Exit Confirmation Popup with Dark Overlay */}
      {showExitConfirm && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowExitConfirm(false)}>
          <View style={styles.exitConfirmBox}>
            <Text style={styles.confirmText}>Are you sure?</Text>
            <Text style={styles.confirmSubtext}>You will be redirected back to the homepage.</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={() => router.replace('/home')}>
              <Text style={styles.confirmButtonText}>Yes, I am sure</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowExitConfirm(false)}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
    backgroundColor: "#F9F7F0",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 110,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#F9F7F0", 
    elevation: 5, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
  },
  goBackButton: {
    padding: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.bold,
    color: "#333333",
    flex: 1,
    textAlign: "center",
    paddingBottom: 5,
  },
  header: {
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  songImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  songTextContainer: {
    flex: 1,
  },
  songTitle: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.regular,
    color: "#333333",
    marginBottom: 5,
  },
  songArtist: {
    fontSize: Typography.fontSize.small,
    fontFamily: Typography.fontFamily.semibold,
    color: "#333333",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitConfirmBox: {
    width: '80%',
    height: '45%',
    backgroundColor: '#F9F7F0',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 5,
  },
  confirmText: {
    fontSize: Typography.fontSize.larger,
    fontFamily: Typography.fontFamily.semibold,
    marginTop: 20,
  },
  confirmSubtext: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#FFBE31',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 15,
    width: 250,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    width: 250,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#333333',
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
    textAlign: "center",
  },
});
