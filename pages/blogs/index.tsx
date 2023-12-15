import BlogCard from '@/components/BlogCard';
import { readPostInfo } from '@/lib/helper';
import { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

type PostApiRes = {
    title: string;
    slug: string;
    meta: string;
} [];

export const getStaticProps = async () => { 
    //const { postInfo } : PostApiRes = await fetch('http://localhost:3000/api/posts').then(data => data.json());

    const postInfo: PostApiRes = readPostInfo();

    return {
        props: { posts: postInfo },
    }
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({posts}) => {
    return (
    <div className='max-w-3xl mx-auto p-5 space-y-5'>
        {posts.map((post) => ( 
            <BlogCard 
            key={post.slug} 
            title={post.title} 
            desc={post.meta} 
            slug={post.slug} 
            />
        ))}
    </div>
    );
};

export default Blogs;