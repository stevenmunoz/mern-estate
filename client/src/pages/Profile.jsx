import React from 'react'
import { useSelector } from 'react-redux'
import {useRef, useState, useEffect} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { app } from '../firebase'; // Adjust the path as necessary

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });

  const handleImageClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Uploaded file name:', file.name); // Print the image name
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col'>
        <img 
          src={formData.avatar} 
          alt='profile' 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          onClick={handleImageClick}
        />
         <input
          key={formData.avatar} // Add key attribute to force re-render
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <input 
          type='text' 
          placeholder='username' 
          id="username" 
          className='border p-3 m-2 rounded-lg'
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input 
          type='text' 
          placeholder='email' 
          id="email" 
          className='border p-3 m-2 rounded-lg'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type='password' 
          placeholder='password' 
          id="password" 
          className='border p-3 m-2 rounded-lg'
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type='submit' className="bg-slate-700 text-white p-3 rounded-lg m-2">Update</button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className="text-red-700 cursor-pointer m-3">Delete Account</span>
        <span className="text-red-700 cursor-pointer m-3">Sign Out</span>
      </div>
    </div>
  )
}
