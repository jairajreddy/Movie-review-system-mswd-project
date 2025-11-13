import React, { useState } from 'react';
import { submitReview, updateReview } from '../api/api';
import { useAuth } from '../context/AuthContext';

const ReviewSection = ({ movieId, reviews, onReviewSubmit }) => {
  const { isAuthenticated, user } = useAuth();
  const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 1, comment: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to submit a review');
      return;
    }
    try {
      await submitReview(movieId, newReview);
      setNewReview({ rating: 1, comment: '' });
      if (onReviewSubmit) onReviewSubmit();
      alert('Review submitted!');
    } catch (error) {
      alert('Error submitting review');
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReview(editingReviewId, editForm);
      setEditingReviewId(null);
      setEditForm({ rating: 1, comment: '' });
      if (onReviewSubmit) onReviewSubmit();
      alert('Review updated!');
    } catch (error) {
      alert('Error updating review');
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditForm({ rating: 1, comment: '' });
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      {reviews && reviews.map((review, index) => (
        <div key={index} className="review">
          {editingReviewId === review._id ? (
            <form onSubmit={handleEditSubmit}>
              <select
                value={editForm.rating}
                onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
              >
                {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
              <textarea
                placeholder="Your review"
                value={editForm.comment}
                onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                required
              />
              <button type="submit">Update Review</button>
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
            </form>
          ) : (
            <>
              <p><strong>{review.user?.name || 'Anonymous'}</strong> - {review.rating}/5</p>
              <p>{review.comment}</p>
              {isAuthenticated && user && review.user?._id === user._id && (
                <button onClick={() => handleEdit(review)}>Edit</button>
              )}
            </>
          )}
        </div>
      ))}
      {isAuthenticated ? (
        <>
          <h4>Add a Review</h4>
          <form onSubmit={handleSubmit}>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              {[1,2,3,4,5].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
            <textarea
              placeholder="Your review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </>
      ) : (
        <p>Please <a href="/signin">sign in</a> to submit a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
