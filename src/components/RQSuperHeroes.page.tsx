import axios from "axios"
import { useQuery } from "react-query"
import { z } from "zod"

const superheroSchema = z.object({
	id: z.number(),
	name: z.string(),
	alterEgo: z.string(),
})

const superheroArray = z.array(superheroSchema)

const useSuperheroData = () => {
	return useQuery(
		["super-heroes-query"],
		async () => {
			const { data } = await axios.get("http://localhost:4000/superheroes")
			return superheroArray.parse(data)
		},
		{ enabled: false }
	)
}

const RQSuperHeroesPage = () => {
	const { data, isLoading, isFetching, isError, error, refetch } =
		useSuperheroData()

	if (isError) {
		return <h2>{JSON.stringify(error)}</h2>
	}

	if (isLoading) {
		return <h2>Loading...</h2>
	}

	return (
		<>
			<h2>Super Heroes Page</h2>
			<button onClick={() => refetch()}>Fetch Heroes</button>

			{isFetching ? (
				<h2>Refetching hero list</h2>
			) : (
				data?.map((hero) => {
					return <div key={hero.id}>{hero.name}</div>
				})
			)}
		</>
	)
}

export default RQSuperHeroesPage
