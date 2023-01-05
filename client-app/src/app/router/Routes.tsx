import { Navigate, RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App></App>,
        children: [   
            { element: <RequireAuth/>, children: [
                { path: 'activities', element: <ActivityDashboard />},
                { path: 'createActivity', element: <ActivityForm />},
                { path: 'profiles/:username', element: <ProfilePage />},
                { path: 'activities/:id', element: <ActivityDetails key='create'/>},
                { path: 'manage/:id', element: <ActivityForm key='manage'/>},            
                { path: 'login', element: <LoginForm />},            
                { path: 'errors', element: <TestErrors/>},  
            ] },          
            { path: 'not-found', element: <NotFound/>},            
            { path: 'server-error', element: <ServerError/>},            
            { path: '*', element: <Navigate replace to="/not-found"/>},            
        ]
    }
];

export const router = createBrowserRouter(routes);