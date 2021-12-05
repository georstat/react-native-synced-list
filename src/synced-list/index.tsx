/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SectionList, View } from 'react-native';

import VerticalList from './vertical-list';
import HorizontalList from './horizontal-list';
import { IProps } from './types';

const SyncedList = ({
  data,
  horizontalListContainerStyle,
  initialId,
  renderHorizontalItem,
  renderSectionHeader,
  renderVerticalItem,
  verticalListContainerStyle,
  horizontalListProps,
  verticalListProps,
}: IProps) => {
  const horizontalRef = useRef<FlatList>(null);
  const verticalRef = useRef<SectionList>(null);
  const [horizontalPressed, setHorizontalPressed] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [selected, setSelected] = useState<string | number>('');
  const [mapping, setMapping] = useState({});

  const onSelect = useCallback(id => {
    setSelected(id);
  }, []);

  useEffect(() => {
    if (data.length) {
      setSelected(data[0].id);
      const initialMapping: { [key: string]: any } = {};
      data.forEach((el, index) => {
        initialMapping[el.id] = index;
      });
      setMapping(initialMapping);
      setTimeout(() => {
        setRendered(true);
      }, 700);
    }
  }, [data.length]);

  useEffect(() => {
    if (rendered && initialId) {
      setHorizontalPressed(true);
      setSelected(initialId);
      if (horizontalRef?.current && verticalRef?.current) {
        const idx = data.findIndex(el => el.id === initialId);
        if (idx === -1) {
          return;
        }
        horizontalRef.current.scrollToIndex({
          animated: true,
          index: idx,
          viewPosition: 0,
        });
        verticalRef.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: idx,
          viewPosition: 0,
        });

        setTimeout(() => {
          setHorizontalPressed(false);
        }, 200);
      }
    }
  }, [rendered]);

  return (
    <View>
      <HorizontalList
        contentContainerStyle={horizontalListContainerStyle}
        data={data}
        onSelect={onSelect}
        renderHorizontalItem={renderHorizontalItem}
        scrollRef={horizontalRef}
        selected={selected}
        setHorizontalPressed={setHorizontalPressed}
        verticalScrollRef={verticalRef}
        horizontalListProps={horizontalListProps}
      />

      <VerticalList
        contentContainerStyle={verticalListContainerStyle}
        data={data}
        horizontalPressed={horizontalPressed}
        horizontalScrollRef={horizontalRef}
        mapping={mapping}
        renderSectionHeader={renderSectionHeader}
        renderVerticalItem={renderVerticalItem}
        scrollRef={verticalRef}
        selected={selected}
        setSelected={setSelected}
        verticalListProps={verticalListProps}
      />
    </View>
  );
};

export default SyncedList;
