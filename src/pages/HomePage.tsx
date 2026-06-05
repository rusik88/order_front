import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../store/counter/counterSlice';
import type { RootState } from '../store/store.ts';

export default function HomePage() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
            <div className="text-3xl font-bold text-blue-500">
                Tailwind працює 🚀
            </div>
        </div>
    );
}