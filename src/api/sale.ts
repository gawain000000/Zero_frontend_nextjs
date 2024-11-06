// ---------- 初始化 ----------
import axios from 'axios'
import type { SaleQueryInfo } from '#src/model/sale'

const axiosPlus = axios.create({
  headers: {
    'accept': 'application/json',
    'API-key': 'Oflkm3ZmM9sE2Dkhe7dSDIJqdR8G4wSm',
  },
})
// ---------- 开发区间 ----------

// 接口
const SALE_QUERY = '/api/v1/backend/sales_querying/sales_querying'

// API
export function sendSaleQuery(data: SaleQueryInfo) {
  axiosPlus.post(SALE_QUERY, data).then((res) => {
    return res
  })
}
