const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function(event, context) {
  const params = JSON.parse(event.body)
  const { title, type, year, page, id } = params
  //const OMDB_API_KEY='abd6b67a'

  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try{
    const res = await axios.get(url)
    console.log(res.data)
    if (res.data.Error) { //OMDB의 특수한 경우(정상반환되었으나 내용에 에러가 포함됨) 처리
      //reject(res.data.Error)
      return {
        statusCode: 400,
        body: res.data.Error
      }
    }
    //resolve(res)
    return {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch(error) {
    console.log(error.response.status)
    //reject(error.message)
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}