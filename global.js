console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// // Step 2.1: Get an array of all nav links
// const navLinks = Array.from(document.querySelectorAll("nav a"));

// // Step 2.2: Find the link to the current page
// const currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname
// );

// // Step 2.3: Add the `current` class to the current page link (with safety check)
// currentLink?.classList.add("current");

// Step 3.1: Automatically generate the navigation menu
const pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/ZachUCSD', title: 'GitHub' },
  ];
  
  // Check if we are on the home page
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
  // Create a <nav> element and prepend it to the <body>
  const nav = document.createElement('nav');
  document.body.prepend(nav);
  
  // Loop through the `pages` array and dynamically generate links
  for (const p of pages) {
    // Adjust relative URLs if not on the home page
    let url = !ARE_WE_HOME && !p.url.startsWith('http') ? '../' + p.url : p.url;
  
    // Create the <a> element and set its attributes
    const a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;
  
    // Highlight the current page
    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );
  
    // Open external links in a new tab
    a.toggleAttribute('target', a.host !== location.host);
  
    // Append the link to the <nav>
    nav.append(a);
  }
  
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
  );

  // Reference the <select> element
const select = document.querySelector('.color-scheme select');

// Function to set the color scheme
function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
}

// Event listener for dropdown changes
select.addEventListener('input', (event) => {
  const colorScheme = event.target.value;
  setColorScheme(colorScheme);
  localStorage.colorScheme = colorScheme; // Save preference
  console.log('Color scheme set to:', colorScheme);
});

// On page load, apply saved color scheme if available
if ("colorScheme" in localStorage) {
  const savedScheme = localStorage.colorScheme;
  setColorScheme(savedScheme);
  select.value = savedScheme; // Match dropdown to saved value
} else {
  setColorScheme('light dark'); // Default to automatic
}
