import React from 'react';
import {
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';

import { VerticalListProps } from '../types';

const VerticalList = ({
  data,
  horizontalPressed,
  horizontalScrollRef,
  mapping,
  renderSectionHeader,
  renderVerticalItem,
  scrollRef,
  selected,
  setSelected,
  verticalListProps,
}: VerticalListProps) => {
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0] && !viewableItems[0].index && !horizontalPressed) {
      const id = viewableItems[0].section.id;
      if (id !== selected) {
        setSelected(id);
        if (horizontalScrollRef?.current) {
          horizontalScrollRef.current.scrollToIndex({
            animated: true,
            index: mapping[id],
            viewPosition: 0.5,
          });
        }
      }
    }
  };

  const fallBack = () => {
    if (horizontalScrollRef?.current) {
      horizontalScrollRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0,
      });
    }

    if (scrollRef?.current) {
      scrollRef.current.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: 0,
        viewPosition: 0,
      });
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    if (renderVerticalItem) {
      return renderVerticalItem(item);
    } else {
      return (
        <View style={styles.itemContainer}>
          <Text>{item}</Text>
        </View>
      );
    }
  };

  const renderHeader = ({
    section,
  }: {
    section: SectionListData<any>;
  }): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null => {
    if (renderSectionHeader) {
      return renderSectionHeader(section);
    } else {
      return (
        <View style={styles.headerContainer}>
          <View style={styles.innerHeaderContainer}>
            <Text style={styles.header}>{section.title}</Text>
          </View>
        </View>
      );
    }
  };

  const keyExtractor = (item: any, index: number) =>
    item?.id?.toString() || index.toString();

  const getSectionListProps = () =>
    verticalListProps ? verticalListProps : {};

  return (
    <SectionList
      contentContainerStyle={styles.contentContainerStyle}
      initialNumToRender={40}
      keyExtractor={keyExtractor}
      onScrollToIndexFailed={() => {
        fallBack();
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      ref={scrollRef}
      renderItem={renderItem}
      renderSectionHeader={renderHeader}
      sections={data}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      {...getSectionListProps()}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 80,
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
  innerHeaderContainer: {
    backgroundColor: '#252728',
    borderRadius: 3,
    height: 23,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  itemContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});

export default VerticalList;
