import React from 'react'
import { EEyeRoadType, EResultType } from '../../utils/types'

function getStyleClass(type: EResultType, roadStyle: EEyeRoadType) {
  let prefix = ""
  let color = ""
  switch(roadStyle) {
    case EEyeRoadType.Big:
      prefix = "border"
      break
    case EEyeRoadType.Small:
      prefix = "bg"
      break
    case EEyeRoadType.Cockroach:
      prefix = "bg"
      break
  }
  switch (type) {
    case EResultType.Banker:
      color = `${prefix}-red-600`
      break
    case EResultType.Player:
      color = `${prefix}-blue-600`
      break
  }
  return color
}


function EyeRoadIcon({ type, roadStyle } : {type: EResultType, roadStyle: EEyeRoadType}) {
    const colorStyle = getStyleClass(type, roadStyle)
    console.warn(colorStyle)
    return (
        <div className="relative border">
          <div className='
            m-0.5 flex 
            h-5 w-5 items-center
            justify-center
          '>
            <div
              className={`
                  flex 
                  items-center
                  justify-center
                  ${ roadStyle == EEyeRoadType.Big ? "border-2" : "" }
                  ${ roadStyle == EEyeRoadType.Cockroach ? "skew-x-[-45deg] h-4 w-1" : "rounded-full h-5 w-5" }
                  ${ colorStyle }
              `}
            />
          </div>
        </div>
      )
}


export default EyeRoadIcon
