import axios from 'axios'
const API_ROOT = process.env.NODE_ENV === 'development' ? 'http://localhost:8097' : 'https://testvlatava-agent-tool.fit.dmall.com';
axios.defaults.baseURL = API_ROOT

const init =(context)=>{
  console.log("action init")
  let val = {'pageSize': 200, 'pageNum': 1};
  axios.post('/application/filter', val).then((resp) => {
    if (resp.data.success) {
      context.commit("setAppList", resp.data.data.resultList);
    }
  })
}
export {
  init
}
