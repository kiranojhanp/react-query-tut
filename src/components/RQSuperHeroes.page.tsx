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
		{
			onError: (err) => console.log("On no some error occured", err),
			// refetchOnMount: false,
			// refetchOnWindowFocus: true
			// staleTime: 30000,
		}
	)
}

const RQSuperHeroesPage = () => {
	const { data, isLoading, isError, error } = useSuperheroData()

	if (isError) {
		return <h2>{JSON.stringify(error)}</h2>
	}

	if (isLoading) {
		return <h2>Loading...</h2>
	}

	return (
		<>
			<h2>Super Heroes Page</h2>

			{data?.map((hero) => {
				return <div key={hero.id}>{hero.name}</div>
			})}
		</>
	)
}

export default RQSuperHeroesPage
