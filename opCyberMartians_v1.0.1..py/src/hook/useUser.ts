import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { getAccounts, getUserAssets } from "../api/user"
import { getUrlParams } from "../utils";
import useUserStore, { User } from "../stores/user";

export const getTwitterId = async () => {
  const value = await Cookies.get("twid");
  const id = value?.split("=")?.[1];
  return id || ""
};

export const getToken = async () => {
  const val = await chrome.storage.local.get(['token'])
  return val.token
}
export const getLogged = () => {
  const user = useUserStore.getState().user
  return user && user?.inviteCode && user?.address
}

function useTwitter() {
  const [id, setId] = useState('')
  useEffect(() => {
    (async () => {
      const val = await getTwitterId()
      setId(val)
    })()
  }, [])
  return {
    id
  }
}

function useToken() {
  const [token, setToken] = useState('')

  const updateToken = async (token: string) => {
    await chrome.storage.local.set({ token })
    setToken(token)
  }
  const removeToken = async () => {
    setToken('')
    await chrome.storage.local.remove(['token'])
  }
  useEffect(() => {
    (async () => {
      const val = await getToken()
      setToken(val || '')
    })()
  }, [])
  return {
    token, updateToken, removeToken
  }
}
export default function useUser() {
  const { id: twitterId } = useTwitter();
  const { token, updateToken, removeToken } = useToken()

  const [user, _setUser] = useState<User>(useUserStore.getState().user)
  const [initialized, _setInitialized] = useState(useUserStore.getState().initialized);

  const unsubscribe = useUserStore.subscribe((state) => {
    _setUser(state.user)
    _setInitialized(state.initialized)
  });

  const setUserStoreState = (state: {
    user?: User
    initialized?: boolean
  }) => {
    useUserStore.setState(state)
  }

  const logged = useMemo(() => {
    if (user && user?.inviteCode && user?.address) {
      return true
    }
    else {
      return false
    }
  }, [user])

  const login = () => {
    updateUserInfo()
  };

  const logout = async () => {
    await removeToken()
    setUserStoreState({ user: null })
    useUserStore.setState({ user: null })
    setUserStoreState({ initialized: true })
  }

  const updateUserInfo = async () => {
    try {
      const [info, assets] = await Promise.all([getAccounts(), getUserAssets()])
      const _u = {
        ...info,
        ...assets
      }
      setUserStoreState({ user: _u })
      return _u
    } catch (error) {
      if ((error as any).code === -2) {
        logout()
      }
    }
  }

  useEffect(() => {
    if (user) {
      setUserStoreState({ initialized: true })
    }
  }, [user])

  useEffect(() => {
    (async () => {
      const params = getUrlParams(window.location.search);
      const token = await getToken()
      if (initialized) {
        console.log('//已初始化 ')
        return
      }
      else if (!token && !params?.token && user?.address) {
        console.log('//未授权 ')
        setUserStoreState({ initialized: true })
      }
      else if (params?.token) {
        window.history.replaceState({}, '', `${window.location.origin}${window.location.pathname}`)
        console.log('//授权回来 ')
        await updateToken(params.token)
        await updateUserInfo()
      }
      else if (token) {
        try {
          const [info, assets, id] = await Promise.all([getAccounts(), getUserAssets(), getTwitterId()])
          if (id !== info?.twitterUserId) {
            console.log('//切换账号 ')
            await removeToken()
            setUserStoreState({ initialized: true })
          } else {
            console.log('//已授权 ')
            const _u = {
              ...info,
              ...assets
            }
            setUserStoreState({ user: _u })
          }
        } catch (error) {
          if ((error as any).code === -2) {
            logout()
          }
        }
      }
      else {
        console.log('else //未登录')
        setUserStoreState({ initialized: true })
      }
    })()

    return () => unsubscribe()
  }, [])


  return {
    user,
    twitterId,
    logged,
    initialized,
    token,
    login,
    logout,
    updateUserInfo,
    updateToken,
  };
}
