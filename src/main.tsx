import React from "react"
import ReactDOM from "react-dom/client"
import { Outlet, RootRoute, Route, Router, RouterProvider, useRouter } from "@tanstack/react-router";

const RootComp: React.FC = () => {
	const { state } = useRouter()

	return <>
		<dl>
			<dt>Current Path:</dt>
			<dd>"{state.currentLocation.pathname}"</dd>

			<dt>Current Matches:</dt>
			<dd>"{state.currentMatches.map(m => m.id).join(", ")}"</dd>
		</dl>
		<Outlet />
	</>
}

const rootRoute = new RootRoute({
	component: RootComp
})

const layoutA = new Route({
	getParentRoute: () => rootRoute,
	id: "layout-a",
})

const loginRoute = new Route({
	getParentRoute: () => layoutA,
	path: "login",
	component: () => <>Login</>
})

const layoutB = new Route({
	getParentRoute: () => rootRoute,
	id: "layout-b",
})

const indexRoute = new Route({
	getParentRoute: () => layoutB,
	path: "/",
	component: () => <>Index</>
})

// the first route here will be / - even though "loginRoute" should not match that path!
const routeTree = rootRoute.addChildren([
	layoutA.addChildren([loginRoute]),
	layoutB.addChildren([indexRoute]),
])

const router = new Router({
	routeTree: routeTree
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
