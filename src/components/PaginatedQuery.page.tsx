import axios from "axios"
import { useState } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import { z } from "zod"

const colorsSchema = z.array(
	z.object({
		id: z.number(),
		label: z.string(),
	})
)

const getColors = async ({ queryKey }: QueryFunctionContext) => {
	const pageNumber = queryKey[1]
	const { data } = await axios.get(
		`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
	)
	return colorsSchema.parse(data)
}

const PaginatedQuery = () => {
	const [pageNumber, setPageNumber] = useState(1)
	const { data, isLoading, isFetching, isError, error } = useQuery(
		["colors", pageNumber],
		getColors,
		{ keepPreviousData: true }
	)

	if (isLoading) return <h1>Loading...</h1>
	if (isError && error instanceof Error) return <h1>{error.message}</h1>

	return (
		<>
			<div>
				{data?.map(({ id, label }) => (
					<div key={id}>
						<h2>
							{id}. {label}
						</h2>
					</div>
				))}
			</div>

			<hr />
			<div>
				<button
					onClick={() => setPageNumber(pageNumber - 1)}
					disabled={pageNumber === 1}
				>
					Prev
				</button>
				<button
					onClick={() => setPageNumber(pageNumber + 1)}
					disabled={pageNumber === 4}
				>
					Next
				</button>
			</div>

			{isFetching && "Loading"}
		</>
	)
}

export default PaginatedQuery
