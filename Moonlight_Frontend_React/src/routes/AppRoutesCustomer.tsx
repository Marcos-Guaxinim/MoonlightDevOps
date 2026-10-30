import { Route } from "react-router-dom";
import { CustomerLayout } from "../components/layout/Customer/CustomerLayout";
import MainPage from "../pages/Customer/Home/MainPage";
import { ProtectedRoute } from "./authroutes/ProtectedRoute";
import ProfilePage from "../pages/Customer/User/Profile/ProfilePage";
import LoginPage from "../pages/Customer/Auth/Login/LoginPage";
import RegisterPage from "../pages/Customer/Auth/Register/RegisterPage";
import GamePage from "../pages/Customer/Game/GamePage";
import CartPage from "../pages/Customer/Cart/CartPage";
import { CheckoutPage } from "../pages/Customer/Checkout/CheckoutPage";
import { CheckoutSuccessPage } from "../pages/Customer/Checkout/CheckoutSuccessPage";
import { CheckoutFailurePage } from "../pages/Customer/Checkout/CheckoutFailurePage";
import { CheckoutPendingPage } from "../pages/Customer/Checkout/CheckoutPendingPage";
import CategoryPage from "../pages/Customer/Category/CategoryPage";
import OrderPage from "../pages/Customer/User/Order/OrderPage";
import LibraryPage from "../pages/Customer/User/Library/LibraryPage";
import { CatalogPage } from "../pages/Customer/Catalog/CatalogPage";
import AboutUsPage from "../pages/Customer/AboutUs/AboutUsPage";

export const AppRoutesCustomer = (
    <Route element={<CustomerLayout/>}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutUsPage/>}/>

        {/* rotas protegidas */}
        <Route path="/profile" element={
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        } />

        {/* rotas protegidas */}
        <Route path="/orders" element={
            <ProtectedRoute>
                <OrderPage />
            </ProtectedRoute>
        } />

        <Route path="/library" element={
            <ProtectedRoute>
                <LibraryPage />
            </ProtectedRoute>
        } />

        <Route path="/checkout" element={
            <ProtectedRoute>
                <CheckoutPage />
            </ProtectedRoute>
        } />

        <Route path="/checkout/success" element={
            <ProtectedRoute>
                 <CheckoutSuccessPage />
            </ProtectedRoute>

        } />

        <Route path="/checkout/failure" element={
            <ProtectedRoute>
              <CheckoutFailurePage />
            </ProtectedRoute>
        } />

        <Route path="/checkout/pending" element={
            <ProtectedRoute>
                <CheckoutPendingPage />
            </ProtectedRoute>
        } />

        {/* <Route path="/orders" element={
            <ProtectedRoute>
                <OrdersPage />
            </ProtectedRoute>
        } /> */}
    </Route>
)
