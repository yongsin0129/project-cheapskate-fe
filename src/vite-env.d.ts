/// <reference types="vite/client" />

interface tableColumnExtensionsType {
  columnName: string
  align: 'left' | 'right' | 'center'
}

type tableColumnExtensionsTypeArray = {
  columnName: string
  align: 'left' | 'right' | 'center'
}[]

interface sortingType{
  columnName: string
  direction: 'asc' | 'desc'
}
