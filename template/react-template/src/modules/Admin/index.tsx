import React from 'react'
import { AdminContentProps } from '../../types'

export const AdminContent: React.FC<AdminContentProps> = ({text}) => {
  return (<h1>{text}</h1>)
}