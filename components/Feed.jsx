'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([])
  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }


  useEffect(() => {
    const filterPosts = () => {
      if(searchText !== "")
      {
        const fetchPosts = async () => {
          const filteredPosts = data.filter((p) => p.creator.username.includes(searchText) || p.prompt.includes(searchText) || p.tag === searchText);
          setPosts(filteredPosts);
        }
        fetchPosts();
      }
      else
      {
        const fetchPosts = async () => {
          const response = await fetch('/api/prompt');
          const data = await response.json();
          setData(data);
          setPosts(data);
        }
    
        fetchPosts();
      }
    }

    filterPosts();

  }, [searchText]);



  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={(tag) => {setSearchText(tag)}}
      />

    </section>
  )
}

export default Feed;