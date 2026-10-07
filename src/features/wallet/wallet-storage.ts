export type WalletNetwork =
  | 'ethereum'
  | 'polygon'
  | 'solana'

export type Wallet = {
  id: string
  displayName: string
  name: string
  network: WalletNetwork
  profileName: string
  address: string
  secondaryWallet: string
  walletType: string
  referralCode: string
  email: string
  ens: string
}

const WALLET_STORAGE_KEY = 'kurio-wallet'

export function saveWallet(wallet: Wallet) {
  localStorage.setItem(
    WALLET_STORAGE_KEY,
    JSON.stringify(wallet),
  )
}

export function getWallet(): Wallet | null {
  const storedWallet =
    localStorage.getItem(WALLET_STORAGE_KEY)

  if (!storedWallet) {
    return null
  }

  try {
    return JSON.parse(storedWallet) as Wallet
  } catch {
    localStorage.removeItem(WALLET_STORAGE_KEY)
    return null
  }
}

export function clearWallet() {
  localStorage.removeItem(WALLET_STORAGE_KEY)
}