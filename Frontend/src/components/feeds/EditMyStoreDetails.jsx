import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function EditStore() {
    const { stores } = useSelector((state) => state.stores);

    const store = stores[0];

    if (!store) return <p>No store found</p>;

    return (
        <div className="bg-white rounded-xl p-5 space-y-6">

            {/* IMAGE GALLERY */}
            <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Image Gallery ({store.images?.length}/10)</h3>

                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer">
                        <Icon icon="mdi:pencil-outline" />
                        <span>Make Changes</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-3">
                    {store.images?.map((img, i) => (
                        <img key={i} src={img} className="w-20 h-20 rounded-lg object-cover" />
                    ))}
                </div>
            </div>

            {/* INFORMATION */}
            <div className="border-b pb-4">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Information</h3>

                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer">
                        <Icon icon="mdi:pencil-outline" />
                        <span>Make Changes</span>
                    </div>
                </div>

                <div className="mt-3 space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {store.name}</p>
                    <p><span className="text-gray-500">Category:</span> {store.category}</p>

                    <div>
                        <span className="text-gray-500">Services:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {store.services?.map((s, i) => (
                                <span key={i} className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p><span className="text-gray-500">About:</span> {store.description}</p>
                </div>
            </div>

            {/* CONTACT */}
            <div className="border-b pb-4">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Contact Info</h3>

                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer">
                        <Icon icon="mdi:pencil-outline" />
                        <span>Make Changes</span>
                    </div>
                </div>

                <div className="mt-3 text-sm space-y-2">
                    <p><span className="text-gray-500">Phone:</span> {store.phone}</p>
                </div>
            </div>

            {/* LOCATION */}
            <div className="border-b pb-4">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Location</h3>

                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer">
                        <Icon icon="mdi:pencil-outline" />
                        <span>Make Changes</span>
                    </div>
                </div>

                <div className="mt-3 text-sm space-y-2">
                    <p className="text-blue-600 underline cursor-pointer">
                        {store.address}
                    </p>
                </div>
            </div>

            {/* TIMINGS */}
            <div>
                <div className="flex justify-between">
                    <h3 className="font-semibold">Timings</h3>

                    <div className="flex items-center gap-2 text-purple-600 cursor-pointer">
                        <Icon icon="mdi:pencil-outline" />
                        <span>Make Changes</span>
                    </div>
                </div>

                <div className="mt-3 text-sm space-y-2">
                    <p>
                        {store.timings?.open} - {store.timings?.close}
                    </p>
                    <p className="text-gray-500">
                        {store.workingDays?.join(", ")}
                    </p>
                </div>
            </div>

        </div>
    );
}

export default EditStore;