import React, { Dispatch, RefObject, SetStateAction } from 'react';
import {
  FlatList,
  SectionList,
  SectionListData,
  StyleProp,
  ViewStyle,
  FlatListProps,
  SectionListProps,
} from 'react-native';

export type DataItem = {
  [key: string]: any;
  data: any[];
  id: number | string;
  title: string;
};

export interface IProps {
  horizontalListProps?: FlatListProps;
  verticalListProps?: SectionListProps;
  data: DataItem[];
  horizontalListContainerStyle?: StyleProp<ViewStyle>;
  initialId?: number | string;
  renderHorizontalItem?: (
    index: number,
    isSelected: boolean,
    item: DataItem
  ) => React.ReactNode;
  renderSectionHeader?: (
    section: SectionListData<any>
  ) => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
  renderVerticalItem?: (item: any) => JSX.Element;
  verticalListContainerStyle?: StyleProp<ViewStyle>;
}

export interface HorizontalListProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: DataItem[];
  onSelect: (id: number | string | null) => void;
  renderHorizontalItem?: (
    index: number,
    isSelected: boolean,
    item: DataItem
  ) => React.ReactNode;
  scrollRef: RefObject<FlatList> | undefined;
  selected: number | string | null;
  setHorizontalPressed: Dispatch<SetStateAction<boolean>>;
  verticalScrollRef: RefObject<SectionList> | undefined;
  horizontalListProps?: FlatListProps;
}

export interface VerticalListProps {
  verticalListProps?: SectionListProps;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: DataItem[];
  horizontalPressed: boolean;
  horizontalScrollRef: RefObject<FlatList> | undefined;
  mapping: { [key: string]: any };
  renderSectionHeader?: (
    item: SectionListData<any>
  ) => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
  renderVerticalItem?: (item: any) => JSX.Element;
  scrollRef: RefObject<SectionList> | undefined;
  selected: number | string | null;
  setSelected: Dispatch<SetStateAction<number | string>>;
}
