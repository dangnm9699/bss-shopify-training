import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import Addresses from "./pages/Addresses";

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/addresses" element={<Addresses />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App;