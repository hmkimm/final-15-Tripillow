import React from 'react';
import styled from 'styled-components';
import accountname from '../Recoil/accountName/accountName';
import { useRecoilValue } from 'recoil';

const CommentModal = ({ postId, commentInfo, setIsAlertModalOn }) => {
  const accName = useRecoilValue(accountname);
  const isMine = commentInfo.author.accountname === accName;

  const handleAlertModal = () => {
    setIsAlertModalOn(true);
  };

  return (
    <ModalLayout>
      <SlideBar></SlideBar>
      {isMine ? (
        <button type='button' onClick={handleAlertModal}>
          삭제
        </button>
      ) : (
        <button type='button' onClick={handleAlertModal}>
          신고하기
        </button>
      )}
    </ModalLayout>
  );
};

const ModalLayout = styled.div`
  position: fixed;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%);
  width: 389px;
  height: 92px;
  padding: 16px 0;
  background-color: #fff;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
  z-index: 9999;

  button {
    display: block;
    width: 100%;
    text-align: left;
    font-size: var(--sm);
    padding: 14px 26px;
    box-sizing: border-box;

    :hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

const SlideBar = styled.div`
  margin: ${(props) => props.margin || `0 auto 14px`};
  width: 50px;
  height: 4px;
  border-radius: 10px;
  background-color: var(--light-gray);
`;

export default CommentModal;
