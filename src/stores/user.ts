import { create } from 'zustand'
// import { createStore } from 'zustand/vanilla';

export type User = {
    address?: string
    avatar: string
    inviteCode?: string
    twitterName: string
    twitterUserId: string
    twitterUserName: string
    mineralNum: number //矿石
    integralNum: number //积分
} | null

export type State = {
    user: User
    initialized: boolean
}

const useUserStore = create<State>((set) => ({
    user: null,
    initialized: false
}))

export default useUserStore