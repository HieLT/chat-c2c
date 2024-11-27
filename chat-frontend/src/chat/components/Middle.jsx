import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { PaperClipOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";

const Middle = ({
    user,
    chosenConversation,
    socket
}) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");


    useEffect(() => {
        console.log('chosenConversation', chosenConversation);

        if (chosenConversation?._id) {
            socket.emit('getMessages', { conversationId: chosenConversation?._id }, (res) => {
                setMessages(res);
            });
            socket.on('err', (error) => {
                setMessages([]);
                setInputMessage("");
                console.error('Error fetching conversations:', error);
            });
        }


    }, [chosenConversation]);

    // Handle sending a message
    const handleSendMessage = () => {
        console.log(
            'chosenConversation', chosenConversation
        );

        if (inputMessage && chosenConversation) {

            const newMessage = {
                sender_id: user?._id,
                content: inputMessage,
                timestamp: new Date(),
            }
            setInputMessage("");
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            socket.emit('sendMessage', {
                senderUserId: user?._id,
                recipientUserId: chosenConversation?.participant?._id,
                conversationId: chosenConversation?._id,
                message: inputMessage,
            });
        }
    }

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    return (
        chosenConversation ?
            <div className="flex-1 flex flex-col w-1/2">
                <div className="bg-white p-4 flex items-center justify-between border-b border-gray-300">
                    <div className="flex items-center">
                        <img
                            src={chosenConversation?.participant?.avatar}
                            alt={chosenConversation?.participant?.name}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h2 className="font-semibold">{chosenConversation?.participant?.name}</h2>
                            <p className="text-sm text-gray-500">
                                {chosenConversation?.followers} followers • {chosenConversation?.posts} posts
                            </p>
                        </div>
                    </div>
                </div>
                <div className="scrollable-content flex-1 p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                        <div
                            key={message?._id}
                            className={`flex ${message?.sender_id?.toString() === user?._id?.toString() ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md xl:max-w-lg ${message?.sender?.id === user.id ? "bg-blue-100" : "bg-gray-200"
                                    } rounded-lg p-3 shadow-md`}
                            >
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{format(message.timestamp, "p")}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 border-t border-gray-300">
                    <div className="flex items-center bg-gray-200 rounded-full">
                        <button className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
                            <PaperClipOutlined className="w-5 h-5 text-gray-600" />
                        </button>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={handleInputChange}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 bg-transparent py-2 px-4 focus:outline-none"
                        />
                        <button className="p-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
                            <SmileOutlined className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            className="flex items-center justify-center p-2 rounded-full bg-[#ffa652] text-white hover:bg-[#ff8d21] transition-colors duration-200 ml-2"
                            onClick={handleSendMessage}
                        >
                            <SendOutlined className="flex items-center justify-center w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            : <div className="w-1/2">Bạn không có cuộc trò chuyện nào</div>
    );
}

export default Middle;
