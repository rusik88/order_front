import { Link } from 'react-router-dom';
import { fullLink } from '../../../../functions/helperFunctions.ts';
import { ENTITY_ROUTES } from '../../../../router/routes.ts';

const MenuBlockComponent = () => {
    return (
        <nav className="space-y-6">
            <div>
                <div className="mb-3 text-lg font-semibold">
                    <Link to={ fullLink(ENTITY_ROUTES.ORDERS) }>Orders</Link>
                </div>
            </div>
            <div>
                <div className="mb-3 text-lg font-semibold">
                    <Link to={ fullLink(ENTITY_ROUTES.ORDERS) }>Order Statuses</Link>
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
    );
};

export default MenuBlockComponent;