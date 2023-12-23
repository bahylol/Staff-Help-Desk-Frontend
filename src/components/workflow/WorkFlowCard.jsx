import React, { useState } from 'react';

const WorkflowCard = ({ cardId, editedText, onTextChange, onRemoveClick }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleRemoveClick = () => {
        // Pass the cardId to the parent component to handle removal
        onRemoveClick(cardId);
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => onTextChange(cardId, e.target.value)}
                        className="border-2 border-gray-300 h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
                    />
                ) : (
                    <p>{editedText}</p>
                )}

                <div className="card-actions justify-end mt-4">
                    {isEditing ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSaveClick}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={handleEditClick}>
                                Edit
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={handleRemoveClick}>
                                Remove
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkflowCard;
