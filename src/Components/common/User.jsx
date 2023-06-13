import React from 'react';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import more from '../../Assets/icons/s-icon-more-vertical.svg';
import Button from './Button';

const User = (props) => {
  return (
    <UserLayout>
      <UserImg src={props.UserImage || profileSm} alt={props.username} />
      <UserContentsLayout>
        <div>
          <UserTitle>{props.username}</UserTitle>
          <UserContent>{props.content} </UserContent>
        </div>
        {props.post && (
          <button>
            <img src={more} alt='더보기 버튼' />
          </button>
        )}
        {props.followers && (
          <Button width={'56px'} height={'28px'} fontSize={'var(--xs)'} border={'none'} padding={'0px'}>
            팔로우
          </Button>
        )}
        {props.chat && <ChatDate>{props.date}</ChatDate>}
      </UserContentsLayout>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserTitle = styled.h3`
  font-size: var(--sm);
  padding-bottom: 6px;
`;

const UserContent = styled.span`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const UserContentsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ChatDate = styled.span`
  color: var(--light-gray);
  font-size: 10px;
  margin-top: auto;
`;

export default User;
