# React Native Synced Horizontal and Vertical List

[![npm version](https://img.shields.io/npm/v/@georstat/react-native-synced-list.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-synced-list)
[![npm](https://img.shields.io/npm/dt/@georstat/react-native-synced-list.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-synced-list)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub package.json version](https://img.shields.io/github/package-json/v/georstat/react-native-synced-list?style=for-the-badge)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)

## Features

- Synced list component for horizontal and vertical navigation between items
- Written in `Typescript`

### Preview:

![@georstat:react-native-synced-list demo](https://user-images.githubusercontent.com/717975/144762838-f83db62a-f1bb-4df4-bcf1-9dc56d193aa8.gif)

## Installation

#### yarn:

```bash
yarn add @georstat/react-native-synced-list
```

#### npm:

```bash
npm i @georstat/react-native-synced-list
```

## Usage

#### Just to get started:

```tsx
import { SyncedList } from '@georstat/react-native-synced-list';

const listData: Item[] = [
  {
    id: 1,
    title: 'Breakfast',
    data: ['Eggs', 'Bacon', 'Milk', 'Coffee', 'Fresh fruits'],
  },
  {
    id: 2,
    title: 'Lunch',
    data: [
      'Fish',
      'Chicken with vegetables',
      'Beans',
      'Wine',
      'Pork with fried potatoes',
    ],
  },
  // Add more items here
];

const MySyncedList = () => {
  return (
    <View style={{ flex: 1 }}>
      <SyncedList data={listData} />
    </View>
  );
};
```

#### Custom List example:

For more info check [example](https://github.com/georstat/react-native-synced-list/tree/main/example)

```tsx
import { SyncedList } from '@georstat/react-native-synced-list';

const MySyncedList = () => {
  const renderHorizontalItem = (
    index: number,
    isSelected: boolean,
    item: any
  ) => {
    return (
      <View style={{ borderRadius: 7, overflow: 'hidden' }}>
        <View
          style={
            isSelected
              ? [styles.itemContainer, styles.itemContainerSelected]
              : styles.itemContainer
          }
        >
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
    <View style={{ flex: 1 }}>
      <SyncedList
        data={listData}
        horizontalListContainerStyle={styles.horizontalListContainerStyle}
        renderHorizontalItem={renderHorizontalItem}
        renderSectionHeader={renderSectionHeader}
        renderVerticalItem={renderVerticalItem}
      />
    </View>
  );
};
```

## Be careful

By default the horizontal list will render 30 items and the vertical list 40. (`initialNumToRender`).
This is fine for most cases and devices. If you need the maximum performance reduce this number and pass
the `getItemLayoutProp` for the horizontal view.

## Props

#### `SyncedList` accepts the following props:

| Properties                     | PropType | Description                                                                                                                                                                 |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                         | `Array`  | (**Required**) Each element in the array must have an id, a title (section title) and a data array (data of each section)                                                   |
| `initialId`                    | `Number` | id of the initial item to scroll                                                                                                                                            |
| `horizontalListContainerStyle` | `Object` | Style for the content container of the horizontal list                                                                                                                      |
| `verticalListContainerStyle`   | `Object` | Style for the content container of the Vertical list                                                                                                                        |
| `renderHorizontalItem`         | `Func`   | Function to render a custom item on the horizontal list. Accepts the item , current index and if it is selected eg. `(index:number, isSelected:boolean, item:Item,) => ...` |
| `renderSectionHeader`          | `Func`   | Function to render a custom header on each section. Accepts the section eg. `(section:Section ) => ...`                                                                     |
| `renderVerticalItem`           | `Func`   | Function to render a custom item on the vertical list. Accepts the item eg. `(item:Item) => ...`                                                                            |
| `verticalListProps`            | `Object` | Extra props of the vertical section list                                                                                                                                    |
| `horizontalListProps`          | `Object` | Extra props of the horizontal flat list                                                                                                                                     |

## Authors:

- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
