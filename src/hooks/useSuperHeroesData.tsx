import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { z } from "zod"

const superheroSchema = z.object({
	id: z.number().optional(),
	name: z.string(),
	alterEgo: z.string(),
})

const superheroArray = z.array(superheroSchema)

const getSuperHeroes = async () => {
	const { data } = await axios.get("http://localhost:4000/superheroes")
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
	const { data } = await axios.post("http://localhost:4000/superheroes", hero)
	return superheroSchema.parse(data)
}

const functionWithValidation =
	addSuperHeroFunctionSchema.implement(addSuperHeroes)

export const useAddSuperHeroData = () => {
	return useMutation(functionWithValidation)
}
