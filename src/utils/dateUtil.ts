import moment from "moment"

export const dateUtil = {
    getDate() {
        return moment().format('YYYY-MM-DD HH:mm:ss')
    },

    convertDateFromString(date: string) {
        return moment(date, 'YYYY-MM-DD HH:mm:ss').toDate()
    }
}