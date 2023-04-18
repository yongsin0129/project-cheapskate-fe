import * as React from 'react'
import { useQuery } from 'react-query'

type RefType = React.MutableRefObject<string>

interface responseType {
  movieTitle: string | undefined
  posterURL: string
  movieDescription: string | null | undefined
}

export const useFetchMovieDetails = (targetMovieURL: RefType) => {
  const { data, isError, isLoading, error } = useQuery<responseType, Error>(
    ['moviesDetails', targetMovieURL.current],
    async ({ queryKey }: any) => {
      const response = await fetch(queryKey[1])
      const text = await response.text()

      // Initialize the DOM parser
      const parser = new DOMParser()
      // Parse the text
      const doc = parser.parseFromString(text, 'text/html')

      const movieTitle = doc
        .querySelector('.content.content-left .filmTitle')
        ?.textContent?.trim()

      const posterURL = (
        doc.querySelector(
          '.content.content-left #filmTagBlock span a img'
        ) as HTMLImageElement
      ).src

      const movieDescription = doc.querySelector(
        '.content.content-left #filmTagBlock span > ul.runtime'
      )?.parentElement?.textContent

      const data = { movieTitle, posterURL, movieDescription }

      return data
    }
  )

  return {
    data,
    isError,
    isLoading,
    error
  }
}
