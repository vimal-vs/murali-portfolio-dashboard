import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Cookies from 'js-cookie';
import { message } from 'antd';


export default function NavbarLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.pathname;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isMobileScreen = window.innerWidth <= 768;
        if (isMobileScreen) {
            setIsOpen(false);
        }
    }, [location]);


    useEffect(() => {
        const accessToken = Cookies.get('token');
        if (!accessToken) {
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        message.success("Logged out")
        navigate("/login");
    };

    return (
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout}>
            <div className='h-screen overflow-hidden w-full'>
                <Outlet />
            </div>
        </Navbar>
    );
};