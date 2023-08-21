import { createContext, useReducer } from "react";
import reducer from "./sidebarReducer";

export interface SideBar {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const initialState = {
    isSidebarOpen: false
}

interface Children {
    children: React.ReactNode;
}

export const SidebarContext = createContext({} as SideBar);
export const SidebarProvider = ({ children }: Children) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const toggleSidebar = () => {
        dispatch({ type: "TOGGLE_SIDEBAR" })
    }
    return (
        <SidebarContext.Provider value = {{
            ...state,
            toggleSidebar
        }}>
            { children }
        </SidebarContext.Provider>
    )
}
