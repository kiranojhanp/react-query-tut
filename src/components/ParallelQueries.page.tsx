import axios from "axios"
import { useQuery } from "react-query"

const fetchSuperHeroes = async () => {
	const { data } = await axios.get("http://localhost:4000/superheroes")
	return data
}

const fetchFriends = async () => {
	const { data } = await axios.get("http://localhost:4000/friends")
	return data
}

const ParallelQueries = () => {
	const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes)
	const { data: friends } = useQuery("friends", fetchFriends)

	return (
		<div>
			<h3>Super Heroes</h3>
			<pre>{JSON.stringify(superHeroes, null, 2)}</pre>
			<hr />
			<h3>Friends</h3>
			<pre>{JSON.stringify(friends, null, 2)}</pre>
		</div>
	)
}

export default ParallelQueries
