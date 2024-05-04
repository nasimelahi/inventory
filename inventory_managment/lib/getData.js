import axios from "axios";
const date = new Date()
export const GetDailySaleReport = async () => {
  const date = new Date()
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      axios.get(`http://localhost:5000/api/sales/daily-sales-report?date=${today}`)
        .then( data => {
           const result = data.data
        })
        .catch( error => {
            console.log(error)
      })
}
