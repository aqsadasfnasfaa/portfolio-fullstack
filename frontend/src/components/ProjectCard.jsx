const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#3a3a3a] transition-all">
      {project.imageUrl ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-[#141414] flex items-center justify-center">
          <span className="text-3xl font-semibold text-gray-600">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-base font-medium text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex gap-4">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#0078d4] hover:text-[#1a86d9] transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
