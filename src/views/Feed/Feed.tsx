import Head from 'next/head'
import {
    CalendarIcon
} from '@heroicons/react/outline'
import Feed from '@components/Feed';
import { feedTabs } from '@helpers/routes';
import { useState } from 'react';
import Loader from '@components/shared/Loader';

interface FeedViewProps {
    title: string
    feedTabs: any
    posts: any
}

const FeedView = ({title, feedTabs, posts}: FeedViewProps) => {

    const [postData, setPosts] = useState(posts);
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);
  
    const getMorePosts = async () => {
      setLoading(true);
      const last = postData[postData.length - 1];
  
      const newPosts: string | any[] = [];//await catchErrors(listPostForFeed());
  
      setPosts(postData.concat(newPosts));
      setLoading(false);
  
      if (newPosts.length < 1) {
        setPostsEnd(true);
      }
    };
    
    return (
        <div >
            <Head>
                <title>{title}</title>
                <meta name="description" content="Trading Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Feed navigation={feedTabs} posts={postData} />
            {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}
            <Loader show={loading} />
            {postsEnd && 'You have reached the end!'}

        </div>
    )
}

export default FeedView
