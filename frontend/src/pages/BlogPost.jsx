import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogPost = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogAPI.getById(id);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    setSubmitting(true);
    setCommentError(null);

    try {
      const response = await commentsAPI.create(id, { body: commentBody });
      setComments([response.data, ...comments]);
      setCommentBody('');
    } catch (err) {
      setCommentError('Failed to post comment');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Post not found'}</p>
          <Link to="/blog" className="text-[#0078d4] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <span>&larr;</span>
          <span>Back to Blog</span>
        </Link>

        <article className="mb-12">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{post.author?.username || 'Unknown'}</span>
              <span>·</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </header>

          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

        {/* Comments Section */}
        <section className="border-t border-[#2a2a2a] pt-8">
          <h2 className="text-lg font-medium text-white mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-4 bg-[#141414] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] resize-none"
                rows="3"
                required
              />
              {commentError && (
                <p className="text-red-400 text-sm mt-2">{commentError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-3 px-4 py-2 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-[#141414] border border-[#2a2a2a] rounded-lg text-center">
              <p className="text-gray-400 text-sm">
                <Link to="/login" className="text-[#0078d4] hover:underline">
                  Login
                </Link>{' '}
                to post a comment.
              </p>
            </div>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="border-b border-[#2a2a2a] pb-6 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-white">
                      {comment.author?.username || 'Unknown'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
