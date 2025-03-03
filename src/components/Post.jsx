import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Correction de l'import
import ViewLikes from './ViewLikes';
import Comments from './Comments';
import useAuthStatus from '../hooks/useAuthStatus';
import { supabase } from '../utils/supabase';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import CommentSection from './CommentSection';

const Post = ({ post, numberOfLikes}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [likes,setLikes]=useState(0)
    const { usering } = useAuthStatus();
    const [liking,setLiking]=useState([])
    const [likedPosts,setLikedPosts]=useState(null)
    const [showComm,setShowComm]=useState(false)
    const [showComment,setShowComment]=useState(false)


    

    const getLikesCount = async (postId) => {
        try {
          const { count, error } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true }) // Retourne uniquement le nombre de lignes
            .eq('post_id', postId);
      
          if (error) {
            console.error('Erreur lors de la récupération du nombre de likes:', error);
            return 0; // Retourne 0 en cas d'erreur
          }
          setLikes(count)
          
          return count || 0; // Retourne le nombre de likes ou 0 si inexistant
        } catch (error) {
          console.error('Erreur inconnue:', error);
          return 0;
        }
      };
        const getLikedPosts = async (userId) => {
            const { data, error } = await supabase
              .from('likes')
              .select('*')
              .eq('user_id', userId);
            if (error) {
              console.error('Erreur lors de la récupération des posts aimés:', error);
            } else {
              const likes =data.map(like => like.post_id)
              
              setLikedPosts(likes)
            }
              
          };
    // Fonction pour récupérer le profil de l'utilisateur du post
    const fetchPerson = async () => {
        if (!post?.user_id) return; // Vérification avant de faire la requête

        setLoading(true);
        try {
            let { data, error } = await supabase
                .from('profile')  // Vérifiez que la table s'appelle bien 'profile' dans votre BDD
                .select("*")
                .eq('id', post.user_id)
                .single(); // Retourne un seul objet au lieu d'un tableau

            if (error) throw error;
            
            setProfile(data);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil:", error);
        } finally {
            setLoading(false);
        }
    };
const toggleLike = async (postId) => {
      if (!usering.id) return; // Vérifier que l'utilisateur est bien connecté
      
      //(likedPosts)
      const alreadyLiked = likedPosts?.includes(post.id) 
      
      if (alreadyLiked) {
          // Supprimer le like
          const { data,error } = await supabase
              .from('likes')
              .delete()
              .eq('user_id', usering.id)
              .eq('post_id', postId);
          
          if (error) {
              console.error("Erreur lors de l'unlike:", error);
          } else {
            setLikes((prev) => Math.max(0, prev - 1)); // Évite d'avoir un compteur négatif
            setLiking((prev) => prev.filter((liked) => liked !== post.id));
            setLikedPosts((prev) => prev.filter((liked) => liked !== post.id));


          }
      } else {
          // Ajouter un like
          const { error } = await supabase
              .from('likes')
              .insert([{ user_id: usering.id, post_id: postId }]);
          
          if (error) {
              console.error("Erreur lors du like:", error);
          } else {
            setLikes((prev) => prev + 1);
            setLiking((prev)=>[...prev,post.id])
            setLikedPosts((prev)=>[...prev,post.id])
            
          }
      }
  };
   
    useEffect(() => {
        fetchPerson();
       
        
        getLikesCount(post?.id)
    }, [post?.user_id,post?.id]); // Mettre user_id en dépendance
 
    useEffect(()=>{
        if(usering) getLikedPosts(usering?.id)
       
    },[usering])
    useEffect(() => {

    
        // Abonnement aux changements dans la table "likes"
        const subscription = supabase
          .channel('likes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'likes', filter: `post_id=eq.${post.id}` },
            (payload) => {
        
    
              // Vérifie si un like est ajouté ou supprimé
              if (payload.eventType === 'INSERT') {
                setLiking((prev)=>[...prev,post.id])
                setLikes((prev) => prev + 1);
              } else if (payload.eventType === 'DELETE') {
                setLikes((prev) => Math.max(0, prev - 1)); // Évite d'avoir un compteur négatif
                setLiking((prev) => prev.filter((liked) => liked !== post.id));

              }
            }
          )
          .subscribe();
    
        return () => {
          supabase.removeChannel(subscription); // Nettoie l'abonnement lorsqu'on quitte le composant
        };
      }, []);

      const onClose = (test) => {
        setShowComment(test);
        console.log(showComment)
        
    };

    const openComments = () => {
        setShowComment(true);
    };


    if (loading) return null;
    if (!profile) return null; // Empêche le rendu tant que le profil n'est pas défini

    return (
        <div className='rounded-xl shadow-md overflow-hidden min-h-[9em] my-5'>
            <div className='flex'>
                <div className='p-4 md:p-8 w-full'>
                    <div className='flex items-center justify-start space-x-3'>
                        <img 
                            className='rounded-full'
                            alt='profile' 
                            height='40'
                            width='40'
                            src={profile.avatar_url} // Vérifiez que la colonne avatar_url existe bien
                            style={{ aspectRatio: '40/40', objectFit: 'cover' }} 
                        />
                        <div>
                            <div className='text-sm md:text-lg font-semibold'>
                                <Link to={`/profile/${profile.id}`}>@{profile.name}</Link>
                            </div>
                            <div className='text-xs text-start md:text-md text-gray-400'>
                                <Link to={`/profile/${profile.id}`}>{profile.name}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 text-gray-500 text-sm prose'>
                        <p className='text-3xl font-bold text-gray-900'>{post?.title}</p>
                    </div>
                    <div className='flex w-full mt-6 justify-between items-center'>
                        <div className='flex space-x-4 text-gray-400'>
                            <Link className='flex justify-center items-center group'
                            onClick={() => toggleLike(post.id)}>
                                {likedPosts?.includes(post.id) ?  <FcLike />:<FcLikePlaceholder />}
                                <span className={`ml-2 text-sm group-hover:text-blue-400 ${!likedPosts?.includes(post.id) ? 'text-blue-700':'text-gray-500'}`}>{likes}</span>
                            </Link>
                       
                          <Comments comments={0} openComments={openComments} onClose={onClose} showComment={showComment} userId={usering?.id} postId={post?.id}/>

                        
                        </div>
                        <div className='text-gray-400 text-sm'>
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric' 
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
