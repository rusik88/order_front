import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/manager/header/HeaderComponent';
import FooterComponent from '../components/manager/footer/FooterComponent';
import SidebarComponent from '../components/manager/sidebar/SidebarComponent';

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-blue-900 text-white flex flex-col">
            <HeaderComponent />
            <div className="flex flex-1">
                <SidebarComponent />
                <main className="flex-1 p-8">
                    <div className="rounded-3xl border border-white/10 bg-white/5  backdrop-blur-md p-8 shadow-2xl">
                        <Outlet />
                    </div>
                </main>
            </div>
            <FooterComponent />
        </div>
    );
}