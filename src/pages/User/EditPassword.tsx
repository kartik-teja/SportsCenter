import React, { useRef } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface EditPasswordPageProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditPasswordPage: React.FC<EditPasswordPageProps> = ({ isOpen, onClose }) => {
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {

        const currentPassword = currentPasswordRef.current?.value;
        const newPassword = newPasswordRef.current?.value;
        if (!currentPassword || !newPassword) {
            console.error("Current password and new password are required");
            return;
        } e.preventDefault();
        try {
            const response = await fetch(`${API_ENDPOINT}/user/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            if (!response.ok) {
                throw new Error("Failed to change password");
            }
            onClose();
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="relative bg-white w-full max-w-md p-8 rounded shadow-md">
                <h2 className="text-2xl text-gray-600 font-bold text-center mb-4">Edit Password</h2>
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            ref={currentPasswordRef}
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
                            ref={newPasswordRef}
                            className="block w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
