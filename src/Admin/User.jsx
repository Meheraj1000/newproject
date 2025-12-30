import React from 'react';

const User = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-5">
                    <h2 className="text-xl font-semibold mb-3">Profile</h2>
                    <p>Update your information and view your account details.</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-5">
                    <h2 className="text-xl font-semibold mb-3">Orders / Requests</h2>
                    <p>Check your product orders or service requests.</p>
                </div>
            </div>
        </div>
    );
};

export default User;
