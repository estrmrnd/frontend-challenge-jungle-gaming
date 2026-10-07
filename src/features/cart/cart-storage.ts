import type { NFT } from '@/types/nft'

export type CartItem = {
  nft: NFT
  quantity: number
}

const CART_STORAGE_KEY = 'kurio-cart'

export function getCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)

  if (!storedCart) {
    return []
  }

  try {
    return JSON.parse(storedCart) as CartItem[]
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart),
  )
}

export function addToCart(
  nft: NFT,
  quantity = 1,
): CartItem[] {
  const cart = getCart()

  const existingItem = cart.find(
    (item) => item.nft.id === nft.id,
  )

  let updatedCart: CartItem[]

  if (existingItem) {
    updatedCart = cart.map((item) =>
      item.nft.id === nft.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item,
    )
  } else {
    updatedCart = [
      ...cart,
      {
        nft,
        quantity,
      },
    ]
  }

  saveCart(updatedCart)

  return updatedCart
}

export function removeFromCart(
  nftId: string,
): CartItem[] {
  const updatedCart = getCart().filter(
    (item) => item.nft.id !== nftId,
  )

  saveCart(updatedCart)

  return updatedCart
}

export function updateCartQuantity(
  nftId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(nftId)
  }

  const updatedCart = getCart().map((item) =>
    item.nft.id === nftId
      ? {
          ...item,
          quantity,
        }
      : item,
  )

  saveCart(updatedCart)

  return updatedCart
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY)
}