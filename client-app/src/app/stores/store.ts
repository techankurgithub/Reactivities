import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activitystore: ActivityStore
}

export const store: Store = {
    activitystore: new ActivityStore()
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}