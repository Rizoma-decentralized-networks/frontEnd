import {BrowserRouter, Route, Routes} from 'react-router';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import App from '../App';
import Layout from '../components/Layout';

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Layout>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>   
        </Layout>
        </BrowserRouter>
    );
}
export default AppRouter;
