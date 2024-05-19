import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserPreferenceEditor from "./UserPreference";
import EditPasswordPage from "./EditPassword";

interface UserActionsButtonProps {
    isAuthenticated: boolean;
}

const UserActionsButton: React.FC<UserActionsButtonProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignInClick = () => {
        navigate('/user/signin');
    };

    const handleSignUpClick = () => {
        navigate('/user/signup');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem("userData")
        navigate('/');
    };

    const handlePasswordChangeClick = () => {
        setIsPasswordOpen(true);
    };

    const handlePreferencesEditClick = () => {
        setIsPreferencesOpen(true);
    };

    const closePreferencesModal = () => {
        setIsPreferencesOpen(false);
    };

    const closePasswordModal = () => {
        setIsPasswordOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (<>

        {isAuthenticated ? (<>

            <button onClick={handlePreferencesEditClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><img src="SportsCenter/src/assets/settings.png"></img></button>
        </>) : (<></>)}

        <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="dropdown-menu"
            aria-haspopup="true"
            aria-expanded="true">
            User Actions
        </button>


        {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-menu">
                <div className="py-1" role="none">
                    {isAuthenticated ? (
                        <>
                            <button onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                            <button onClick={handlePasswordChangeClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Change Password</button>
                            <button onClick={handlePreferencesEditClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Edit Preferences</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignInClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign In</button>
                            <button onClick={handleSignUpClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign Up</button>
                        </>
                    )}
                </div>
            </div>
        )}

        <UserPreferenceEditor isOpen={isPreferencesOpen} onClose={closePreferencesModal} availableSports={[]} />
        <EditPasswordPage isOpen={isPasswordOpen} onClose={closePasswordModal} />
    </>
    );
};

export default UserActionsButton;
