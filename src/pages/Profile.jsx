import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // To get the user ID from the URL
import { supabase } from '../utils/supabase';
import Post from '../components/Post';  // Assuming you have a Post component to display individual posts
import useAuthStatus from '../hooks/useAuthStatus';

const Profile = () => {
    const { userId } = useParams(); // Get user ID from the URL params
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {usering}=useAuthStatus()
    const navigate = useNavigate()

    // Fetch the user's profile
    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profile') // Assuming the profile information is in this table
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Fetch the posts created by the user
    const fetchUserPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts') // Assuming the posts are in this table
                .select('*')
                .eq('user_id', userId); // Filter posts by the user ID

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchUserPosts();
        setLoading(false);
    }, [userId]);
     const signOut = async () => {
              const { error } = await supabase.auth.signOut();
            
              if (error) {
                console.error('Erreur lors de la déconnexion:', error);
              } else {
                console.log('Utilisateur déconnecté');
                // Optionnel: Rediriger vers la page d'accueil ou une autre page après déconnexion
                  navigate('/login')
              }
            };

    if (loading) return <div>Loading...</div>;

    if (!profile) return <div>User not found.</div>;

    return (
        <div className="profile-page max-w-7xl mx-auto p-4">
            {/* Profile Header with cover image and avatar */}
            <div className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl mb-8">
                <div className="absolute top-0 left-0 w-full h-40 bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${profile.cover_url || '/default-cover.jpg'})` }} />
                <div className="profile-header flex items-center space-x-6 p-6 relative">
                    <img
                        className="rounded-full border-4 border-white"
                        src={profile.avatar_url}
                        alt="Profile"
                        width="120"
                        height="120"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="text-white">
                        <h2 className="text-3xl font-semibold">{profile.email}</h2>
                        <p className="text-sm">@{profile.name}</p>
                        <p className="text-sm mt-2">{profile.bio || 'No bio available.'}</p>
                        {/* <div className="mt-4 flex space-x-6">
                            <div className="text-lg font-semibold">Followers: 120</div>
                            <div className="text-lg font-semibold">Following: 89</div>
                        </div> */}
                    </div>
                    <button className="absolute top-[35%] right-6 px-4 py-2 shadow-md bg-black text-white rounded-xl  transition duration-200" 
                    onClick={signOut}>
                        Log out
                    </button>
                </div>
            </div>

            {/* Posts Section */}
            <div className="posts-section max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center ">Posts</h3>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-gray-600">No posts to display.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
