'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from "@components/Form";

const EditPost = () => {

    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptID = searchParams.get('id');
    const router = useRouter();

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
      });

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptID) return alert('Prompt ID not found!');

        try {

        // Sending the newly received data to our backend.
        const response = await fetch(`/api/prompt/${promptID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        })

        // Checking if our response is okay or not.
        if(response.ok){
            router.push('/');
        }

        } catch (error) {
            console.log(error);
        } finally{
            setSubmitting(false);
        }
    }


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptID}`);

            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        };

        if(promptID) getPromptDetails()

    }, [promptID]);

    return (
        <Form
        type="Edit"
        post={post}
        prompt = {post.prompt}
        tag = {post.tag}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        />
    )
}

export default EditPost;