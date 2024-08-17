import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "./components/header/header"
import Home from "./components/pages/home/home"
import SignIn from "./components/pages/Auth/SignIn"
import Signup from "./components/pages/Auth/SignUp"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import Products from "./components/pages/ProductsPage/Products"
import Product from "./components/pages/ProductsPage/Product"
import WishList from "./components/pages/wishlist/WishList"
import Bag from "./components/pages/Cart/Bag"

function App() {
 
 
  return (
    <Router >
      <Header/>
      <main >
        <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/men" element={<Products />} />
        <Route path="/women" element={<Products />} />
        <Route path="/electronics" element={<Products />} />
        <Route path="/jewelery" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/bag" element={<Bag />} />
      </Routes>
      </main>
    </Router>
      
  )
}

export default App
