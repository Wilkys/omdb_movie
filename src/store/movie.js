import axios from 'axios'
import _unionBy from 'lodash/unionBy'
import { get, writable } from 'svelte/store'

export const movies = writable([])
export const loading = writable(false)
export const theMovie = writable({})
export const message = writable('Search for the movie title!')

export function initMovies() {
  movies.set([])
  message.set('Search for the movie title!')
  loading.set(false)
}

export async function searchMovies(payload){
  if (get(loading)) return //  중복 요청 방지. 현재 로딩중이면 다시 서치하지 않음
  loading.set(true)
  message.set('')

  let total = 0
  
  try {
    // const res = await _fetchMovie({
    //   ...payload,
    //   page: 1
    // })
    const res = await axios.post('/.netlify/functions/movie', {
      ...payload,
      page: 1
    })
    const { Search, totalResults } =res.data
    movies.set(Search)
    total = totalResults
    message.set('')  // 메시지 표시부분 초기화(공란)
    loading.set(false)// 계혹 로딩화면 나타나지 않도록 false할당
  } catch (msg) {
    movies.set([])    // Movie 목록 초기화
    message.set(msg)  // 에러 메시지 스토어에 할당
    loading.set(false)// 계혹 로딩화면 나타나지 않도록 false할당
    return
  }

  
  
  const pageLength = Math.ceil(total / 10)

  if (pageLength > 1) {
    for (let page = 2; page <= pageLength; page += 1) {
      if(page > (payload.number / 10)) break
      // const res = await _fetchMovie({
      //   ...payload,
      //   page
      // })
      const res = await axios.post('/.netlify/functions/movie', {
        ...payload,
        page
      })
      const { Search } = res.data
      movies.update($movies => _unionBy($movies, Search, 'imdbID'))
    }
  }

  loading.set(false)  // 불러와졌으면 다시 로딩은 폴스로 바꿔줌  
}

// 영화 하나의 상세정보
export async function searchMovieWithId(id) {
  if (get(loading)) return
  loading.set(true)

  // const res = await _fetchMovie({
  //   id
  // })
  const res = await axios.post('/.netlify/functions/movie', {
    id
  })
  console.log(res)

  theMovie.set(res.data)

  loading.set(false)
}
