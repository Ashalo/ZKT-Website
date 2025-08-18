console.log('IT’S ALIVE!');

const repoName = "ZKT-Website"; // GitHub
const base = `/${repoName}/`;

const pages = [
  { url: "#home", title: "Home" },
  { url: "#projects", title: "Projects" },
  { url: "#contact", title: "Contact" },
  { url: "resume/", title: "Resume" },
  { url: "https://github.com/Ashalo", title: "GitHub" },
];

const wrapper = document.querySelector(".navwrapper");

for (const p of pages) {
  let url = p.url;

  // Only adjust internal links
  if (!url.startsWith("http") && !url.startsWith("#")) {
    url = base + url;
  }

  const a = document.createElement("a");
  a.href = url;
  a.textContent = p.title;

  // Highlight current page
  if (location.pathname === new URL(a.href).pathname) {
    a.classList.add("current");
  }

  // External links → new tab
  if (a.host !== location.host) {
    a.target = "_blank";
    a.rel = "noopener";
  }

  wrapper.append(a);
}


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
  const year = new Date(project.created_at).getFullYear();
  project.image = `/images/${project.name}.png`;

  projectElement.innerHTML = `
      <h3>
        <a href="${project.html_url}" target="_blank" rel="noopener" class="project-link">
          ${project.name}
        </a>
      </h3>
      <h3>${year}</h3>
      <p>${project.description}</p>
  `;

  return projectElement;
}


export async function fetchGitHubData(username) {
  // return statement here
  return fetchJSON(`https://api.github.com/users/${username}/repos`);
}