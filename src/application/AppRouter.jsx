import {BrowserRouter, Route, Routes} from 'react-router';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import App from '../App';
import Layout from '../components/Layout';
import PostMarkPage from '../pages/PostMakPage';
import ExplorePage from '../pages/ExplorePage';

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Layout>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post-mark" element={<PostMarkPage />} />
            <Route path="/explore" element={<ExplorePage />} />
        </Routes>   
        </Layout>
        </BrowserRouter>
    );
}
export default AppRouter;
