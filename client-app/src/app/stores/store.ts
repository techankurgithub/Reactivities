import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activitystore: ActivityStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activitystore: new ActivityStore(),
    commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}