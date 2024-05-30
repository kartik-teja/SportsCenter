import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface EditPasswordPageProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditPasswordPage: React.FC<EditPasswordPageProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const authToken = localStorage.getItem('authToken');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_ENDPOINT}/user/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                }),
            });
            if (response.ok) {
                setCurrentPassword("");
                setNewPassword("");
                setErrorMessage("");
                onClose();
            } else {
                setErrorMessage('Failed to change password');
            }
        } catch (error) {
            setErrorMessage('Error updating password');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative bg-white w-full max-w-md p-8 rounded shadow-md">
                {errorMessage && (
                    <div className="bg-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
                        {errorMessage}
                    </div>
                )}
                <h2 className="text-2xl text-gray-600 font-bold text-center mb-4">Edit Password</h2>
                <form className="space-y-6" onSubmit={handleChangePassword}>
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 border border-red-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 border-green-800"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPasswordPage;
