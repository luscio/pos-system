import React, { useState, useMemo } from "react";
import { Icon, Drawer, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleTabsStatusAction,
    toggleCashHotKeyStatusAction,
} from "../../../redux/action";
import config from "../../../config";

const { GLOBAL_TABS_STATUS, GLOBAL_CASH_HOTKEY_SHOW } = config;


function CustomSwitch({
    status,
    label,
    toggleFn,
    style,
}) {
    return (
        <div style={style}>
            {label}:&nbsp;&nbsp;&nbsp;&nbsp;
            <Switch onChange={toggleFn} checked={status} />
        </div>
    );
}

const selector = ({ showTabs, showCashHotKey }) => ({ showTabs, showCashHotKey });

export function SettingDrawer({
    show,
    hide
}) {
    const { showTabs, showCashHotKey } = useSelector(selector);

    const dispatch = useDispatch();

    const {
        toggleTabs,
        toggleCashHotKey
    } = useMemo(() => ({
        toggleTabs: (bool) => dispatch(toggleTabsStatusAction(bool)),
        toggleCashHotKey: (bool) => dispatch(toggleCashHotKeyStatusAction(bool))
    }), [dispatch]);

    function toggleMulitTabs(bool) {
        bool ? localStorage.removeItem(GLOBAL_TABS_STATUS) : localStorage.setItem(GLOBAL_TABS_STATUS, "hide");
        toggleTabs(bool);
    }

    function toggleCashHotKeyStatus(bool) {
        bool ? localStorage.removeItem(GLOBAL_CASH_HOTKEY_SHOW) : localStorage.setItem(GLOBAL_CASH_HOTKEY_SHOW, "hide");
        toggleCashHotKey(bool);
    }

    const style = {
        display: "flex",
    }
    const style1 = {
        ...style,
        marginTop: "40px",
    }
    const style2 = {
        ...style,
        marginTop: "20px",
    }

    return (
        <Drawer
            visible={show}
            onClose={hide}
        >
            <CustomSwitch style={style1} label="启用多标签" status={showTabs} toggleFn={toggleMulitTabs} />
            <CustomSwitch style={style2} label="启用收银热键列表" status={showCashHotKey} toggleFn={toggleCashHotKeyStatus} />
        </Drawer>
    );
}

export function Setting() {

    const [show, setShow] = useState(false);


    function showDrawer() {
        setShow(true);
    }

    function hideDrawer() {
        setShow(false);
    }

    return (
        <>
            <Icon
                type="setting"
                onClick={showDrawer}
                style={{
                    fontSize: 18,
                    marginRight: 20,
                    cursor: "pointer"
                }} />
            <SettingDrawer show={show} hide={hideDrawer} />
        </>
    );
}
