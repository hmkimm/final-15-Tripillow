import React, { useState, useEffect } from 'react';
import { Layout } from '../Styles/Layout';
import MainHeader from '../Components/common/Header/MainHeader';
import Toggle from '../Components/common/Toggle';
import HomePost from '../Components/HomePost/HomePostLayout';
import Empty from '../Components/common/Empty';
import TopButton from '../Components/common/Topbutton';
import Navbar from '../Components/common/Navbar';
import URL from '../Utils/URL';
import userToken from '../Recoil/userToken/userToken';
import { useRecoilValue } from 'recoil';
import HomePostSkeleton from '../Components/common/Skeleton/HomePostSkeleton';
import logo from '../Assets/logo-gray.png';

const Home = () => {
  const token = useRecoilValue(userToken);
  const [FeedCount, setFeedCount] = useState(0);
  const [FollowedFeed, setFollowedFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeedFollowed = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/post/feed/?limit=20&skip=${FeedCount * 20}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setFollowedFeed((prevFeed) => [...prevFeed, ...data.posts]);
      } catch (error) {
        console.error('에러', error);
      }
      setIsLoading(false);
    };
    getFeedFollowed();
  }, [FeedCount, token]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setFeedCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <MainHeader />
      <Toggle margin='25px 0 0 16px' leftButton='국내' rightButton='해외' />
      {isLoading ? (
        <>
          <HomePostSkeleton />
          <HomePostSkeleton />
        </>
      ) : (
        <>
          {FollowedFeed.length > 0 ? (
            FollowedFeed.map((post) => <HomePost key={post.id} post={post} />)
          ) : (
            <Empty image={logo} alt='로고' buttonName='검색하기'>
              유저를 검색해 팔로우 해보세요!
            </Empty>
          )}
        </>
      )}
      <TopButton />
      <Navbar />
    </Layout>
  );
};

export default Home;
