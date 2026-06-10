import type { IPaginateProps } from '../../interfaces/common/PaginateInterfaces';
import clsx from "clsx";

const PaginateComponent = (
    { paginate, paginateHandle }: IPaginateProps
) => {

    let max_carousel = 3;
    if(paginate.last_page < max_carousel) {
        max_carousel = paginate.last_page;
    }

    const side_count = (max_carousel - 1) / 2;
    const max_show_last_page = paginate.last_page - (max_carousel - 1) / 2;

    let min_carousel_page = 0;
    let max_carousel_page = 0;

    const paged_arr = [];
    let is_middle = false;

    if((paginate.current_page - side_count) <= side_count) {
        min_carousel_page = 1;
        max_carousel_page = max_carousel;
    } else if(paginate.current_page >= max_show_last_page) {
        min_carousel_page = paginate.current_page - ((max_carousel - 1) - (paginate.last_page - paginate.current_page));
        max_carousel_page = paginate.last_page;
    } else {
        min_carousel_page = paginate.current_page - side_count;
        max_carousel_page = paginate.current_page + side_count;
        is_middle = true;
    }

    for(let i = min_carousel_page; i <= max_carousel_page; i++) {
        paged_arr.push(i);
    }

    return (
        <div className='flex justify-center items-center mt-8 space-x-2 text-slate-300'>
            {paginate.current_page !== 1 &&
                <button onClick={ () => paginateHandle(paginate.current_page - 1) } key={ 0 } className='cursor-pointer px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>{ '<' }</button>
            }

            {(paginate.current_page >= max_show_last_page || is_middle) && paginate.last_page > max_carousel &&
                <>
                    <button key={ 1 } onClick={ () => paginateHandle(1) } className={clsx('cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10')}>1</button>
                    <span className='px-2 text-slate-500'>...</span>
                </>
            }

            {paged_arr.length > 0 &&
                paged_arr.map((item: number) => {
                    return (
                        <button
                            key={ item }
                            className={clsx(
                                'cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition',
                                paginate.current_page === item && 'bg-white/10 border border-white/20'
                            )}
                            onClick={() => {
                                    if(paginate.current_page !== item) {
                                        paginateHandle(item);
                                    }
                                }
                            }
                        >{ item }</button>
                    );
                })
            }

            { paginate.current_page < max_show_last_page && paginate.last_page > max_carousel &&
                <>
                    <span className='px-2 text-slate-500'>...</span>
                    <button key={ paginate.last_page } onClick={ () => paginateHandle(paginate.last_page) } className='cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition'>{ paginate.last_page }</button>
                </>
            }

            {paginate.current_page < paginate.last_page &&
                <button key={ paginate.last_page + 1 } onClick={ () => paginateHandle(paginate.current_page + 1) } className='cursor-pointer px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>{'>'}</button>
            }
        </div>
    );
};

export default PaginateComponent;