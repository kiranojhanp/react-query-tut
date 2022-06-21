import axios from "axios"
import { QueryFunctionContext, useQuery, useQueryClient } from "react-query"
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
	const queryClient = useQueryClient()

	return useQuery(["super-heroes-by-id", heroId], getSuperHeroByID, {
		initialData: () => {
			const heroArray = queryClient.getQueryData("super-heroes") as any[]
			const hero = heroArray.find((hero) => hero.id === parseInt(heroId))
			if (!hero) return undefined
			return superheroSchema.parse(hero)
		},
	})
}
