/// <reference types="vite/client" />

interface tableColumnExtensionsType {
  columnName: string
  align: 'left' | 'right' | 'center'
}

type tableColumnExtensionsTypeArray = {
  columnName: string
  align: 'left' | 'right' | 'center'
}[]

interface sortingType {
  columnName: string
  direction: 'asc' | 'desc'
}

interface MovieData {
  firstRound: any
  leaveFirstRound: any
  secondRound: any
  leaveSecondRound: any
  notReleased: any
  streaming: any
}
