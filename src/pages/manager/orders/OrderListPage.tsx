import Select from 'react-select';

const options = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];

const OrderListPage = () => {
    return (
        <>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-3xl font-bold'>
                    Orders List
                </h2>

                <button className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition'>
                    + Create Order
                </button>
            </div>

            <Select
                options={options}
                defaultValue={options[0]}
                className="w-[90px]"
                unstyled
                classNames={{
                    control: ({ isFocused }) =>
                        `min-h-[42px] bg-white/5 border rounded-xl cursor-pointer transition
                        ${ isFocused ? 'border-indigo-400/50' : 'border-white/10 hover:bg-white/10' }
                     `,

                    valueContainer: () => 'px-3',

                    singleValue: () => 'text-white',

                    input: () => 'text-white',

                    placeholder: () => 'text-slate-400',

                    indicatorSeparator: () => 'hidden',

                    dropdownIndicator: () =>
                        'text-slate-400 hover:text-white transition',

                    menu: () => 'mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl',

                    menuList: () => 'p-0',

                    option: ({ isFocused, isSelected }) =>
                        `px-3 py-2 cursor-pointer transition
                        ${ isSelected ? 'bg-indigo-500/20 text-indigo-300' : isFocused ? 'bg-white/10 text-white' : 'text-white' } `,
                    }}
            />

            {/* Table */}
            <div className='overflow-x-auto rounded-2xl border border-white/10'>
                <table className='w-full text-left'>
                    <thead className='bg-white/5 text-slate-300 text-sm'>
                    <tr>
                        <th className='p-4'>ID</th>
                        <th className='p-4'>Customer</th>
                        <th className='p-4'>Total</th>
                        <th className='p-4'>Status</th>
                        <th className='p-4'>Date</th>
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

                            <td className='p-4'>
                                <span className='px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30'>
                                    new
                                </span>
                            </td>

                            <td className='p-4 text-slate-400'>
                                2026-06-0{item}
                            </td>

                            <td className='p-4 text-right space-x-2'>
                                <button
                                    className='
                                        px-3 py-1
                                        rounded-lg
                                        bg-indigo-500/20
                                        text-indigo-300
                                        border border-indigo-400/30
                                        hover:bg-indigo-500/30
                                        transition
                                    '
                                >
                                    Edit
                                </button>

                                <button
                                    className='
                                        px-3 py-1
                                        rounded-lg
                                        bg-red-500/20
                                        text-red-300
                                        border border-red-400/30
                                        hover:bg-red-500/30
                                        transition
                                    '
                                >
                                    Delete
                                </button>
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

export default OrderListPage;