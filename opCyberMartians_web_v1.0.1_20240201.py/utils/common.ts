import { message } from "antd";

// 省略钱包地址
export function formatWalletAddress(address: string): string {
  if (!address) return "";
  const prefix = address.substring(0, 5);
  const suffix = address.substring(address.length - 5);
  return `${prefix}...${suffix}`;
}
// 错误信息
export function ErrInfoCutOut(err: { toString: () => any }) {
  const errorMessage = JSON.parse(JSON.stringify(err)).shortMessage;
  return errorMessage;
}
// message对象
export const messageOpen = {
  success: function (msg: string) {
    message.destroy();
    message.success(msg);
  },
  warning: function (msg: string) {
    message.destroy();
    message.warning(msg);
  },
  error: function (msg: string) {
    message.destroy();
    message.error(msg);
  },
};
