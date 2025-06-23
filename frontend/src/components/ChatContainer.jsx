import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const ChatContainer = () => {
  const { removeMessage } = useChatStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const [zoomImageId, setZoomImageId] = useState(null);

  const imageMessages = messages?.filter((msg) => msg.image) || [];
  const zoomImage = imageMessages.find((img) => img._id === zoomImageId);
  const currentIndex = imageMessages.findIndex((img) => img._id === zoomImageId);
const handleDeleteMessage = async (messageId) => {
  const confirm = window.confirm("Are you sure you want to delete this message?");
  if (!confirm) return;

  try {
    await axios.delete(`http://localhost:5001/api/messages/${messageId}`, {
  withCredentials: true, // ✅ Sends the JWT cookie
});


  removeMessage(messageId);
  } catch (error) {
    console.error("❌ Delete failed:", error.response?.data || error.message);
    alert("Failed to delete");
  }
};

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!zoomImageId) return;
      if (e.key === "ArrowRight") {
        const next = imageMessages[currentIndex + 1];
        if (next) setZoomImageId(next._id);
      } else if (e.key === "ArrowLeft") {
        const prev = imageMessages[currentIndex - 1];
        if (prev) setZoomImageId(prev._id);
      } else if (e.key === "Escape") {
        setZoomImageId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomImageId, currentIndex, imageMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="p-4 text-sm text-center">Loading messages...</div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col relative group">
  {message.image && (
    <img
      src={message.image}
      alt="Attachment"
      className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-90"
      onClick={() => setZoomImageId(message._id)}
    />
  )}
  {message.text && <p>{message.text}</p>}

  {/* 🗑 Delete icon only for your own messages */}
 {message.senderId === authUser._id && (
  <button
    onClick={() => handleDeleteMessage(message._id)}
    className="absolute top-1 right-1 p-1 rounded-full text-red-500 hover:text-red-700 bg-white shadow group-hover:opacity-100 opacity-0 transition-opacity duration-200"
    title="Delete message"
  >
    <Trash2 size={16} />
  </button>
)}
</div>

          </div>
        ))}
      </div>

      <MessageInput />

      {/* 🔍 Modal with Next/Prev Controls */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <img
            src={zoomImage.image}
            alt="Zoomed"
            className="max-w-[90%] max-h-[80%] rounded shadow-lg mb-4"
          />

          <p className="text-white mb-2">
            {currentIndex + 1} / {imageMessages.length}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const prev = imageMessages[currentIndex - 1];
                if (prev) setZoomImageId(prev._id);
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
            >
              ◀ Prev
            </button>

            <button
              onClick={() => setZoomImageId(null)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              ✕ Close
            </button>

            <button
              onClick={() => {
                const next = imageMessages[currentIndex + 1];
                if (next) setZoomImageId(next._id);
              }}
              disabled={currentIndex === imageMessages.length - 1}
              className="px-4 py-2 bg-white text-black rounded disabled:opacity-40"
            >
              Next ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
