import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchUser } from "./features/user/userSlice.js";

import Loading from "./components/Loading";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import CreatePost from "./pages/CreatePost";
import Discover from "./pages/Discover";
import Feed from "./pages/Feed";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

const App = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user ) {
        const token = await getToken()
        dispatch(fetchUser(token))
      }
    };
    fetchData()
  }, [user, getToken, dispatch])

  if (status === "loading") return <Loading />;
  if (status === "failed") return (
    <div className="flex items-center justify-center h-screen text-red-500">
      Failed to load user. Please refresh.
    </div>
  );

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
