# react-native-zigzag-lines
Zig-zag border for using on tickets or receipts

## Installation
```bash
yarn add react-native-zigzag-lines
```
This package depends on [`react-native-svg`](https://github.com/react-native-svg/react-native-svg), make sure to install it

## Usage
```js
import React, { useState } from "react"
import { View } from "react-native"
import ZigzagLines from "react-native-zigzag-lines"

const App = () => {
  const [width, setWidth] = useState()
  return <View
    style={{
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#DEDEDE",
    }}
  >
    {typeof width == 'number' && <ZigzagLines
      width={width}
      backgroundColor="#DEDEDE"
      color="#FFF"
    />}
    <View
      style={{ backgroundColor: "#FFF" }}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
    />
    {typeof width == 'number' && <ZigzagLines
      position="bottom"
      width={width}
      backgroundColor="#DEDEDE"
      color="#FFF"
    />}
  </View>
}
```

## Properties

| Name               | Type                    | Description                     | Default          | Required  |
| ------------------ | ----------------------- | ------------------------------- | ---------------- | --------- |
| `width`            | `number`                | length of zigzag border         | `360`            | Yes       |
| `height`           | `number`                | height of zigzag jags           | `10`             | No        |
| `position`         | `"bottom" \| "top"`     | position of zigzag border       | `"top"`          | No        |
| `backgroundColor`  | `string`                | background color of container   | `#DEDEDE`        | No        |
| `color`            | `string`                | color of zigzag jags            | `#FFF`           | No        |
| `jagWidth`         | `number`                | width of zigzag jags            | `15`             | No        |
| `jagBottom`        | `number`                | padding bottom of zigzag jags   | `0`              | No        |
| `style`            | `StyleProp<ViewStyle>`  | style of container              |                  | No        |
| `svgProps`         | `SvgProps`              | properties of `Svg` component   |                  | No        |
| `pathProps`        | `PathProps`             | properties of `Path` component  |                  | No        |

### Note

- `svgProps` does not accept `style`, `width`, `height`, and `viewBox` properties
- `pathProps` does not accept `d`, and `fill` properties

