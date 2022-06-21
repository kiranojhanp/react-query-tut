import axios from "axios"

const client = axios.create({
	baseURL: "http://localhost:4000",
})

export const request = async ({ ...options }) => {
	client.defaults.headers.common.Authorization = `Bearer token`
	const onSuccess = (response: any) => {
		console.log(response)
		return response
	}
	const onError = (error: any) => {
		// optionally catch errors and add additional logging here
		// redirect to login page if status code is 401
		return error
	}

	try {
		const response = await client(options)
		return onSuccess(response)
	} catch (error) {
		return onError(error)
	}
}
