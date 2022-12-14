// mobx works with class approach
// so class is required

import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  //activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingIntial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  get activitiesByDate(){
    return Array.from(this.activityRegistry.values()).sort((a, b) =>
        Date.parse(b.date) - Date.parse(a.date)
    );
  };
  loadActivities = async () => {    
    this.setLoadingIntial(true);
    try {
      const updatedActivities = await agent.Activities.list();
      updatedActivities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingIntial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingIntial(false);
    }
  };
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingIntial(true);
      try {        
        activity = await agent.Activities.details(id);  
        this.setActivity(activity);
        this.setLoadingIntial(false);
        runInAction( () => { this.selectedActivity = activity});
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingIntial(false);
      }      
    }
  };
  private getActivity = (id: string) => { 
    return this.activityRegistry.get(id);
  };
  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];        
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingIntial = (state: boolean) => {
    this.loadingIntial = state;
  };
  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
        await agent.Activities.create(activity);
        runInAction( () => {
            //this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
            this.loading = false;
            this.editMode = false;
            this.selectedActivity = activity;
        });
    } catch (error) {
        console.log(error)
        runInAction( () => {
            this.loading = false;
        });
    }
  };
  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
        await agent.Activities.update(activity);
        runInAction( () => {            
            //this.activities.filter( item => item.id !== activity.id);
            //this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.loading = false;
            this.editMode = false;
        });
    } catch (error) {
        console.log(error);
        runInAction( () => {
            this.loading = false;
        });
    }
  };
  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
        await agent.Activities.delete(id);
        runInAction( () => {            
            this.activityRegistry.delete(id);
            this.loading = false;            
        });
    } catch (error) {
        console.log(error);
        runInAction( () => {
            this.loading = false;
        });
    }
  };
}
