import { useParams } from "react-router-dom"
import { useSuperheroDataByID } from "../hooks/useSuperHeroDataByID"

const RQSuperHeroDetails = () => {
	let { heroID } = useParams()
	const { data, isLoading, isError, error } = useSuperheroDataByID(
		heroID as string
	)

	if (isError && error instanceof Error) return <pre>{error.message}</pre>
	if (isLoading) return <h2>Loading...</h2>

	return (
		<div>
			<div>Super hero details {heroID}</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}

export default RQSuperHeroDetails
