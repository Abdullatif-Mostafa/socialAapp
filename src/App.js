import { Routes, Route, useNavigate, Suspense, lazy } from 'react-router-dom';
import Header from './Component/1-header/Header';
import { useEffect } from 'react';

// Lazy load components
const Hero = lazy(() => import('./Component/2-hero/Hero'));
const Main = lazy(() => import('./Component/3-main/Main'));
const Contact = lazy(() => import('./Component/5-contact/Contact'));
const Projects = lazy(() => import('./Component/4-projects/Projects'));
const Login = lazy(() => import('./Component/Login/Login'));
const Register = lazy(() => import('./Component/Register/Register'));
const ProfilePage = lazy(() => import('./Component/Profile/ProfilePage'));
const FriendsPage = lazy(() => import('./Component/Friends Page/FriendsPage'));
const SavedItemsPage = lazy(() => import('./Component/Saved Items/SavedItems'));
const NewsPage = lazy(() => import('./Component/News Page/NewsPage'));
const MemoriesPage = lazy(() => import('./Component/Memories Page/Memories'));
const AdsPage = lazy(() => import('./Component/AdsPage/AdsPage'));
const SettingsPage = lazy(() => import('./Component/Settings/Settings'));
const CreatePost = lazy(() => import('./Component/Posts/CreatePost'));
const Marketplace = lazy(() => import('./Component/MarketPlace/MarketPlace'));
const Messenger = lazy(() => import('./Component/Messanger/Messages'));
const AddAnotherAccount = lazy(() => import('./Component/1-header/AddAnotherAccount'));
const ForgetPassword = lazy(() => import('./Component/Forget Password/ForgetPassword'));
const StoriesPage = lazy(() => import('./Component/Stories Page/StoriesPage'));
const ReelsPage = lazy(() => import('./Component/RealsPage/RealsPage'));
const PostDetails = lazy(() => import('./Component/Post Details/PostDetails'));
const EditPostModal = lazy(() => import('./Component/EditPost/EditPost'));
const GroupPage = lazy(() => import('./Component/Group page/GroupPage'));
const Post = lazy(() => import('./Component/Posts/Post'));

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
  // localStorage.setItem("token","155589|VQEXjQLKVSseupN27NVOahjr8ItsUsOyrbSvGL0a")
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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
