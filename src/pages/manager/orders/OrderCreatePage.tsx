const OrderCreatePage = () => {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Create Order
                </h2>

                <button
                    className="
                        px-4 py-2
                        rounded-xl
                        bg-white/5
                        border border-white/10
                        hover:bg-white/10
                        transition
                    "
                >
                    Back to List
                </button>
            </div>

            <form className="space-y-6">
                <div>
                    <label className="block text-slate-300 mb-2">
                        Customer Name
                    </label>

                    <input
                        type="text"
                        placeholder="John Doe"
                        className="
                            w-full
                            px-4 py-3
                            rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            outline-none
                            focus:border-blue-400/50
                            focus:bg-white/10
                            transition
                        "
                    />
                </div>
                <div>
                    <label className="block text-slate-300 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="
                            w-full
                            px-4 py-3
                            rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            outline-none
                            focus:border-blue-400/50
                            focus:bg-white/10
                            transition
                        "
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-300 mb-2">
                            Status
                        </label>

                        <select
                            className="
                                w-full
                                px-4 py-3
                                rounded-xl
                                bg-white/5
                                border border-white/10
                                text-white
                                outline-none
                                focus:border-blue-400/50
                                focus:bg-white/10
                                transition
                            "
                        >
                            <option className="bg-slate-900">New</option>
                            <option className="bg-slate-900">Processing</option>
                            <option className="bg-slate-900">Done</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Total ($)
                        </label>

                        <input
                            type="number"
                            placeholder="100"
                            className="
                                w-full
                                px-4 py-3
                                rounded-xl
                                bg-white/5
                                border border-white/10
                                text-white
                                outline-none
                                focus:border-blue-400/50
                                focus:bg-white/10
                                transition
                            "
                        />
                    </div>

                </div>

                <div>
                    <label className="block text-slate-300 mb-2">
                        Address
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Shipping address..."
                        className="
                            w-full
                            px-4 py-3
                            rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            outline-none
                            focus:border-blue-400/50
                            focus:bg-white/10
                            transition
                        "
                    />
                </div>

                <div
                    className="
                        p-5
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                    "
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                            Products
                        </h3>

                        <button
                            type="button"
                            className="
                                px-3 py-1
                                rounded-lg
                                bg-blue-500/20
                                text-blue-300
                                border border-blue-400/30
                                hover:bg-blue-500/30
                                transition
                            "
                        >
                            + Add Product
                        </button>
                    </div>

                    <div className="text-slate-400 text-sm">
                        No products added yet
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        className="
                            px-5 py-3
                            rounded-xl
                            bg-white/5
                            border border-white/10
                            hover:bg-white/10
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="
                            px-5 py-3
                            rounded-xl
                            bg-blue-500/20
                            text-blue-300
                            border border-blue-400/30
                            hover:bg-blue-500/30
                            transition
                        "
                    >
                        Create Order
                    </button>
                </div>

            </form>
        </>
    );
};

export default OrderCreatePage;