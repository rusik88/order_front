import { fullLink } from '../../../functions/helperFunctions';
import { Link } from 'react-router-dom';
import { ENTITY_ROUTES } from '../../../router/routes';

const SidebarComponent = () => {
    return (
        <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-md p-6">

            <nav className="space-y-6">
                <div>
                    <div className="mb-3 text-lg font-semibold">
                        <Link to={ fullLink(ENTITY_ROUTES.ORDERS) }>Orders</Link>
                    </div>
                </div>
                <div>
                    <div className="mb-3 text-lg font-semibold">
                        <Link to={ fullLink(ENTITY_ROUTES.USERS) }>Users</Link>
                    </div>
                </div>
                <div>
                    <div className="mb-3 text-lg font-semibold">
                        <Link to={ fullLink(ENTITY_ROUTES.ROLES) }>Roles</Link>
                    </div>
                </div>
                <div>
                    <div className="mb-3 text-lg font-semibold">
                        <Link to={ fullLink(ENTITY_ROUTES.SETTINGS) }>Settings</Link>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default SidebarComponent;