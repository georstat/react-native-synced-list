import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DataItem, HorizontalListProps } from '../types';

const HorizontalList = ({
  contentContainerStyle,
  data,
  onSelect,
  renderHorizontalItem,
  scrollRef,
  selected,
  setHorizontalPressed,
  verticalScrollRef,
  horizontalListProps,
}: HorizontalListProps) => {
  const onItemPress = (id: number | string, i: number) => {
    setHorizontalPressed(true);
    onSelect(id);
    if (verticalScrollRef?.current) {
      verticalScrollRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: i,
        viewPosition: 0,
      });
    }
    if (scrollRef?.current) {
      scrollRef.current.scrollToIndex({
        animated: true,
        index: i,
        viewPosition: 0.5,
      });
    }

    setTimeout(() => {
      setHorizontalPressed(false);
    }, 300);
  };

  const renderItem = ({ item, index }: { item: DataItem; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onItemPress(item.id, index)}
      >
        {renderHorizontalItem ? (
          renderHorizontalItem(index, selected === item.id, item)
        ) : (
          <View
            style={
              selected === item.id
                ? [styles.itemContainer, styles.itemContainerSelected]
                : styles.itemContainer
            }
          >
            <Text>{item.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const getFlatlistProps = () =>
    horizontalListProps ? horizontalListProps : {};

  return (
    <View style={{}}>
      <View style={styles.container}>
        <FlatList
          bounces={false}
          contentContainerStyle={
            contentContainerStyle
              ? [styles.contentContainerStyle, contentContainerStyle]
              : styles.contentContainerStyle
          }
          data={data}
          horizontal
          initialNumToRender={30}
          keyExtractor={item => item.id.toString()}
          onScrollToIndexFailed={() => {
            // fallBack();
          }}
          ref={scrollRef}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          {...getFlatlistProps()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    backgroundColor: 'white',
    paddingLeft: 24,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainerSelected: {
    borderBottomColor: '#252728',
    borderBottomWidth: 2,
  },
  linearGradient: {
    bottom: -5,
    height: 5,
    position: 'absolute',
    right: 0,
    width: '100%',
  },
});

export default HorizontalList;
