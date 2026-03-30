import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { commentAdd } from "../../api/LocalFeed.api";

function CommentModal({ postId, setIsCommentOpen }) {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(postId.comments || []);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            const newComment = {
                _id: Date.now(),
                text: commentText,
                user: {
                    name: "You",
                    avatar: "https://i.pravatar.cc/40"
                }
            };

            await commentAdd(postId, { text: commentText });

            setComments([newComment, ...comments]);
            setCommentText("");

        } catch (error) {
            console.log("Error adding comment", error);
        }
    };

    return (
        <>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      bg-white rounded-xl shadow-xl w-[95%] max-w-xl z-50 p-5 flex flex-col gap-y-4">

                <div className="flex justify-between items-center">
                    <span className="text-black/70 font-semibold">
                        Comments ({comments.length})
                    </span>

                    <Icon
                        icon="mdi:close"
                        className="text-xl cursor-pointer"
                        onClick={() => setIsCommentOpen(false)}
                    />
                </div>

                <div className="flex flex-col gap-y-4 max-h-80 overflow-y-auto">

                    {comments.length === 0 && (
                        <p className="text-gray-400 text-sm text-center">
                            No comments yet
                        </p>
                    )}

                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex gap-x-3 items-start"
                        >

                            <img
                                src={comment.user?.avatar || "https://i.pravatar.cc/40"}
                                alt="avatar"
                                className="w-8 h-8 rounded-full"
                            />

 
                            <div className="bg-gray-100 px-3 py-2 rounded-xl w-fit max-w-[80%]">
                                <p className="text-sm font-semibold text-black">
                                    {comment.user?.name || "User"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="flex items-center gap-x-2 border-t pt-3">

                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm outline-none"
                    />

                    <Icon
                        icon="mdi:send"
                        className="text-white text-2xl p-2 rounded-full cursor-pointer 
            bg-linear-to-r from-[#b59cef] to-[#5842ed]"
                        onClick={handleAddComment}
                    />
                </div>

            </div>
        </>
    );
}

export default CommentModal;