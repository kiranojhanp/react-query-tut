import axios from "axios"
import { useQuery } from "react-query"
import { z } from "zod"

const superheroSchema = z.object({
	id: z.number(),
	name: z.string(),
	alterEgo: z.string(),
})

const superheroArray = z.array(superheroSchema)

const getSuperHeroes = async () => {
	const { data } = await axios.get("http://localhost:4000/superheroes")
	return superheroArray.parse(data)
}

const useSuperheroData = () => {
	return useQuery(["super-heroes-query"], getSuperHeroes, {
		enabled: false,
		select: (data) => data.map((hero) => hero.name.toUpperCase()),
		onSuccess: (data) => {
			console.log("Perform side effect after data fetching", data)
		},
		onError: (error) => {
			console.log("Perform side effect after encountering error", error)
		},
	})
}

const RQSuperHeroesPage = () => {
	const { data, isLoading, isFetching, isError, error, refetch } =
		useSuperheroData()

	if (isError && error instanceof Error) {
		return <pre>{error.message}</pre>
	}

	if (isLoading || isFetching) {
		return <h2>Loading...</h2>
	}

	return (
		<>
			<h2>Super Heroes Page</h2>
			<button onClick={() => refetch()}>Fetch Heroes</button>

			{data?.map((hero) => (
				<p key={hero}>{hero}</p>
			))}

			{/* {
				data?.map((hero) => {
					return <div key={hero.id}>{hero.name}</div>
				})
			} */}
		</>
	)
}

export default RQSuperHeroesPage
