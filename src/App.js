import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Header from './Component/1-header/Header';
import Hero from './Component/2-hero/Hero';
import Main from './Component/3-main/Main';
import Contact from './Component/5-contact/Contact';
import Projects from './Component/4-projects/Projects';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import ProfilePage from './Component/Profile/ProfilePage';
import FriendsPage from './Component/Friends Page/FriendsPage';
import ReelsPage from './Component/RealsPage/RealsPage';
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
// import Login from './Component/login/Login';
function App() {
  const condation=false
  return (

     <div className=''>
    {condation && 
    <Login/>}

    {!condation &&
    <div>
      <Header/>
    <Routes>
      <Route path='/' element={<>
        <Hero/>
      </>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/hero' element={<Hero/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/friendspage' element={<FriendsPage/>}/>
      <Route path='/realspage' element={<ReelsPage/>}/>
      <Route path='/savedItems' element={<SavedItemsPage/>}/>
      <Route path='/newsPage' element={<NewsPage/>}/>
      <Route path='/MemoriesPage' element={<MemoriesPage/>}/>
      <Route path='/AdsPage' element={<AdsPage/>}/>
      <Route path='/SettingsPage' element={<SettingsPage/>}/>
      <Route path='/CreatePost' element={<CreatePost/>}/>
      <Route path='/Messanger' element={<Messenger/>}/>
      <Route path='/MarketPlace' element={<Marketplace/>}/>
      <Route path='/AddAnotherAccount' element={<AddAnotherAccount/>}/>
      <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
      <Route path='/StoriesPage' element={<StoriesPage/>}/>
    </Routes>
    </div>}
    </div>
  );
}
export default App;
