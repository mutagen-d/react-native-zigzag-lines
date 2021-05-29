import React, { useState } from 'react'
import Svg, { Path } from 'react-native-svg'

/**
 * @typedef {{
 *  width: number
 *  height?: number
 *  jagWidth?: number
 *  jagBottom?: number
 * }} ZigzagPathProps
 */

/**
 * 
 * @param {string | number} value
 * @param {number} [precision]
 */
const toFixed = (value, precision = 3) => +(+value).toFixed(precision)
/** @param {ZigzagPathProps} props */
const toString = (props) => {
  return `${props.width}/${props.height}/${props.jagWidth}/${props.jagBottom}`
}
/** @type {Record<string, string>} */
const chachedResults = {}

const DEFAULT_WIDTH = 360
const DEFAULT_HEIGHT = 10
const DEFAULT_JAG_BOTTOM = 0
const DEFAULT_JAG_WIDTH = 15
const DEFAULT_BACKGROUND_COLOR = '#CCCCCC'
const DEFAULT_COLOR = '#FFFFFF'
const DEFAULT_POSITION = 'top'

/**
 * 
 * @param {ZigzagPathProps} props
 * @returns 
 */
export const createZigzagPath = (props) => {
  const key = toString(props)
  if (chachedResults[key]) {
    return chachedResults[key]
  }
  const {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    jagBottom: bottom = DEFAULT_JAG_BOTTOM,
    jagWidth = DEFAULT_JAG_WIDTH,
  } = props
  const count = Math.floor(width / jagWidth) || 1
  const iWidth = width / count
  const step = iWidth / 2
  let lines = ''
  for (let i = 0, next = step; i < count; ++i) {
    lines += `L${toFixed(width - next, 2)} ${bottom}`
    next += step
    if (count == i + 1) {
      lines += `L0 ${height}`
    } else {
      lines += `L${toFixed(width - next, 2)} ${height}`
      next += step
    }
  }
  chachedResults[key] = `M0 ${height}V0 H${width} V${height} ${lines}Z`
  return chachedResults[key]
}

/**
 * @typedef {ZigzagPathProps & {
 *  backgroundColor?: string
 *  color?: string
 *  position?: 'top' | 'bottom'
 *  style?: import('react-native-svg').SvgProps['style']
 *  pathProps?: Omit<import('react-native-svg').PathProps, 'd' | 'fill'>
 *  svgProps?: Omit<import('react-native-svg').SvgProps, 'style' | 'width' | 'height' | 'viewBox'>
 * }} ZigzagLinesProps
 */

/**
 * @type {React.FC<ZigzagLinesProps>}
 */
const ZigzagLines = (props) => {
  const {
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    backgroundColor = DEFAULT_BACKGROUND_COLOR,
    color = DEFAULT_COLOR,
    position = DEFAULT_POSITION,
    style,
    jagWidth,
    jagBottom,
    pathProps,
    svgProps,
  } = props
  const [layout, setLayout] = useState({ width, height })
  return <Svg
    {...svgProps}
    onLayout={e => {
      svgProps.onLayout && svgProps.onLayout(e)
      setLayout({ ...e.nativeEvent.layout })
    }}
    width={width}
    height={height}
    viewBox={`0 0 ${layout.width} ${layout.height}`}
    style={[
      { backgroundColor },
      position == 'top' ? { transform: [{ rotate: '180deg' }] } : null,
      style,
    ]}
  >
    <Path
      {...pathProps}
      d={createZigzagPath({ width, height, jagWidth, jagBottom })}
      fill={color}
    />
  </Svg>
}

export default ZigzagLines