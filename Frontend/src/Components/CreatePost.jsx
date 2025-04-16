import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiImage, FiUpload } from 'react-icons/fi';
import { ContextProvider } from "../../ContextApi/ContextApi";
import axios from 'axios';
function CreatePost() {
  const user = JSON.parse(localStorage.getItem("user-threads"));
  const postedBy=user.id
  const { dark } = useContext(ContextProvider);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    if (e.target.value.length <= 500) {
      setPostText(e.target.value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postText.trim() && !selectedImage) {
      setError('Please add text or an image to post');
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically upload to your backend
      // For demonstration, we'll just log and navigate back
      console.log({
        text: postText,
        image: selectedImage
      });

      // Simulate API call
      const res=await axios.post("http://localhost:4000/api/post/create",{text:postText,postedBy},
        {withCredentials:true}
      )
      console.log(res)
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styling based on dark/light mode
  const containerStyle = {
    backgroundColor: dark ? '#1e293b' : '#ffffff',
    color: dark ? '#f8fafc' : '#1e293b',
    minHeight: '100vh',
    padding: '20px',
    transition: 'background-color 0.3s ease'
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: dark ? '#334155' : '#f1f5f9',
    boxShadow: dark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '150px',
    padding: '12px',
    borderRadius: '8px',
    border: dark ? '1px solid #475569' : '1px solid #cbd5e1',
    backgroundColor: dark ? '#1e293b' : '#ffffff',
    color: dark ? '#f8fafc' : '#1e293b',
    resize: 'none',
    marginBottom: '15px',
    fontSize: '16px'
  };

  const buttonStyle = {
    backgroundColor: dark ? '#4f46e5' : '#6366f1',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    marginTop: '15px',
    transition: 'background-color 0.2s ease'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: dark ? '#475569' : '#cbd5e1',
    cursor: 'not-allowed'
  };

  const imagePreviewStyle = {
    position: 'relative',
    marginTop: '15px',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const removeImageButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create New Post</h2>
        
        {error && (
          <div style={{ 
            color: '#ef4444', 
            backgroundColor: dark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '15px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            style={textareaStyle}
            placeholder="What's on your mind?"
            value={postText}
            onChange={handleTextChange}
            maxLength="500"
          />
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: postText.length === 500 ? '#ef4444' : (dark ? '#94a3b8' : '#64748b')
            }}>
              {postText.length}/500
            </span>
            
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                backgroundColor: 'transparent',
                color: dark ? '#a5b4fc' : '#6366f1',
                border: `1px dashed ${dark ? '#a5b4fc' : '#6366f1'}`,
                padding: '8px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <FiImage /> {selectedImage ? 'Change Image' : 'Add Image'}
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          {selectedImage && (
            <div style={imagePreviewStyle}>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                style={{ 
                  width: '100%', 
                  maxHeight: '400px', 
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                style={removeImageButtonStyle}
                aria-label="Remove image"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          <button
            type="submit"
            style={isSubmitting || (!postText.trim() && !selectedImage) ? disabledButtonStyle : buttonStyle}
            disabled={isSubmitting || (!postText.trim() && !selectedImage)}
          >
            {isSubmitting ? (
              'Posting...'
            ) : (
              <>
                <FiUpload /> Post
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;