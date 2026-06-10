import ButtonComponent from '../../../components/ui/ButtonComponent';
import { ENTITY_ROUTES } from '../../../router/routes';
import PaginateComponent from '../../../components/common/PaginateComponent';
import { useGetRolesQuery } from '../../../services/RolesApi';
import { useState } from 'react';
import type { IApiAppResponse } from '../../../interfaces/common/ApiAppInterfaces';
import type { IRoleItem, IRoleResponseData } from '../../../interfaces/manager/RolesInterfaces';
import LoaderComponent from '../../../components/common/LoaderComponent';
import PerPageComponent from '../../../components/common/PerPageComponent';
import type { IPerPageItem } from '../../../interfaces/common/PerPageInterfaces.ts';

const options: IPerPageItem[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];

export const RoleListPage = () => {
    const [ page, setPage ] = useState<number>(1);
    const [ perPage, setPerPage ] = useState<number>(1);
    const [ nameFilter, setNameFilter ] = useState<string>('');

    const { data, isFetching }: { data: IApiAppResponse<IRoleResponseData>, isFetching: boolean } = useGetRolesQuery({ page, per_page: perPage, name: nameFilter });

    return (
        <>
            {isFetching && (
                <LoaderComponent />
            )}

            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-bold'>Roles List</h2>
                <ButtonComponent type={ 'inverse' } link={ `${ENTITY_ROUTES.ROLES}/create` }>+ Create Role</ButtonComponent>
            </div>

            <div className='flex justify-end mb-5'>
                <PerPageComponent options={options} changeHandle={setPerPage} resetPaginateHandle={setPage} />
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
                    {data && data.data !== undefined && data.data.roles !== undefined &&
                        data.data.roles.map((item: IRoleItem) => (
                                <tr
                                    key={item.id}
                                    className='border-t border-white/10 hover:bg-white/5 transition'
                                >
                                    <td className='p-4 text-slate-300'>
                                        #{item.id}
                                    </td>

                                    <td className='p-4'>
                                        {item.name}
                                    </td>

                                    <td className='p-4 text-slate-300'>
                                        {item.slug}
                                    </td>

                                    <td className='p-4 text-right space-x-2'>
                                        <ButtonComponent type={ 'info' } link={ `${ENTITY_ROUTES.ROLES}/edit/${item.id}` }>Edit</ButtonComponent>
                                        <ButtonComponent type={ 'error' } link={ `${ENTITY_ROUTES.ROLES}/edit` }>Delete</ButtonComponent>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            {data && data.data !== undefined && data.data.paginate !== undefined && data.data.paginate.total > perPage &&
                <PaginateComponent paginate={ data.data.paginate } paginateHandle={ setPage } />
            }
        </>
    );
};

export default RoleListPage;