import { CheckBadgeIcon } from '@heroicons/react/24/solid'

interface PostPreviewProps {
  text: string
  isVerified: boolean
  profileImage: string | null
  username: string
  name: string // Adding name prop
}

export default function PostPreview({ text, isVerified, profileImage, username, name }: PostPreviewProps) {
  return (
    <div id="post-preview" className="bg-white border border-gray-200 rounded-lg shadow-md max-w-md mx-auto">
      <div className="p-4">
        <div className="flex items-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full object-cover mr-4" />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200 mr-4" />
          )}
          <div>
            <div className="flex items-center">
              <h2 className="font-bold text-gray-900">{name || 'Your Name'}</h2> {/* Display Name */}
              {isVerified && (
                <CheckBadgeIcon className="h-5 w-5 ml-1 text-blue-500" aria-hidden="true" />
              )}
            </div>
            <p className="text-gray-500">{username}</p>
          </div>
        </div>
        <p className="mt-20 text-gray-900 ">{text || "What's on your mind?"}</p>
      </div>
     
    </div>
  )
}
