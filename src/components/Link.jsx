'use client'

// React Imports
import { forwardRef } from 'react'

// Next Imports
import NextLink from 'next/link'

const Link = (props, ref) => {
  // Props
  const { href, onClick, ...rest } = props

  // Log the href value for debugging
  console.log('Link href:', href)

  return (
    <NextLink
      ref={ref}
      {...rest}
      href={href?.toString() || '/admin/dashboard'}
      onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined}
    />
  )
}

export default forwardRef(Link)
