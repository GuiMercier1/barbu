import { CSSProperties } from 'react'
import { IconType } from 'react-icons'
import StyleHelper from '../helpers/StyleHelper'
import { hexToRgb } from '../helpers/utils'

type IconButtonProps = {
    action: () => void
    Icon: IconType
    style: 'transparent' | 'opaque'
}

const IconButton = ({ action, Icon, style }: IconButtonProps) => {
    const rgb = hexToRgb(StyleHelper.colors.secondary)

    const styleProps: CSSProperties =
        style === 'transparent'
            ? {
                  //   backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b},0.6)`,
                  backgroundColor: 'rgb(255,255,255,0.6)',
                  color: StyleHelper.colors.main,
                  border: 'none',
              }
            : {}

    return (
        <button onClick={action} style={{ padding: 10, cursor: 'pointer', ...styleProps }}>
            <Icon size={30} />
        </button>
    )
}

export default IconButton
