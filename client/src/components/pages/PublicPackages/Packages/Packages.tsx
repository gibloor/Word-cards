import React, { useEffect } from 'react'

const Packages = () => {
  const packages = [
    {
      title: 'package-1',
    },
  ]

  useEffect(() => {
    console.log(packages)
  }, [])

  return <div>Packages</div>
}

export default Packages
