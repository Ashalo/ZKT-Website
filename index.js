import {renderProjects, fetchGitHubData} from './global.js';

async function loadLatestProjects() {
    try {
        // Fetch all the projects
        const projects = await fetchGitHubData('Ashalo') // This will show you the full JSON response in your browser console
        
        
        // Filter the latest 3 projects
        const latestProjects = projects.slice(0, 3);
        
        // Check if we have projects
        if (latestProjects.length === 0) {
            console.error('No projects available.');
            return;
        }
        console.log(latestProjects)

        // Select the projects container in the HTML
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error('Projects container not found!');
            return;
        }


        projectsContainer.innerHTML = '';  // Clear the container before appending
        latestProjects.forEach(latestProjects => renderProjects(latestProjects, projectsContainer));
    } catch (error) {
        console.error('Error loading the latest projects:', error);
    }
}

async function loadGitHubData() {
    try {
      const githubData = await fetchGitHubData('Ashalo');
      console.log(githubData);  // Log the data to verify it's being fetched correctly
      
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  }
  
  
loadGitHubData();

// Call the function to display the latest projects
loadLatestProjects();

