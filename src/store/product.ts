import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  selectedProductID: '',
}

type ProductState = typeof initialState

interface ProductAction {
  changeProductId: (product_id: string) => void
};

export const useProductStore = create<ProductState & ProductAction>()(

  persist(set => ({
    ...initialState,

    changeProductId: (payload) => {
      return set({
        selectedProductID: payload,
      })
    },
  }), { name: 'product-info' }),

)
