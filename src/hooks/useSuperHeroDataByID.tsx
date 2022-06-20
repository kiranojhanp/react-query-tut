import axios from "axios"
import { QueryFunctionContext, useQuery } from "react-query"
import { z } from "zod"

const superheroSchema = z.object({
	id: z.number(),
	name: z.string(),
	alterEgo: z.string(),
})

const getSuperHeroByID = async ({ queryKey }: QueryFunctionContext) => {
	const { data } = await axios.get(
		`http://localhost:4000/superheroes/${queryKey[1]}`
	)
	return superheroSchema.parse(data)
}

export const useSuperheroDataByID = (heroId: string) => {
	return useQuery(["super-heroes-query-by-id", heroId], getSuperHeroByID, {
		onSuccess: (data) => {
			// console.log("Perform side effect after data fetching", data)
		},
		onError: (error) => {
			// console.log("Perform side effect after encountering error", error)
		},
	})
}
