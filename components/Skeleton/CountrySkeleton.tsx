const Skeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {[...Array(12)].map((_, index) => (
                <div
                    key={index}
                    className="relative space-y-5 border border-slate-200 overflow-hidden rounded-2xl bg-white p-4 shadow-lg shadow-black/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-300/10 before:bg-gradient-to-r before:from-transparent before:via-slate-300/70 before:to-transparent"
                >
                    <div className="h-24 rounded-lg bg-slate-200/80"></div>
                    <div className="space-y-3">
                        <div className="h-3 w-3/5 rounded-lg bg-slate-200/60"></div>
                        <div className="h-3 w-4/5 rounded-lg bg-slate-200/70"></div>
                        <div className="h-3 w-2/5 rounded-lg bg-slate-200/70"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
