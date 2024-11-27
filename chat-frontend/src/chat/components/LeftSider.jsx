const LeftSider = ({
    user,
    conversations,
    chosenConversation,
    handleChosenConversation
}) => {
    return (
        <div className="flex flex-col w-1/4 bg-white p-4 border-r border-gray-300 w-1/4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="font-semibold">{user?.name}</span>
                </div>
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full bg-gray-200 text-gray-800 rounded-full py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="scrollable-content flex flex-col space-y-4">
                {conversations.map((conversation) => (
                    <div
                        key={conversation?._id}
                        className={`flex p-2 rounded-lg transition-colors duration-200 cursor-pointer ${chosenConversation?.participant?._id === conversation?.participant?._id
                            ? "bg-[#fff4df] border-l-4 border-[#f80]"
                            : "bg-gray-100"
                            }`}
                        onClick={() => handleChosenConversation(conversation)}
                    >
                        <img
                            src={conversation?.participant?.avatar}
                            alt={conversation?.participant?.name}
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                            <h3 className="font-semibold">{conversation?.participant?.name}</h3>
                            <p className="text-sm text-gray-500">{conversation?.lastestMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftSider;
