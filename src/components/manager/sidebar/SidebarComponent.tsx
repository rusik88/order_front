const SidebarComponent = () => {
    return (
        <aside
            className="
                w-72
                border-r
                border-white/10
                bg-white/5
                backdrop-blur-md
                p-6
            "
        >

            <nav className="space-y-6">

                <div>
                    <div className="mb-3 text-lg font-semibold">
                        Orders
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            Create
                        </a>

                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            List
                        </a>
                    </div>
                </div>

                <div>
                    <div className="mb-3 text-lg font-semibold">
                        Users
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            Create
                        </a>

                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            List
                        </a>
                    </div>
                </div>

                <div>
                    <div className="mb-3 text-lg font-semibold">
                        Roles
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            Create
                        </a>

                        <a
                            href="#"
                            className="
                                rounded-lg
                                px-3
                                py-2
                                text-slate-300
                                hover:bg-white/10
                                hover:text-white
                                transition
                            "
                        >
                            List
                        </a>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default SidebarComponent;