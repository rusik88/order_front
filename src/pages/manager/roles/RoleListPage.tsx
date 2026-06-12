import ButtonComponent from '../../../components/ui/ButtonComponent';
import { ENTITY_ROUTES } from '../../../router/routes';
import PaginateComponent from '../../../components/common/PaginateComponent';
import { useGetRolesQuery } from '../../../services/RolesApi';
import { useEffect, useState } from 'react';
import type { IApiAppResponse } from '../../../interfaces/common/ApiAppInterfaces';
import type { IRoleItem, IRoleResponseData } from '../../../interfaces/manager/RolesInterfaces';
import LoaderComponent from '../../../components/common/LoaderComponent';
import PerPageComponent from '../../../components/common/PerPageComponent';
import type { IPerPageItem } from '../../../interfaces/common/PerPageInterfaces.ts';
import { fullLink } from '../../../functions/helperFunctions.ts';

const options: IPerPageItem[] = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];

export const RoleListPage = () => {
    const [ page, setPage ] = useState<number>(1);
    const [ perPage, setPerPage ] = useState<number>(options[0].value);
    const [ nameFilter, setNameFilter ] = useState<string>('');
    const [search, setSearch] = useState('');

    const { data, isFetching }: { data: IApiAppResponse<IRoleResponseData>, isFetching: boolean } = useGetRolesQuery({ page, per_page: perPage, name: nameFilter });

    useEffect(() => {
        const timer = setTimeout(() => {
            const value = search.trim();

            if (value.length >= 3) {
                setNameFilter(value);
                setPage(1);
            } else if (value.length === 0) {
                setNameFilter('');
                setPage(1);
            }

        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <>
            {isFetching && (
                <LoaderComponent />
            )}

            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-bold'>Roles List</h2>
                <ButtonComponent type={ 'inverse' } link={ fullLink(`${ENTITY_ROUTES.ROLES}/create`) }>+ Create Role</ButtonComponent>
            </div>

            <div className='flex justify-between mb-5'>
                <div className='relative flex-1 max-w-md'>
                    <input
                        type='text'
                        placeholder='Search by name...'
                        onChange={e => setSearch(e.target.value)}
                        className='w-full h-[42px] px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 outline-none transition focus:border-indigo-400/50 hover:bg-white/10'
                    />
                    <svg className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'
                        width='18'
                        height='18'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z'
                        />
                    </svg>
                </div>
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