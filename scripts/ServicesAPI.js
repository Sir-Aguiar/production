import axios from 'axios'

const ServicesApi = axios.create({
  baseURL: 'http://localhost:3000/api'
})
export default ServicesApi