import dayjs from "dayjs"

export const getDateAndTime = () => {
	return dayjs().format("HH:mm - DD/MM/YY")
}

export const getDate = () => {
	return dayjs().format("DD/MM")
}
