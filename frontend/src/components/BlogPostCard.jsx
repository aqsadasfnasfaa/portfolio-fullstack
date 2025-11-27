import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/blog/${post._id}`}
      className="block bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 hover:border-[#3a3a3a] transition-all group"
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <span>{post.author?.username || 'Unknown'}</span>
        <span>·</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <h3 className="text-base font-medium text-white mb-2 group-hover:text-[#0078d4] transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">
        {post.content.substring(0, 150)}...
      </p>
    </Link>
  );
};

export default BlogPostCard;
