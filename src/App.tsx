import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"
import "./App.css"

const HomePage = lazy(() => import("./components/Home.page"))
const RQSuperHeroesPage = lazy(() => import("./components/RQSuperHeroes.page"))
const RQParallelQueries = lazy(
	() => import("./components/ParallelQueries.page")
)
const DynamicParallel = lazy(() => import("./components/DynamicParellel.page"))
const RQSuperHeroDetails = lazy(
	() => import("./components/RQSuperHeroDetails.page")
)
const SuperHeroesPage = lazy(() => import("./components/SuperHeroes.page"))

function App() {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/super-heroes">Traditional Super Heroes</Link>
							</li>
							<li>
								<Link to="/rq-super-heroes">RQ Super Heroes</Link>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route path="/super-heroes" element={<SuperHeroesPage />} />
						<Route path="/rq-parallel" element={<RQParallelQueries />} />
						<Route
							path="/rq-dynamic-parallel"
							element={<DynamicParallel heroIds={[1, 3]} />}
						/>
						<Route path="/rq-super-heroes" element={<RQSuperHeroesPage />}>
							<Route path=":heroID" element={<RQSuperHeroDetails />} />
						</Route>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</div>
			</Router>
		</Suspense>
	)
}

export default App
