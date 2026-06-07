const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-blue-950 to-blue-900 text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-12 shadow-2xl text-center">
                <div className="text-[120px] font-bold leading-none text-white/10">500</div>
                <h1 className="text-4xl font-bold mt-4">Page Error</h1>
                <p className="text-slate-300 mt-4">The server encountered an error and could not complete your request.</p>
            </div>
        </div>
    );
};

export default ErrorPage;