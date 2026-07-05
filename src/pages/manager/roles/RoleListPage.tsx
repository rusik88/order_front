import ButtonComponent from '../../../components/ui/ButtonComponent';
import { ENTITY_ROUTES } from '../../../router/routes';
import PaginateComponent from '../../../components/common/PaginateComponent';
import { useDeleteRoleMutation, useGetRolesQuery } from '../../../services/RolesApi';
import { useEffect, useState } from 'react';
import type { IApiAppResponse } from '../../../interfaces/common/ApiAppInterfaces';
import type { IRoleItem, IRoleResponseData } from '../../../interfaces/manager/RolesInterfaces';
import LoaderComponent from '../../../components/common/LoaderComponent';
import PerPageComponent from '../../../components/common/PerPageComponent';
import { formatDateTime, fullLink } from '../../../functions/helperFunctions';
import ModalComponent from '../../../components/common/ModalComponent';
import { hideAlert, showAlert } from '../../../store/slices/AlertSlice';
import { useAppDispatch } from '../../../store/hooks';

export const RoleListPage = () => {
    const [ page, setPage ] = useState<number>(1);
    const [ perPage, setPerPage ] = useState<number | string>(5);
    const [ nameFilter, setNameFilter ] = useState<string>('');
    const [search, setSearch] = useState('');

    const dispatch = useAppDispatch();

    const [ deleteRole, setDeleteRole ] = useState<IRoleItem | null>(null);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);

    const [sortField, setSortField] = useState<'name' | 'slug' | 'id' | 'created_at'>('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const { data, isFetching }: { data: IApiAppResponse<IRoleResponseData>, isFetching: boolean } = useGetRolesQuery(
        { page, per_page: perPage, name: nameFilter, sort_field: sortField, sort_direction: sortDirection }
    );

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

    const deleteHandle = (idRole: number) => {
        const role: IRoleItem | undefined = data.data.roles.find((item: IRoleItem) => item.id === idRole);

        if(role !== undefined) {
            setDeleteRole(role);
            setShowDeleteModal(true);
        }
    };

    const [deleteRoleMutation, { isLoading }] = useDeleteRoleMutation();

    const deleteRoleHandle = async (id: number) => {
        setShowDeleteModal(false);
        const res: IApiAppResponse<[]> = await deleteRoleMutation(id).unwrap();

        if(res.data !== undefined && res.data !== null && deleteRole !== null) {
            dispatch(showAlert({
                text: `Role "${deleteRole.name}" was deleted`,
                type: 'success'
            }));

            setTimeout(() => {
                hideAlert();
            }, 3000);
        } else {
            throw {
                data: {
                    message: 'Authentication failed. Please check your credentials and try again.'
                }
            };
        }
    };

    const perPageHandle = (value: number | string) => {
        setPerPage(value);
        setPage(1);
    };

    return (
        <>
            {(isFetching || isLoading) && (
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
                    <svg className='absolute right-3 top-1/2 mt-[-15px] text-slate-400'
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
                <PerPageComponent initPage={ perPage } classNames="w-[90px]" changeHandle={perPageHandle} />
            </div>

            <div className='overflow-x-auto rounded-2xl border border-white/10'>
                <table className='w-full text-left'>
                    <thead className='bg-white/5 text-slate-300 text-sm'>
                    <tr>
                        <th
                            className="p-4 cursor-pointer select-none"
                            onClick={() => {
                                if (sortField === 'id') {
                                    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortField('id');
                                    setSortDirection('asc');
                                }
                                setPage(1);
                            }}
                        >
                            ID
                            {sortField === 'id' && (
                                <span className="ml-1 text-xs text-indigo-400">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        <th
                            className="p-4 cursor-pointer select-none"
                            onClick={() => {
                                if (sortField === 'name') {
                                    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortField('name');
                                    setSortDirection('asc');
                                }
                                setPage(1);
                            }}
                        >
                            Name
                            {sortField === 'name' && (
                                <span className="ml-1 text-xs text-indigo-400">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        <th
                            className="p-4 cursor-pointer select-none"
                            onClick={() => {
                                if (sortField === 'slug') {
                                    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortField('slug');
                                    setSortDirection('asc');
                                }
                                setPage(1);
                            }}
                        >
                            Slug
                            {sortField === 'slug' && (
                                <span className="ml-1 text-xs text-indigo-400">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
                        <th
                            className="p-4 cursor-pointer select-none"
                            onClick={() => {
                                if (sortField === 'created_at') {
                                    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortField('created_at');
                                    setSortDirection('asc');
                                }
                                setPage(1);
                            }}
                        >
                            Created
                            {sortField === 'created_at' && (
                                <span className="ml-1 text-xs text-indigo-400">
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </th>
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

                                    <td className='p-4 text-slate-300'>
                                        {formatDateTime(item.created_at)}
                                    </td>

                                    <td className='p-4 text-right space-x-2'>
                                        { item.slug !== 'super_admin' &&
                                            <>
                                                <ButtonComponent type={ 'info' } link={ fullLink(`${ENTITY_ROUTES.ROLES}/edit/${item.id}`) }>Edit</ButtonComponent>
                                                <ButtonComponent type={ 'error' } onClick={ () => deleteHandle(item.id) }>Delete</ButtonComponent>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            {data && data.data !== undefined && data.data.paginate !== undefined && data.data.paginate.total > Number(perPage) &&
                <PaginateComponent paginate={ data.data.paginate } paginateHandle={ setPage } />
            }

            <ModalComponent isShow={showDeleteModal} >
                {deleteRole !== null && (
                    <>
                        <p>Delete Role "{ deleteRole.name }"</p>
                        <div className="flex justify-end mt-6 space-x-3">
                        <ButtonComponent type={ 'error' } onClick={ () => deleteRoleHandle(deleteRole.id) }>Delete</ButtonComponent>
                            <ButtonComponent onClick={ () => setShowDeleteModal(false) } type={ 'info' }>Close</ButtonComponent>
                        </div>
                    </>
                )}
            </ModalComponent>
        </>
    );
};

export default RoleListPage;