'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const UserName = searchParams.get('username');
    const UserId = searchParams.get('id');

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
          setPosts(data);
        }

        const fetchUserPosts = async () => {
            const response = await fetch(`/api/users/${UserId}/posts`);
            const data = await response.json();
    
            setPosts(data);
        }
    
        
        if(session?.user.id && !UserName)
        {    
            fetchPosts();
            console.log(posts);
        }
        else if(UserName && UserId)
        {
            console.log(`User name is: ${UserName} and id: ${UserId}`);
            fetchUserPosts();
        }
    
      }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {

        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed)
        {
            try {
    
                // Sending request to backend to delete a particular prompt.
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE',
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
    
            } catch (error) {
                console.log(error);
            } 
        }
    }

    return (
        UserId !== null? <Profile
            name={session?.user.id === UserId? "My": `${UserName[0].toUpperCase() + UserName.slice(1)}'s`}
            desc={session?.user.id === UserId? "Welcome to your personalized profile page": `Welcome to ${UserName[0].toUpperCase() + UserName.slice(1)}'s profile page`}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        /> :
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;