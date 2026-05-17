import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json');

        projects.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error('Projects container not found!');
            return;
        }

        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const link = document.createElement('a');
            link.href = project.url || '#';
            link.className = 'project-link';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';

            const article = renderProjects(project);
            link.appendChild(article);

            projectsContainer.appendChild(link);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

loadProjects();
