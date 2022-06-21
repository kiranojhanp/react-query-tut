import React, { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import {
	useAddSuperHeroData,
	useSuperheroDataOnMount,
} from "../hooks/useSuperHeroesData"

const RQSuperHeroesPage = () => {
	const initialData = { name: "", alterEgo: "" }
	const [formData, setFormData] = useState(initialData)
	const { data, isLoading, isError, error } = useSuperheroDataOnMount()

	// mutation
	const {
		mutate: AddHero,
		isLoading: isAddLoading,
		isError: isAddError,
		error: addError,
	} = useAddSuperHeroData()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setFormData({ ...formData, ...{ [name]: value } })
	}

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		AddHero(formData)
		setFormData(initialData)
		// console.log(formData)
	}

	if (isError && error instanceof Error) return <pre>{error.message}</pre>
	if (isAddError && addError instanceof Error)
		return <pre>{addError.message}</pre>

	if (isLoading) return <h2>Loading...</h2>
	if (isAddLoading) return <h2>Adding the data...</h2>
	return (
		<div className="grid-2">
			<div>
				<h2>Super Heroes Page</h2>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={formData.name}
					/>
					<input
						type="text"
						name="alterEgo"
						onChange={handleChange}
						value={formData.alterEgo}
					/>
					<input type="submit" value="Add Hero" />
				</form>
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
