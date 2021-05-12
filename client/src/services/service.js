import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "")
  : (baseURL = "http://localhost:5000");



const service = axios.create({ baseURL});

const actions = {

 transfer: async str => {
    return await service.get(`/api/${str}`);
  },
 

 

  
};

export default actions;
