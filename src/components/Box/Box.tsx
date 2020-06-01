import { createElement } from 'react'

import gridCss from './grid.module.css'
import variantCss from './variant.module.css'

const Box: React.FC<{
  as?: string
  className?: string
  grid?: boolean
  variant?: 'light' | 'dark'
  id?: string
}> = ({
  as = 'section',
  children,
  className = '',
  grid = true,
  variant = 'light',
  ...props
}) => {
  const classNameComposed = `${variantCss[variant]} ${gridCss.common} ${
    grid ? gridCss.grid : ''
  } ${className}`

  return createElement(as, {
    className: classNameComposed,
    children,
    ...props,
  })
}

export { Box }
