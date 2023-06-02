import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { RiUpload2Line } from 'react-icons/ri';
import { BsFillBagFill, BsHeartFill, BsCalendarDayFill } from 'react-icons/bs';
import { MdSchool, MdHome, MdLocationPin, MdCall } from 'react-icons/md';
import axios from 'axios';

const EditProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [Pname, setPName] = useState('');
  const [bio, setBio] = useState('');
  const [work, setWork] = useState('');
  const [lives, setLives] = useState('');
  const [from, setFrom] = useState('');
  const [school, setSchool] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [mno, setMno] = useState('');
  const [dob, setDob] = useState('');
  const [responseData, setResponseData] = useState(null);

  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedCoverImage(e.target.result);
      localStorage.setItem('uploadedImage', e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      localStorage.setItem('uploadedImage', e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
      setName(profileData.name);
      setPName(profileData.Pname);
      setBio(profileData.bio);
      setWork(profileData.work);
      setLives(profileData.lives);
      setFrom(profileData.from);
      setSchool(profileData.school);
      setMaritalStatus(profileData.maritalStatus);
      setMno(profileData.mno);
      setDob(profileData.dob);
    }
  }, []);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    setIsEditMode(false);

    const updatedProfileData = {
      name,
      Pname,
      bio,
      work,
      lives,
      from,
      school,
      maritalStatus,
      mno,
      dob,
    };

    try {
      const response = await axios.put(
        `https://travel-cg48.onrender.com/user/update/${userId}`,
        updatedProfileData
      );

      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://travel-cg48.onrender.com/user/get/${userId}`
        );
        setResponseData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (responseData) {
      console.log(responseData);
    }
  }, [responseData]);

  return (
    <>
      <div className='profileDetails'>
        <div className='coverImages'>
          {isEditMode ? (
            <input type='file' onChange={handleCoverImageUpload} />
          ) : (
            <span>
              {selectedCoverImage && (
                <img
                  src={responseData.cover_photo}
                  alt='Uploaded'
                  id='coverImages'
                />
              )}
            </span>
          )}
        </div>

        <div className='profile'>
          {isEditMode ? (
            <input type='file' onChange={handleImageUpload} />
          ) : (
            <span>
              {selectedImage && (
                <img
                  src={`https://travel-cg48.onrender.com/profile_images/${responseData.photo}`}
                  alt='Uploaded'
                  id='profiledp'
                />
              )}
            </span>
          )}

          <div id='NamePosition'>
            <label id='Profilename'>
              {isEditMode ? (
                <input
                  type='text'
                  value={name}
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <span id='editMyname'>
                  {responseData && responseData.first_name}{' '}
                  {responseData && responseData.last_name}
                </span>
              )}
            </label>
            &nbsp;

            <label id='ProfilePname'>
              {isEditMode ? (
                <input
                  type='text'
                  value={Pname}
                  placeholder='Nick Name'
                  onChange={(e) => setPName(e.target.value)}
                />
              ) : (
                <span id='editMyPname'>&#10088;&nbsp;{Pname}&nbsp;&#10089;</span>
              )}
            </label>
            <br />

            <label>
              {isEditMode ? (
                <textarea
                  value={bio}
                  placeholder='Bio'
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              ) : (
                <span>{bio}</span>
              )}
            </label>
            <br />

            <label>
              <BsFillBagFill />
              Works at:{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.worksAt : ''}</span>
              )}
            </label>
            <br />

            <label>
              <MdSchool />
              Went to{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.wentTo : ''}</span>
              )}
            </label>
            <br />

            <label>
              <MdHome />
              Lives in{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={lives}
                  onChange={(e) => setLives(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.liveIn : ''}</span>
              )}
            </label>
            <br />

            <label>
              <MdLocationPin />
              From{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.from : ''}</span>
              )}
            </label>
            <br />

            <label>
              <BsHeartFill />{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.maritalStatus : ''}</span>
              )}
            </label>
            <br />

            <label>
              <MdCall />
              Mobile No.{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={mno}
                  onChange={(e) => setMno(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.mobile : ''}</span>
              )}
            </label>
            <br />

            <label>
              <BsCalendarDayFill />{' '}
              {isEditMode ? (
                <input
                  type='text'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              ) : (
                <span>{responseData ? responseData.dob : ''}</span>
              )}
            </label>
            <br />

            {isEditMode ? (
              <button className='saveButton' onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className='editButton' onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
