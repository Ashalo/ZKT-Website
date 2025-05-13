import { fetchJSON, renderProjects, fetchGitHubData } from '../global.js';
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let projects = []; // Global projects data

async function loadProjects() {
    try {
        // Fetch all the projects
        const projects = await fetchGitHubData('Ashalo') // This will show you the full JSON response in your browser console
        

        // Select the projects container in the HTML
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error('Projects container not found!');
            return;
        }


        projectsContainer.innerHTML = '';  // Clear the container before appending
        projects.forEach(projects => renderProjects(projects, projectsContainer));
    } catch (error) {
        console.error('Error loading the latest projects:', error);
    }
}

loadProjects();
