import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingPost, setEditingPost] = useState(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, postsRes] = await Promise.all([
        projectsAPI.getAll(),
        blogAPI.getAll()
      ]);
      setProjects(projectsRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, isError = false) => {
    if (isError) {
      setError(msg);
      setSuccess(null);
    } else {
      setSuccess(msg);
      setError(null);
    }
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectForm);
        showMessage('Project updated successfully');
      } else {
        await projectsAPI.create(projectForm);
        showMessage('Project created successfully');
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to save project', true);
    }
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setEditingProject(project);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      showMessage('Project deleted successfully');
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to delete project', true);
    }
  };

  const cancelProjectEdit = () => {
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
    setEditingProject(null);
  };

  // Blog handlers
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, postForm);
        showMessage('Post updated successfully');
      } else {
        await blogAPI.create(postForm);
        showMessage('Post created successfully');
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to save post', true);
    }
  };

  const handleEditPost = (post) => {
    setPostForm({
      title: post.title,
      content: post.content
    });
    setEditingPost(post);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogAPI.delete(id);
      showMessage('Post deleted successfully');
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to delete post', true);
    }
  };

  const cancelPostEdit = () => {
    setPostForm({ title: '', content: '' });
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.username}</p>
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-lg text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-1 p-1 bg-[#141414] rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#0078d4] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'blog'
                  ? 'bg-[#0078d4] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Blog ({posts.length})
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Form */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-base font-medium text-white mb-5">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h2>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors"
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors resize-none"
                    rows="3"
                    placeholder="Brief description..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Repository URL</label>
                  <input
                    type="url"
                    value={projectForm.repoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Live URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
                  >
                    {editingProject ? 'Update' : 'Create'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={cancelProjectEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-[#2a2a2a] rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects List */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-base font-medium text-white mb-5">Projects</h2>
              {projects.length === 0 ? (
                <p className="text-gray-500 text-sm">No projects yet.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {projects.map((project) => (
                    <div key={project._id} className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-md p-4">
                      <h3 className="text-sm font-medium text-white">{project.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-[#0078d4] hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-400 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Post Form */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-base font-medium text-white mb-5">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors"
                    placeholder="Post title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Content</label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#0078d4] transition-colors resize-none"
                    rows="8"
                    placeholder="Write your content..."
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
                  >
                    {editingPost ? 'Update' : 'Create'}
                  </button>
                  {editingPost && (
                    <button
                      type="button"
                      onClick={cancelPostEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-[#2a2a2a] rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Posts List */}
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-base font-medium text-white mb-5">Posts</h2>
              {posts.length === 0 ? (
                <p className="text-gray-500 text-sm">No posts yet.</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {posts.map((post) => (
                    <div key={post._id} className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-md p-4">
                      <h3 className="text-sm font-medium text-white">{post.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {post.author?.username} · {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{post.content}</p>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="text-[#0078d4] hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="text-red-400 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
