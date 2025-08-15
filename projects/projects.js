import { fetchJSON, renderProjects, fetchGitHubData } from '../global.js';
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let projects = []; // Global projects data

async function loadProjects() {
    try {
        // Fetch all the projects
        const projects = await fetchGitHubData('Ashalo');
        
        // Select the projects container in the HTML
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error('Projects container not found!');
            return;
        }

        projectsContainer.innerHTML = '';  // Clear the container before appending

        // Render each project as a clickable button-like card
        projects.forEach(project => {
            // Create a link that wraps the article
            const link = document.createElement('a');
            link.href = project.html_url || '#'; // Use the GitHub URL or a placeholder
            link.className = 'project-link';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';

            // Render the project article
            const article = renderProjects(project);
            link.appendChild(article);

            projectsContainer.appendChild(link);
        });
    } catch (error) {
        console.error('Error loading the latest projects:', error);
    }
}

loadProjects();