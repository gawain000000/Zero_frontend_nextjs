// ---------- 初始化 ----------
import axios from 'axios'
import type { CompatibilityQueryInfo } from '#src/model/compatibility'

const axiosPlus = axios.create({
  headers: {
    'accept': 'application/json',
    'API-key': 'Oflkm3ZmM9sE2Dkhe7dSDIJqdR8G4wSm',
  },
})
// ---------- 开发区间 ----------

// 接口
const COMPATIBILITY_QUERY = '/api/v1/backend/compatibility_querying/compatibility_querying'

// API
export function sendCompatibilityQuery(data: CompatibilityQueryInfo) {
  axiosPlus.post(COMPATIBILITY_QUERY, data).then((res) => {
    return res
  })
}
