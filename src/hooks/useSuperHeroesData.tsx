import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { z } from "zod"
// import { request } from "../utils/axios-utils"
import { setupInterceptorsTo } from "../utils/Interceptors"
setupInterceptorsTo(axios)

const superheroSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	alterEgo: z.string(),
})

const superheroArray = z.array(superheroSchema)

const getSuperHeroes = async () => {
	const { data } = await axios.get("/superheroes")
	// const { data } = await request({ url: "/superheroes" })
	return superheroArray.parse(data)
}

export const useSuperheroData = () => {
	return useQuery("super-heroes-query", getSuperHeroes, {
		enabled: false,
		select: (data) => data.map((hero) => hero.name),
		onSuccess: (data) => {
			console.log("Perform side effect after data fetching", data)
		},
		onError: (error: Error | undefined) => {
			console.log("Perform side effect after encountering error", error)
		},
	})
}

/*
 * get list of superhero
 * data is fetched when component mounts
 */

export const useSuperheroDataOnMount = () => {
	return useQuery("super-heroes", getSuperHeroes)
}

const addSuperHeroFunctionSchema = z
	.function()
	.args(superheroSchema)
	.returns(z.promise(superheroSchema))

const addSuperHeroes = async (hero: any) => {
	const { data } = await axios.post("/superheroes", hero)
	// const { data } = await request({
	// 	url: "/superheroes",
	// 	method: "post",
	// 	data: hero,
	// })
	return superheroSchema.parse(data)
}

const functionWithValidation =
	addSuperHeroFunctionSchema.implement(addSuperHeroes)

export const useAddSuperHeroData = () => {
	const queryClient = useQueryClient()
	return useMutation(functionWithValidation, {
		// onSuccess: (data) => {
		// 	// queryClient.invalidateQueries("super-heroes")
		// 	queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
		// 		const cache = superheroArray.parse(oldQueryData)
		// 		return [...cache, ...[data]]
		// 	})
		// },
		onMutate: async (newHero) => {
			await queryClient.cancelQueries("super-heroes")
			const previousHeroData = queryClient.getQueryData("super-heroes")

			queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
				const cache = superheroArray.parse(oldQueryData)
				return [...cache, ...[{ id: oldQueryData.length + 1, ...newHero }]]
			})

			return { previousHeroData: superheroArray.parse(previousHeroData) }
		},
		onError: (_error, _hero, context) => {
			queryClient.setQueryData("super-heroes", context?.previousHeroData)
		},
		onSettled: (data) => {
			queryClient.invalidateQueries("super-heroes")
		},
	})
}
