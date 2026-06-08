import ButtonComponent from "../../../components/ui/ButtonComponent.tsx";
import {ENTITY_ROUTES} from "../../../router/routes.ts";

export const RoleListPage = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-bold'>Roles List</h2>

                <ButtonComponent type={ 'inverse' } link={ `${ENTITY_ROUTES.ROLES}/create` }>+ Create Role</ButtonComponent>
            </div>

            <div className='overflow-x-auto rounded-2xl border border-white/10'>
                <table className='w-full text-left'>
                    <thead className='bg-white/5 text-slate-300 text-sm'>
                    <tr>
                        <th className='p-4'>ID</th>
                        <th className='p-4'>Name</th>
                        <th className='p-4'>Slug</th>
                        <th className='p-4 text-right'>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {[1,2,3,4,5].map(item => (
                        <tr
                            key={item}
                            className='border-t border-white/10 hover:bg-white/5 transition'
                        >
                            <td className='p-4 text-slate-300'>
                                #{item}
                            </td>

                            <td className='p-4'>
                                John Doe {item}
                            </td>

                            <td className='p-4 text-slate-300'>
                                ${(100 * item)}
                            </td>

                            <td className='p-4 text-right space-x-2'>
                                <ButtonComponent type={ 'info' } link={ `${ENTITY_ROUTES.ROLES}/edit` }>Edit</ButtonComponent>
                                <ButtonComponent type={ 'error' } link={ `${ENTITY_ROUTES.ROLES}/edit` }>Delete</ButtonComponent>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center items-center mt-8 space-x-2 text-slate-300'>
                <button className='px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>
                    { '<' }
                </button>

                <button className='px-3 py-1 rounded-lg bg-white/10 border border-white/20'>
                    1
                </button>

                <span className='px-2 text-slate-500'>...</span>

                <button className='px-3 py-1 rounded-lg hover:bg-white/10 transition'>
                    4
                </button>
                <button className='px-3 py-1 rounded-lg hover:bg-white/10 transition'>
                    5
                </button>
                <button className='px-3 py-1 rounded-lg hover:bg-white/10 transition'>
                    6
                </button>

                <span className='px-2 text-slate-500'>...</span>

                <button className='px-3 py-1 rounded-lg hover:bg-white/10 transition'>
                    20
                </button>

                <button className='px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>
                    {'>'}
                </button>
            </div>
        </>
    );
};

export default RoleListPage;