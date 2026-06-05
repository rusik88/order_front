import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-blue-900">
            <div className="container mx-auto py-5 h-screen flex items-center justify-center flex-col">
                <Outlet />
            </div>
        </div>
    );
}