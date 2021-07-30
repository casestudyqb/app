//import { useQuery } from 'react-query'

const fetchLikes = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/like/${id}`)
  const feed = await res.json()
  return feed
}

// const useLikes = () => {
//   return useQuery('likes', () => fetchLikes(62))
// }

export { fetchLikes }