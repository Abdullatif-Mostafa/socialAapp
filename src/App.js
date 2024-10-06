import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Component/1-header/Header';
import Hero from './Component/2-hero/Hero';
import Main from './Component/3-main/Main';
import Contact from './Component/5-contact/Contact';
import Projects from './Component/4-projects/Projects';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import ProfilePage from './Component/Profile/ProfilePage';
import FriendsPage from './Component/Friends Page/FriendsPage';
import SavedItemsPage from './Component/Saved Items/SavedItems';
import NewsPage from './Component/News Page/NewsPage';
import MemoriesPage from './Component/Memories Page/Memories';
import AdsPage from './Component/AdsPage/AdsPage';
import SettingsPage from './Component/Settings/Settings';
import CreatePost from './Component/Posts/CreatePost';
import Marketplace from './Component/MarketPlace/MarketPlace';
import Messenger from './Component/Messanger/Messages';
import AddAnotherAccount from './Component/1-header/AddAnotherAccount';
import ForgetPassword from './Component/Forget Password/ForgetPassword';
import StoriesPage from './Component/Stories Page/StoriesPage';
import { useEffect } from 'react';
import ReelsPage from './Component/RealsPage/RealsPage';
import PostDetails from './Component/Post Details/PostDetails';
import EditPostModal from './Component/EditPost/EditPost';
import GroupPage from './Component/Group page/GroupPage';
import Post from './Component/Posts/Post';

function App() {
  // const user = {
  //   comments_count: 4,
  //   email: "Ahmededrys8@gmail.com",
  //   id: 16354,
  //   name: "احمد",
  //   posts_count: 1,
  //   profile_image: {},
  //   username: "Ahmededrys8@gmail.com",
  // };
  
  // localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem("token","155589|VQEXjQLKVSseupN27NVOahjr8ItsUsOyrbSvGL0a")
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // navigate("/"); // Redirect to home if token exists
    } else {
      // Navigate only if not on login/register/forget password
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register' &&
        window.location.pathname !== '/forgetPassword'
      ) {
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return (
    <div>
      {token && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

        {/* Protected Routes */}
        {token ? (
          <>
            <Route path="/" element={<Hero />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/friendspage" element={<FriendsPage />} />
            <Route path="/realspage" element={<ReelsPage />} />
            <Route path="/savedItems" element={<SavedItemsPage />} />
            <Route path="/newsPage" element={<NewsPage />} />
            <Route path="/memoriesPage" element={<MemoriesPage />} />
            <Route path="/adsPage" element={<AdsPage />} />
            <Route path="/settingsPage" element={<SettingsPage />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/Messenger" element={<Messenger />} />
            <Route path="/marketPlace" element={<Marketplace />} />
            <Route path="/addAnotherAccount" element={<AddAnotherAccount />} />
            <Route path="/storiesPage" element={<StoriesPage />} />
            <Route path='posts/:postId' element={<PostDetails/>}/>
            <Route path='EditPostModal' element={<EditPostModal/>}/>
            <Route path='GroupPage' element={<GroupPage/>}/>
            <Route path='Post' element={<Post/>}/>
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
