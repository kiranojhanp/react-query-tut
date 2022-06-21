import axios from "axios"
import { QueryFunctionContext, useQuery, useQueryClient } from "react-query"
import { z } from "zod"

const superheroSchema = z.object({
	id: z.number(),
	name: z.string(),
	alterEgo: z.string(),
})

const getSuperHeroes = async ({ queryKey }: QueryFunctionContext) => {
	const heroId = queryKey[1]
	const { data } = await axios.get(
		`http://localhost:4000/superheroes/${heroId}`
	)
	return superheroSchema.parse(data)
}

export const useFetchSuperheroData = (heroId: string) => {
	const queryClient = useQueryClient()
	return useQuery(["super-hero", heroId], getSuperHeroes, {
		initialData: () => {
			const hero = queryClient.getQueriesData("super-heroes")
			return null
		},
	})
}
