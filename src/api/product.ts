import { request } from '#src/utils'

export interface AnyDataType {
  userId: any
  id: string
  title: string
  body: string
}

export function fetchTest(data: any) {
  return request
    .get('product/test-get', { searchParams: data })
    .json<ApiResponse<AnyDataType[]>>()
}

export function fetchProduct(data: { range: string }) {
  return request.post('product/', { json: data }).json<ApiResponse<string[]>>()
}
