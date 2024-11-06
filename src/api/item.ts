// ---------- 初始化 ----------
import axios from 'axios'
import type { ItemSearchInfo } from '#src/model/item'

const axiosPlus = axios.create({
  headers: {
    'accept': 'application/json',
    'API-key': 'Oflkm3ZmM9sE2Dkhe7dSDIJqdR8G4wSm',
  },
})
// ---------- 开发区间 ----------

// 接口
const ITEM_SEARCH = '/api/v1/backend/item_information_querying/item_searching'

// API
export function sendItemSearch(data?: ItemSearchInfo) {
  axiosPlus.post(ITEM_SEARCH, data).then((res) => {
    return res
  })
}
