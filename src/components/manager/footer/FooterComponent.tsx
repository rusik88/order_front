const FooterComponent = () => {
    return (
        <footer
            className="
            h-16
            border-t
            border-white/10
            bg-white/5
            backdrop-blur-md
            px-8
            flex
            items-center
            justify-between
        "
        >
            <div className="text-slate-400">
                © 2026 Order Management System
            </div>

            <div className="text-slate-500">
                Laravel 13 • React 20 • Tailwind CSS
            </div>
        </footer>
    );
};

export default FooterComponent;