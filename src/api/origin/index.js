/**
 * @desc API统一导出
 * @author maanpeng
 */
import * as user from "./system/user";
import * as account from "./system/account";
import * as menu from "./system/menu";
import * as role from "./system/role";

let api = {
  ...user,
  ...account,
  ...menu,
  ...role,
};

export default api;
