import "../styles/globals.scss";
import "../styles/font.scss";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { opBNB, opBNBTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { okxWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...(process.env.APP_ENV === "production" ? [opBNB] : [opBNBTestnet])],
  [publicProvider()]
);
// 这个projectId是WalletConnect Cloud的
const projectId = "926416b44dc72bed4897d74529b24e3f";
// 加上的钱包列表
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        locale="en"
        initialChain={Number(process.env.NEXT_PUBLIC_OGPASS_CHAINID)}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
