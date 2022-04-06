import React from 'react'
import { EResultType } from '../../utils/types'

function EyeRoadIcon({ type } : {type: EResultType}) {
    console.warn("type", type)
    const color = type == EResultType.Banker ? "border-red-600 bg-red-600" : "border-blue-600 bg-blue-600"
    return (
        <div className="relative border">
          <div
            className={`
                m-0.5 flex 
                h-5 w-5 items-center
                justify-center rounded-full border-2
                ${ color }
            `}
          >
          </div>
        </div>
      )
}


export default EyeRoadIcon
