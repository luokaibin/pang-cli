import React from 'react'
import cn from 'classnames'
import style from './index.module.less'

interface LogoProps {
  className: string;
}

export const Logo: React.FC<LogoProps> = ({className}) => (
  <span className={cn(style.logo, className)}>Touch Fish</span>
)