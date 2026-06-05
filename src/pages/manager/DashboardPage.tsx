const DashboardPage = () => {
    return (
        <>
            <h2 className="text-3xl font-bold mb-4">
                Dashboard
            </h2>

            <p className="text-slate-300">
                Welcome to the administration panel. Here you can
                manage orders, users and roles.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <div className="text-slate-400">
                        Orders
                    </div>

                    <div className="text-4xl font-bold mt-2">
                        245
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <div className="text-slate-400">
                        Users
                    </div>

                    <div className="text-4xl font-bold mt-2">
                        1,248
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <div className="text-slate-400">
                        Roles
                    </div>

                    <div className="text-4xl font-bold mt-2">
                        6
                    </div>
                </div>

            </div>
        </>
    );
};

export default DashboardPage;