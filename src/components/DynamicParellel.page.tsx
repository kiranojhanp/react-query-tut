import axios from "axios"
import { FC } from "react"
import { QueryFunctionContext, useQueries } from "react-query"

const getSuperHeroByID = async ({ queryKey }: QueryFunctionContext) => {
	const id = queryKey[1]
	const { data } = await axios.get(`http://localhost:4000/superheroes/${id}`)
	return data
}

const DynamicParellel: FC<{ heroIds: number[] }> = ({ heroIds }) => {
	const queryResults = useQueries(
		heroIds.map((id) => {
			return {
				queryKey: ["super-hero", id],
				queryFn: getSuperHeroByID,
			}
		})
	)

	console.log({ queryResults })

	return <div>DynamicParellel</div>
}

export default DynamicParellel
