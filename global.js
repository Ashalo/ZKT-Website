console.log('IT’S ALIVE!');

// function $$(selector, context = document) {
//   return Array.from(context.querySelectorAll(selector));
// }

// Step 3.1: Automatically generate the navigation menu
const pages = [
    { url: '', title: 'Home' },
    { url: '#projects', title: 'projects' },
    { url: '#contact', title: 'contact' },
    { url: './resume/', title: 'Resume' },
    { url: 'https://github.com/Ashalo', title: 'GitHub' },
];
  
// Check if we are on the home page
// const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
// Create a <nav> element and prepend it to the <body>
const nav = document.createElement('nav');
document.querySelector('.navwrapper')?.prepend(nav);
  
for (const p of pages) {
    const a = document.createElement('a');
    let url = p.url;

    // If hash link and not on home page, prepend home page path
    if ((p.url === '#projects' || p.url === '#contact') && !document.documentElement.classList.contains('home')) {
        url = '../' + p.url; // Adjust as needed based on folder depth
    }

    a.href = url;
    a.textContent = p.title;

    // Highlight current page
    if (p.url && !p.url.startsWith('#') && location.pathname.endsWith(p.url)) {
        a.classList.add('current');
    }

    // External links open in new tab
    if (p.url.startsWith('http')) a.target = '_blank';

    nav.append(a);
}


// Reference the <select> element
const select = document.querySelector('.color-scheme select');

// Function to set the color scheme
function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
}

// Event listener for dropdown changes
// select.addEventListener('input', (event) => {
//   const colorScheme = event.target.value;
//   setColorScheme(colorScheme);
//   localStorage.colorScheme = colorScheme; // Save preference
//   console.log('Color scheme set to:', colorScheme);
// });

// On page load, apply saved color scheme if available
// if ("colorScheme" in localStorage) {
//   const savedScheme = localStorage.colorScheme;
//   setColorScheme(savedScheme);
//   select.value = savedScheme; // Match dropdown to saved value
// } else {
//   setColorScheme('light dark'); // Default to automatic
// }

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