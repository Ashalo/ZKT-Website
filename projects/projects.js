import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');
    
    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }
    
    try {
        const projects = await fetchJSON('../lib/projects.json');
        if (!projects || projects.length === 0) {
            console.error('No projects found or fetched.');
            return;
        }

        // Update the count of projects
        if (projectsTitle) {
            projectsTitle.innerHTML = `Projects (${projects.length})`;
        }

        projectsContainer.innerHTML = '';  // Clear the container before appending
        projects.forEach(project => renderProjects(project, projectsContainer));
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Call the loadProjects function to display the data
loadProjects();