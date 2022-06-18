import { useEffect, useState } from "react"

export const SuperHeroesPage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<any[]>([])

	useEffect(() => {
		fetch("http://localhost:4000/superheroes").then((response) => {
			response.json().then((data) => {
				setData(data)
				setIsLoading(false)
			})
		})
	}, [])

	if (isLoading) {
		return <h2>Loading...</h2>
	}

	return (
		<>
			<h2>Super Heroes Page</h2>
			{data.map((hero) => {
				return <div key={hero.id}>{hero.name}</div>
			})}
		</>
	)
}
