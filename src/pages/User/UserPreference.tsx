import React, { useState } from "react";
import { useUserDispatch } from "../../contexts/User/context";
import { patchUserPreference } from "../../contexts/User/actions";

interface UserPreferenceEditorProps {
    isOpen: boolean;
    onClose: () => void;
    availableSports: string[];
}

const UserPreferenceEditor: React.FC<UserPreferenceEditorProps> = ({ isOpen, onClose, availableSports }) => {
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const dispatch = useUserDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await patchUserPreference(dispatch, { preferences: JSON.parse(JSON.stringify(selectedSports)) });
        onClose();
    };

    const toggleSportSelection = (sport: string) => {
        setSelectedSports((prev) =>
            prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-gray-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Preferences</h3>
                    <form className="mt-3 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <h4 className="text-md font-semibold text-gray-700">Select Preferred Sports</h4>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                {availableSports.map((sport) => (
                                    <div
                                        key={sport}
                                        className={`cursor-pointer p-2 border rounded-lg ${selectedSports.includes(sport)
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-200 text-gray-800"
                                            }`}
                                        onClick={() => toggleSportSelection(sport)}
                                    >
                                        {sport}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserPreferenceEditor;
