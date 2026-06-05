const HeaderComponent = () => {
    return (
        <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="h-full px-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Orders
                </h1>

                <button
                    className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    hover:bg-white/10
                    transition
                "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
                        />
                    </svg>

                    Logout
                </button>
            </div>
        </header>
    );
};

export default HeaderComponent;