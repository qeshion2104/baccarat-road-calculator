import React from 'react'

function Road({ title, children } : { title: string, children: Array<JSX.Element> }) {
  return (
    <div className="flex flex-row items-start">
      {/* title */}
      <div
        className="my-1
            h-40 border-2 px-1 text-center text-xs"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
        }}
      >
        {title}
      </div>
      {/* table */}
      <div
        className={`
            my-1 flex h-40 flex-col
            flex-wrap
            items-start
            py-0.5
        `}
        style={{
          width: `calc(${Math.floor(children.length / 6)} * (1.5rem + 2px))`,
        }}
      >
          {children}
      </div>
    </div>
  )
}

export default Road
