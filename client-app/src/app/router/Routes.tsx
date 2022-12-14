import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import App from "../App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App></App>,
        children: [            
            { path: 'activities', element: <ActivityDashboard />},
            { path: 'createActivity', element: <ActivityForm />},
            { path: 'activities/:id', element: <ActivityDetails key='create'/>},
            { path: 'manage/:id', element: <ActivityForm key='manage'/>},            
        ]
    }
];

export const router = createBrowserRouter(routes);