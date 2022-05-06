import dayjs from "dayjs"

export const getTime = () => {
	return dayjs().format("HH:mm - DD/MM/YY")
}
