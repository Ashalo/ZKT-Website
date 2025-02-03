import { fetchJSON, renderProjects, fetchGitHubData} from './global.js';

async function loadLatestProjects() {
    try {
        // Fetch all the projects
        const projects = await fetchJSON('./lib/projects.json');
        
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
      const githubData = await fetchGitHubData('ZachUCSD');
      console.log(githubData);  // Log the data to verify it's being fetched correctly
      
      const profileStats = document.querySelector('#profile-stats');
      
      if (profileStats && githubData) {
        profileStats.innerHTML = `
          <dl style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-row-gap: 10px;">
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
        `;
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  }
  
  
loadGitHubData();

// Call the function to display the latest projects
loadLatestProjects();

