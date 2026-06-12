const LoaderComponent = ({ text }: {text?: string}) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
            <div className="h-20 w-20 animate-spin relative inset-2 rounded-full border-6 border-blue-500 border-t-transparent" />
            {text && (
                <p className="mt-6 text-lg text-slate-300">
                    { text }
                </p>
            )}
        </div>
    );
};

export default LoaderComponent;