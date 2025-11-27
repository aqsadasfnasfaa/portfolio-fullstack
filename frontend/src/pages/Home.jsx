import { Link } from 'react-router-dom';

const Home = () => {
  const skills = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0078d4] text-sm font-medium mb-4">Full-Stack Developer</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight">
            Building digital experiences with clean code
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
            I create modern web applications with a focus on user experience, performance, and maintainable code.
          </p>
          <div className="flex gap-3">
            <Link
              to="/projects"
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-[#252525] hover:bg-[#303030] border border-[#3a3a3a] rounded-md transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">About</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <p className="text-gray-300 leading-relaxed">
              I'm a full-stack developer passionate about creating elegant solutions to complex problems.
              I specialize in React, Node.js, and modern web technologies.
            </p>
            <p className="text-gray-300 leading-relaxed">
              When I'm not coding, I enjoy learning new technologies, contributing to open source,
              and writing about my experiences in tech.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm text-gray-300 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md hover:border-[#3a3a3a] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-8">
            <h2 className="text-xl font-semibold text-white mb-3">Let's work together</h2>
            <p className="text-gray-400 mb-6">
              Have a project in mind? I'd love to hear about it.
            </p>
            <Link
              to="/contact"
              className="inline-flex px-5 py-2.5 text-sm font-medium text-white bg-[#0078d4] hover:bg-[#1a86d9] rounded-md transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
