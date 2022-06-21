import axios from "axios"
import { Fragment } from "react"
import { QueryFunctionContext, useInfiniteQuery } from "react-query"
import { z } from "zod"

const colorsSchema = z.array(
	z.object({
		id: z.number(),
		label: z.string(),
	})
)

const getColors = async ({ pageParam = 1 }: QueryFunctionContext) => {
	const { data } = await axios.get(
		`http://localhost:4000/colors?_limit=2&_page=${pageParam}`
	)
	return colorsSchema.parse(data)
}

const InfiniteQuery = () => {
	const {
		data,
		isLoading,
		isError,
		error,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery(["colors"], getColors, {
		getNextPageParam: (_lastPage, pages) => {
			if (pages.length > 4) return undefined
			return pages.length + 1
		},
	})

	if (isLoading) return <h1>Loading...</h1>
	if (isError && error instanceof Error) return <h1>{error.message}</h1>

	return (
		<>
			<div>
				{data?.pages?.map((group, index) => (
					<Fragment key={index}>
						{group?.map(({ id, label }) => (
							<h2 key={id}>
								{id}. {label}
							</h2>
						))}
					</Fragment>
				))}

				<button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
					Load more
				</button>

				<div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
			</div>
		</>
	)
}

export default InfiniteQuery
