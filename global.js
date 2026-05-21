console.log('IT’S ALIVE!');

const repoName = "ZKT-Website"; // GitHub
const base = `/${repoName}/`;


// Reference the <select> element
const select = document.querySelector('.color-scheme select');

// Function to set the color scheme
function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);

    // Check if the response is valid
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    // Parse the response data
    const data = await response.json();

    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project) {
  const projectElement = document.createElement('article');
  projectElement.classList.add('project');

  projectElement.innerHTML = ` 
        <h3>${project.title}</h3>
        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''} 
        <h3>${project.lastUpdated}</h3>
      <div class="project-text">
        <p>${project.description}</p>
      </div>
        <p class="last-updated">Created: ${project.year}</p>
  `;

  return projectElement;
}


export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}/repos`);
}