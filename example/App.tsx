import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SyncedList } from '@georstat/react-native-synced-list';
import { listData } from './mock-data';

const App = () => {
  const renderHorizontalItem = (
    // @ts-ignore
    index: number,
    isSelected: boolean,
    item: any,
  ) => {
    return (
      <View style={styles.horizontalItemWrapper}>
        <View
          style={
            isSelected
              ? [styles.itemContainer, styles.itemContainerSelected]
              : styles.itemContainer
          }>
          <Text>{item.title}</Text>
        </View>
      </View>
    );
  };

  const renderVerticalItem = (item: any) => {
    return (
      <View style={styles.verticalItemContainer}>
        <Text>{item}</Text>
      </View>
    );
  };

  const renderSectionHeader = (section: any) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.innerHeaderContainer}>
          <Text style={styles.header}>{section.title}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SyncedList
        data={listData}
        horizontalListContainerStyle={styles.horizontalListContainerStyle}
        renderHorizontalItem={renderHorizontalItem}
        renderSectionHeader={renderSectionHeader}
        renderVerticalItem={renderVerticalItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  header: {
    color: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  horizontalItemWrapper: {
    borderRadius: 7,
    overflow: 'hidden',
  },
  horizontalListContainerStyle: {
    paddingBottom: 6,
  },
  innerHeaderContainer: {
    backgroundColor: 'gray',
    borderRadius: 3,
    height: 23,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  itemContainer: {
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainerSelected: {
    backgroundColor: 'lightblue',
  },
  verticalItemContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 4,
    marginBottom: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});

export default App;
