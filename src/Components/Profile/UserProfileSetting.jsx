import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import URL from '../../Utils/URL';
import ImageUploadAPI from '../../Utils/ImageUploadAPI';
import UserInfoAPI from '../../Utils/UserInfoAPI';
import EditProfileAPI from '../../Utils/EditProfileAPI';
import Input from '../common/Input';
import { LayoutStyle } from '../../Styles/Layout';
import profileImg from '../../Assets/profile-lg.png';
import ErrorMSG from '../../Styles/ErrorMSG';
import useInput from '../../Hooks/useInput';
import UploadHeader from '../../Components/common/Header/UploadHeader';
import uploadfile from '../../Assets/icons/upload-file.svg';

const UserProfileSetting = () => {
  const navigate = useNavigate();
  const [imgURL, setImgURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({});
  const [text, setText] = useState({
    user: {
      username: '',
      accountname: '',
      intro: '',
      image: '',
    },
  });
  const { getUserData } = UserInfoAPI({ setData });

  useEffect(() => {
    const handleFetch = async () => {
      await getUserData();
    };

    handleFetch();
  }, []);

  useEffect(() => {
    if (data.username && data.accountname && data.intro && data.image) {
      setText({
        user: {
          username: data.username,
          accountname: data.accountname,
          intro: data.intro,
          image: data.image,
        },
      });
    }
  }, [data, setText]);

  const handleImageInput = async (e) => {
    const res = await ImageUploadAPI(e);
    setImgURL(URL + '/' + res.filename);
    setText({
      ...text,
      user: {
        ...text.user,
        image: URL + '/' + res.filename,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setText((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  const { handleEditProfileAPI } = EditProfileAPI({ ...text });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = handleEditProfileAPI();
    if (res) {
      navigate('/profile');
    }
  };

  return (
    <UserSettingLayout>
      <Form onSubmit={handleSubmit}>
        <UploadHeader type='submit'>저장</UploadHeader>
        <ImageLayout>
          <ImgLabel htmlFor='file-input'>
            <ProfileImg src={imgURL ? imgURL : data.image ? data.image : profileImg} />
          </ImgLabel>
          <input id='file-input' className='a11y-hidden' type='file' onChange={handleImageInput} />
        </ImageLayout>
        <Input
          label='사용자 이름'
          type='text'
          forId='name'
          placeholder='2~10자 이내여야 합니다.'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.username}
          name='username'
          onChange={handleInputChange}
          width='322px'
        ></Input>
        <Input
          label='계정 ID'
          type='text'
          forId='user-id'
          placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.accountname}
          name='accountname'
          onChange={handleInputChange}
        ></Input>
        {errorMessage === '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' && text.user.accountname && (
          <ErrorMSG errorColor={errorMessage !== '사용 가능한 이메일 입니다.'}>{errorMessage}</ErrorMSG>
        )}
        {errorMessage === '이미 사용중인 계정 ID입니다.' && text.user.accountname && (
          <ErrorMSG errorColor={errorMessage !== '사용 가능한 이메일 입니다.'}>{errorMessage}</ErrorMSG>
        )}
        <Input
          label='소개'
          type='text'
          forId='describe'
          placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
          mb={errorMessage ? '6px' : '16px'}
          value={text.user.intro}
          name='intro'
          onChange={handleInputChange}
        ></Input>
        {errorMessage === '이미 가입된 이메일 주소 입니다.' && (
          <ErrorMSG errorColor={errorMessage === '이미 가입된 이메일 주소 입니다.'}>{errorMessage}</ErrorMSG>
        )}
      </Form>
    </UserSettingLayout>
  );
};

// 스타일드 컴포넌트 추가

const UserSettingLayout = styled.div`
  ${LayoutStyle}
  padding: 78px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ImageLayout = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto 30px;
  position: relative;
`;

const ImgLabel = styled.label`
  display: block;
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    background: url(${uploadfile}) 0 0 / cover;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export default UserProfileSetting;
