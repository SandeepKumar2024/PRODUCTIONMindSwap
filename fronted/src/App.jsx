import React, { useContext, useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
  json
} from "react-router-dom";
import "./App.css";
import DarkModeContext from "./Components/Dark Mode/DarkModeContext";
import LandingPage from "./Pages/LandingPage";
import MainPage from "./Pages/MainPage";
import NotificationPage from "./Pages/NotificationPage";
import FavoriteProfilePage from "./Pages/FavoriteProfilePage";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import { Provider, useSelector } from "react-redux";
import { store } from "../src/Reducer/store";
import MyProfilePage from "./Pages/MyProfilePage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import SelectedProfilePage from "./Pages/SelectedProfilePage";
import VideoCallPage from "./Pages/VideoCallPage/VideoCallPage";
import SearchResultPage from "./Pages/Search Result/SearchResultPage";
import HistoryPage from "./Pages/HistoryPage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Admin from "./Pages/Admin Page/Admin";

import axios from "axios";

import LoadingComponent from "./Components/Loading/LoadingComponent";


//adds

function App() {

  const [data, setData] = useState(null)
  const isAuthenticated = () => {
    // Check if the user is authenticated by either token in localStorage or cookie containing Google ID
    return localStorage.getItem('userId') !== null || localStorage.getItem('token') !== null;
  };
  const isAuthenticatedbyAdmin = () => {
    // Check if the user is authenticated by either token in localStorage or cookie containing Google ID
    return data;
  };
  // console.log("googleId authentication",document.cookie.includes('googleId'));
  const PrivateRoute = ({ path, element }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };
  const PrivateRouteAdmin = ({ path, element }) => {
    return isAuthenticatedbyAdmin() ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };

  useEffect(() => {
    const getUserData = async () => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      try {
        const res = await axios.get(`/api/user/get/${userId}`)
        setData(res.data.isAdmin)
        console.log("response data from app.javascript", res.data.isAdmin)
      }
      catch (error) {
        console.log(error)
      }
    }
    getUserData()
  })

  const { darkMode } = useContext(DarkModeContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/main",
      element: <PrivateRoute path="/main" element={<MainPage />} />,
      
      // element: <MainPage />,
    },
    {
      path: "/main/search",
      element: <PrivateRoute path="/main/search" element={<SearchResultPage />} />,

    },
    {
      path: "/notifications",
      element: <PrivateRoute path="/notifications" element={<NotificationPage />} />,
    },
    {
      path: "/favorites",
      element: <PrivateRoute path="/favorites" element={<FavoriteProfilePage />} />,
    },
    {
      path: "/updatProfile",
      element: <PrivateRoute path="/updateProfile" element={<UpdateProfilePage />} />,
    },
    {
      path: "/myProfile",
      element: <PrivateRoute path="/myProfile" element={<MyProfilePage />} />,
    },
    {
      path: "/history",
      element: <PrivateRoute path="/history" element={<HistoryPage />} />
    },
    {
      path: "/myAnalytics",
      element: <PrivateRoute path="/myAnalytics" element={<AnalyticsPage />} />
    },
    {
      path: "/reset/password/:token",
      element: <ResetPasswordPage />,
    },
    {
      path: "/selectedProfile/:id",
      element: <SelectedProfilePage />
    },
    {
      path: "/videoCall/:id",
      element: <PrivateRoute path="/videoCall/:id" element={<VideoCallPage />} />,
    },
    {
      path: "/admin/dashboard",

      element: <PrivateRouteAdmin path="/admin/dashboard" element={<Admin />} />,
      
    }

    ,
    {
      path: "/loading",
      element: <LoadingComponent />
    },


  ]);

  return (
    <Provider store={store}>
      <div className={darkMode ? "dark-mode" : ""}>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
