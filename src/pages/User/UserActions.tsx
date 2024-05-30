import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faUser } from '@fortawesome/free-solid-svg-icons';
import UserPreferenceEditor from './UserPreference';
import EditPasswordPage from './EditPassword';

interface UserActionsButtonProps {
    isAuthenticated: boolean;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const UserActionsButton: React.FC<UserActionsButtonProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);

    const handleSignInClick = () => {
        navigate('/user/signin');
    };

    const handleSignUpClick = () => {
        navigate('/user/signup');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.reload();
    };

    const handlePasswordChangeClick = () => {
        setIsPasswordOpen(true);
    };

    const handlePreferencesEditClick = () => {
        setIsPreferencesOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordOpen(false);
    };

    return (
        <>
            {isAuthenticated ? (
                <>
                    <button
                        onClick={handlePreferencesEditClick}
                        className='bg-gray-100 text-gray-900'
                    >
                        <FontAwesomeIcon icon={faGears} className="mr-2" />
                        Preferences
                    </button>

                    {isPreferencesOpen && <UserPreferenceEditor onClose={() => { setIsPreferencesOpen(false); window.location.reload() }} />}
                </>) : (<></>)}
            < Menu as="div" className="pl-2 relative inline-block ">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-3xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <FontAwesomeIcon icon={faUser} />

                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute w-auto right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {isAuthenticated ? (
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogoutClick}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2'
                                                )}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handlePasswordChangeClick}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2'
                                                )}
                                            >
                                                Change Password
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            ) : (
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleSignInClick}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 '
                                                )}
                                            >
                                                Sign In
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleSignUpClick}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2'
                                                )}
                                            >
                                                Sign Up
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu >

            <EditPasswordPage isOpen={isPasswordOpen} onClose={closePasswordModal} />
        </>
    );
};

export default UserActionsButton;
