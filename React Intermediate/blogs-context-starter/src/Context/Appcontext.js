import {createContext, useState} from 'react'
// import { useState } from 'react';
import {baseUrl} from '../baseUrl'


// Step1: create
export const AppContext = createContext();

export function AppContextProvider({children}){
    const [loading, setloading] = useState(false)
    const [Posts, setPosts] = useState([])
    const [Page, setPage] = useState(1);
    const [TotalPage , setTotalPage] = useState(null)

    // Data filling

    async function fetchBlogPost(page=1 ,tag=null , category) {
        setloading(true);
        let url = `${baseUrl}?page=${page}`
        if(tag){
            url += `&tag=${tag}`
        }
        if(category){
            url += `&category=${category}`
        }
        try{
            const result = await fetch(url)
            const data = await result.json();
            console.log(data);
            setPage(data.page);
            setPosts(data.posts)
            setTotalPage(data.totalPages)
        }
        catch(error){
            console.log(error);
            setPage(1);
            setPosts([]);
            setTotalPage(null);
        }
        setloading(false);
    }

    function handlePageChange(page){
        setPage(page);
        fetchBlogPost(page);
    }

    const value = {
        Posts,
        setPosts,
        Page,
        setPage,
        TotalPage,
        setTotalPage,
        loading,
        setloading,
        fetchBlogPost,
        handlePageChange
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}