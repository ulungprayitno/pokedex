import axios  from "axios";
import { BaseUrl } from "./constant";

const api = axios.create({
    baseURL: BaseUrl,
    timeout: 10000
})

export default api