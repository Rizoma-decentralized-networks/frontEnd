import {BrowserRouter, Route, Routes} from 'react-router';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import App from '../App';


const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;
