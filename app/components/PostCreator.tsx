"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Switch } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { toPng } from 'html-to-image';
import PostPreview from './PostPreview';
import Image from 'next/image';

export default function PostCreator() {
  const [text, setText] = useState('');
  const [name, setName] = useState(''); 
  const [isVerified, setIsVerified] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('@username');
  const [previewContainer, setPreviewContainer] = useState<Element | null>(null);

  useEffect(() => {
    setPreviewContainer(document.getElementById('preview-container'));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('post-preview');
    if (element) {
      const dataUrl = await toPng(element, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = 'social-post.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleContribute = () => {
    window.open("https://paystack.com/pay/ansigen", "_blank"); // Updated to open Paystack link
  };

  return (
    <div className="space-y-6">
      {/* Name Input Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Enter Your Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={name}
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Username Input Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Post Text Input Field */}
      <div>
        <label htmlFor="post-text" className="block text-sm font-medium text-gray-700">
          Post Text
        </label>
        <textarea
          id="post-text"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Verified Badge Toggle */}
      <div className="flex items-center justify-between">
        <span className="flex items-center">
          <Switch
            checked={isVerified}
            onChange={setIsVerified}
            className={`${
              isVerified ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                isVerified ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <span className="ml-3 text-sm font-medium text-gray-900">Verified Badge</span>
        </span>
      </div>

      {/* Profile Picture Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <div className="mt-1 flex items-center">
          {profileImage ? (
            <Image 
              src={profileImage} 
              alt="Profile" 
              width={48} // Set width 
              height={48} // Set height 
              className="rounded-full object-cover"
            />
          ) : (
            <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </div>

      {/* Download Button */}
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleDownload}
      >
        Download Post
      </button>

      {/* Contribution Button */}
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={handleContribute} // Use the updated function here
      >
        Contribute
      </button>

      {/* Live Preview */}
      {previewContainer &&
        createPortal(
          <PostPreview
            text={text}
            isVerified={isVerified}
            profileImage={profileImage}
            username={username}
            name={name}
          />,
          previewContainer
        )}
    </div>
  );
}
