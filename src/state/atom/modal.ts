import { atom } from 'recoil';

export const walletModalState = atom<boolean>({
  key: 'walletModalState',
  default: false,
});

export const mobileWalletModalState = atom<boolean>({
  key: 'mobileWalletModalState',
  default: false,
});
