import { fetchJSON, renderProjects } from './global.js';

async function loadLatestProjects() {
    try {
        const projects = await fetchJSON('./lib/projects.json');

        if (!projects || projects.length === 0) {
            console.error('No projects available.');
            return;
        }

        projects.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

        const latestProjects = projects.slice(0, 5);

        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error('Projects container not found!');
            return;
        }

        projectsContainer.innerHTML = '';
        latestProjects.forEach(project => {
            const link = document.createElement('a');
            link.href = project.url || '#';
            link.target = '_blank';
            link.className = 'project-link';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';

            const article = renderProjects(project);
            link.appendChild(article);
            projectsContainer.appendChild(link);
        });
    } catch (error) {
        console.error('Error loading the latest projects:', error);
    }
}

loadLatestProjects();
