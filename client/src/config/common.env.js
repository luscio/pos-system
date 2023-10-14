const ICON_ONLINE_URL = process.env.TYPE === "offline" ? "icon://static/js/iconfontcn.js" : "/static/js/iconfontcn.js";

export const common = {
    store_name: "小林超市",
    GLOBAL_BASE_URL_KEY: "POSSYSTEM_BASEURL",
    GLOBAL_TOKEN_KEY: "POSSYSTEM_TOKEN",
    GLOBAL_TABS_STATUS: "GLOBAL_TABS_STATUS",
    GLOBAL_SIDER_COLLAPSED: "GLOBAL_SIDER_COLLAPSED",
    GLOBAL_CASH_HOTKEY_SHOW: "GLOBAL_CASH_HOTKEY_SHOW",
    ICON_ONLINE_URL,
    GLOBAL_FRONT_BOX_STATUS: "GLOBAL_FRONT_BOX_STATUS",
    GLOBAL_FRONT_AUTO_PRINT_STATUS: "GLOBAL_FRONT_AUTO_PRINT_STATUS",
    DEFAULT_SUPPLIER_NAME: "默认供货商",

    DEFAULT_CATEGORIES_PARENT: "TREE_BASE"
    // 默认分类树根节点key
}