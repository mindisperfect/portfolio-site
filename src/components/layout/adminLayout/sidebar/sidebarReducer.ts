type State = {
    isSidebarOpen: boolean;
  };
  
  type Action = {
    type: string;
  };

const sidebarReducer = (state: State, action: Action)=> {
    if(action.type === "TOGGLE_SIDEBAR"){
        return { ...state, isSidebarOpen: !state.isSidebarOpen}
    }
    throw new Error(`No matching "${action.type} action type`);
}

export default sidebarReducer;