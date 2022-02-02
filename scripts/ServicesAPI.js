import axios from 'axios'

const ServicesApi = axios.create({
  baseURL: "https://production-68r7opwwc-sir-aguiar.vercel.app/api/services"
})
export default ServicesApi