import axios from 'axios'

const ServicesApi = axios.create({
  baseURL: "https://plataforma-xi.vercel.app/api/services"
})
export default ServicesApi