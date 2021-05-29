import React from 'react'
import { PathProps, SvgProps } from 'react-native-svg'

export type ZigzagPathProps = {
  width: number
  height?: number
  jagWidth?: number
  jagBottom?: number
}

export const createZigzagPath: (props: ZigzagPathProps) => string

export type ZigzagLinesProps = ZigzagPathProps & {
  backgroundColor?: string
  color?: string
  position?: 'top' | 'bottom'
  style?: SvgProps['style']
  pathProps?: Omit<PathProps, 'fill' | 'd'>
  svgProps?: Omit<SvgProps, 'style' | 'width' | 'height' | 'viewBox'>
}

declare const ZigzagLines: React.FC<ZigzagLinesProps>

export default ZigzagLines