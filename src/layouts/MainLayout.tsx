import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    {' | '}
                    <Link to="/about">About</Link>
                </nav>
            </div>

            <main>
                <Outlet />
            </main>
        </>
    );
}