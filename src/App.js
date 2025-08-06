import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './pages/Nav';
import Body from './pages/Body';
import Foot from './pages/Foot';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Fashion from './pages/Fashion';
import Orders from './pages/Orders';
import Help from './pages/Help';
import { ToastContainer } from "react-toastify";
import Topwere from './pages/fashion/Topwere';
import Bottomwere from './pages/fashion/Bottomwere';
import Watches from './pages/fashion/Watches';
import Shoes from './pages/fashion/Shoes';
import Luguagebags from './pages/fashion/Luguagebags';
import Biriyani from './pages/foood/Biriyani';
import Bakery from './pages/groceries/Bakery';
import Fruits from './pages/groceries/Fruits';
import Oils from './pages/groceries/Oils';
import Pulses from './pages/groceries/Pulses';
import Rice from './pages/groceries/Rice';
import Spices from './pages/groceries/Spices';
import Vegetables from './pages/groceries/Vegetables';
import HomeCare from './pages/groceries/HomeCare';

// import Biriyani from './pages/foood/Milk';

import Chains from './pages/fashion/Chains';
import Food from './pages/Food';
import Groceries from './pages/Groceries';
import Milk from './pages/foood/Milk';

import Pickle from './pages/foood/Pickle';
import Sweet from './pages/foood/Sweeet';
import Roti from './pages/foood/Roti';

import User from './pages/User';
import AdminPanel from './pages/AdminPanel';
import UploadForm from './UploadForm';
import CreateAdmin from './pages/CreateAdmin';
import AdminLogin from './AdminLogin';
import Eggs from './pages/groceries/Eggs';
import Profile from './pages/Profile';
import About from './pages/About';
// import AdminPanel from './pages/AdminPanel';
// import AIChatCommand from './AIChatCommand';


function App() {
  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path='/about' element={<About />}/>
        <Route path='/category/bakery' element={<Bakery />} />
        <Route path='/category/sweet' element={<Sweet />} />
        <Route path='/category/roti' element={<Roti />} />

        <Route path='/category/eggs' element={<Eggs />} />
        <Route path='/category/rice' element={<Rice />} />
        <Route path='/category/spices' element={<Spices />} />
        <Route path='/category/vegies' element={<Vegetables />} />

        <Route path='/category/pulses' element={<Pulses />} />

        <Route path='/category/fruits' element={<Fruits />} />
        <Route path='/category/homecare' element={<HomeCare />} />
        <Route path='/category/oils' element={<Oils />} />
        <Route path='/category/eggs' element={<Eggs />} />
        <Route path='/category/eggs' element={<Eggs />} />

        <Route path='/user' element={<User />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admincreate' element={<CreateAdmin />} />
        <Route path='/' element={<Body />} />
        <Route path='/category/fashion' element={<Fashion />} />
        <Route path='/category/groceries' element={<Groceries />} />
<Route path='/upload' element={<UploadForm />} />
        <Route path='/category/food' element={<Food />} />
        <Route path='/admin' element={<AdminPanel />} /> 
        <Route path='/category/top-weres' element={<Topwere />} />
        <Route path='/category/bottom-weres' element={<Bottomwere />} />
        <Route path='/category/watches' element={<Watches />} />
        <Route path='/category/shoes' element={<Shoes />} />
        <Route path='/category/luguagebags' element={<Luguagebags />} />
        <Route path='/category/chains' element={<Chains />} />
        <Route path='/category/biriyani' element={<Biriyani/>} />
        <Route path='/category/milk' element={<Milk/>} />
        <Route path='/category/pickle' element={<Pickle />} />

      <Route path='/orders' element={<Orders />} />
      <Route path='/help' element={<Help />} />

        <Route path="/product/:name" element={<ProductDetail/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile />}/>
{/* <Route path='/ai' element={<AIChatCommand />} /> */}
      </Routes>
      <Foot />
    </Router>
     <ToastContainer position="top-center" />

    </>
  );
}

export default App;
