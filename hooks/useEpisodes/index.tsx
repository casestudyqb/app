//import { useQuery } from 'react-query'

const fetchEpisodes = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/episode/${id}`)
  const feed = await res.json()
  return feed
}

// const useEpisodes = limit => {
//   return useQuery(['feeds', limit], () => fetchEpisodes(limit))
// }

export { fetchEpisodes }