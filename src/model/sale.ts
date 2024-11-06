// ---------- 初始化 ----------

// ---------- 开发区间 ----------
export interface SaleQueryInfo {
  platform: string
  item_type: string
  category: string
  platform_id?: string
  item_name?: string
  brand?: string
  model?: string
  sales_rang?: [number, number]
  period?: string | [string, string]
}
