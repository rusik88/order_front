const PaginateComponent = () => {
    return (
        <div className='flex justify-center items-center mt-8 space-x-2 text-slate-300'>
            <button className='cursor-pointer px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>{ '<' }</button>
            <button className='cursor-pointer px-3 py-1 rounded-lg bg-white/10 border border-white/20'>1</button>

            <span className='px-2 text-slate-500'>...</span>

            <button className='cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition'>4</button>
            <button className='cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition'>5</button>
            <button className='cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition'>6</button>

            <span className='px-2 text-slate-500'>...</span>

            <button className='cursor-pointer px-3 py-1 rounded-lg hover:bg-white/10 transition'>20</button>
            <button className='cursor-pointer px-3 py-1 rounded-lg border border-white/10 hover:bg-white/10 transition'>{'>'}</button>
        </div>
    );
};

export default PaginateComponent;