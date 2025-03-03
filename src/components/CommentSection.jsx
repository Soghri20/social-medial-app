import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import loader from '../assets/loader/loader.svg'
import { supabase } from "../utils/supabase";
import useAuthStatus from "../hooks/useAuthStatus";


const CommentsPopup = ({ onClose, postId,userId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments,setComments]=useState(null)
  const [loading,setLoading]=useState(false)
  const {usering}=useAuthStatus()

  useEffect(()=>{
    const fetchComments = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*, profile(id, name, avatar_url)")
          .eq("post_id", postId)
         
  
        if (error) console.error("Error fetching comments:", error);
        else {
            setComments(data)
            console.log(data)

        }
  
        setLoading(false);
      };

      fetchComments()

  },[postId,userId])

  const insertComment = async (postId, content, userId) => {
    if (!content.trim()) return;
      const { data, error } = await supabase
  .from("comments")
  .insert([{ post_id: postId, user_id: userId, content }])
  .select();

if (error) {
  console.error("Erreur lors de l'ajout du commentaire:", error);
} else {
    console.log("Commentaire ajouté:", data);
    const newComment = {
      ...data[0], // Le commentaire ajouté
      profile: { 
        id: usering?.id, 
        name: usering?.user_metadata?.full_name || "Unknown", 
        avatar_url: usering?.user_metadata?.avatar_url || "/default-avatar.png",
      }
    };
    setComments((prev) => [...prev, newComment]);}
};
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    insertComment(postId,newComment,userId)
    setNewComment("");
  };

  useEffect(()=>{
    const subscription = supabase
  .channel("comments")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "comments" },
    (payload) => {
      console.log("New comment received:", payload.new);
     // setComments((prev) => [...prev, payload.new]);
    }
  )
  .subscribe();

return () => {
  supabase.removeChannel(subscription);
};
  },[postId])

  if(loading) return <img  src={loader}/>

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[90vh] w-11/12 md:w-1/2 p-6 rounded-3xl shadow-2xl border border-gray-500 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">Commentaires</h2>
          <button onClick={() => onClose(false)} className="text-gray-500 hover:text-red-500">
  <FaTimes size={24} />
</button>
        </div>

        {/* Liste des commentaires (scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-3 my-4 max-h-[50vh] pr-2">
          {comments!==null &&comments.length > 0 ? (
            comments.map((comment, index) => (
                <div key={comment.id} className="flex items-start space-x-3 p-2 border-b">
                <img
                  src={comment.profile?.avatar_url || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{comment.profile?.name || "Unknown"}</p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>
              </div>
            
            ))
          ) : (
            <p className="text-gray-400">Aucun commentaire pour le moment.</p>
          )}
        </div>

        {/* Ajouter un commentaire (fixé en bas) */}
        <div className="border-t pt-3 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Écrire un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={handleAddComment}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPopup;
