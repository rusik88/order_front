import ButtonComponent from '../components/ui/ButtonComponent';
import { PUBLIC_ROUTES } from '../router/routes';

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-blue-950 to-blue-900 text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-12 shadow-2xl text-center">
                <div className="text-[120px] font-bold leading-none text-white/10">403</div>
                <h1 className="text-4xl font-bold mt-4">Page Forbidden</h1>
                <p className="text-slate-300 mt-4">The page you are trying to access is forbidden or you don’t have permission.</p>
                <div className="mt-4 flex justify-center">
                    <ButtonComponent link={PUBLIC_ROUTES.LOGIN}>Home</ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;