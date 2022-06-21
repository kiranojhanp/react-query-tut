import { Link, Outlet } from "react-router-dom"
import { useSuperheroDataOnMount } from "../hooks/useSuperHeroesData"

const RQSuperHeroesPage = () => {
	const { data, isLoading, isError, error } = useSuperheroDataOnMount()

	if (isError && error instanceof Error) return <pre>{error.message}</pre>
	if (isLoading) return <h2>Loading...</h2>
	return (
		<div className="grid-2">
			<div>
				<h2>Super Heroes Page</h2>
				{/* <button onClick={() => refetch()}>Fetch Heroes</button> */}
				<br />
				{data?.map((hero) => {
					return (
						<Link to={`/rq-super-heroes/${hero.id}`} key={hero.id}>
							<div>{hero.name}</div>
						</Link>
					)
				})}
			</div>

			<Outlet />
		</div>
	)
}

export default RQSuperHeroesPage
