import axios from "axios"
import { FC } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import { z } from "zod"

const userSchema = z.object({
	id: z.string(),
	channelId: z.string(),
})

const channelSchema = z.object({
	id: z.string(),
	courses: z.array(z.string()),
})

const getUserDetails = async (email: string) => {
	const { data } = await axios.get(`http://localhost:4000/users/${email}`)
	return userSchema.parse(data)
}

const getCoursesByChannelId = async ({ queryKey }: QueryFunctionContext) => {
	const channelId = queryKey[1]
	const { data } = await axios.get(
		`http://localhost:4000/channels/${channelId}`
	)
	return channelSchema.parse(data)
}

const DependentQueries: FC<{ email: string }> = ({ email }) => {
	// get channel ID
	// use channel ID to fetch channel details
	const { data: user, isLoading: isUserLoading } = useQuery(
		["user", email],
		() => getUserDetails(email)
	)
	const channelId = user?.channelId

	const { data: channel, isLoading: isChannelLoading } = useQuery(
		["channel", channelId],
		getCoursesByChannelId,
		{
			enabled: !!channelId,
		}
	)

	if (isUserLoading) return <h1>Wait user details are loading</h1>
	if (isChannelLoading) return <h1>Wait channel details are loading</h1>

	return (
		<div>
			<pre>{JSON.stringify(channel?.courses)}</pre>
		</div>
	)
}

export default DependentQueries
