import axios from 'axios'

const ServicesApi = axios.create({
  baseURL: "https://production-jet.vercel.app/api/services"
})
export default ServicesApi