import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let projects = []; // Global projects data
let selectedIndex = -1; // Track selected wedge
let query = ''; // Track search query

async function loadProjects() {
    const projectsContainer = document.querySelector('.projects');
    const projectsTitle = document.querySelector('.projects-title');
    
    if (!projectsContainer) {
        console.error('Projects container not found!');
        return;
    }
    
    try {
        projects = await fetchJSON('../lib/projects.json');
        if (!projects || projects.length === 0) {
            console.error('No projects found or fetched.');
            return;
        }

        // Update project count
        if (projectsTitle) {
            projectsTitle.innerHTML = `Projects (${projects.length})`;
        }

        // Render projects and initial pie chart
        renderFilteredProjects(projects);
        renderPieChart(projects);

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Render filtered projects
function renderFilteredProjects(filteredProjects) {
    const projectsContainer = document.querySelector('.projects');
    if (!filteredProjects || filteredProjects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects found</p>';
        return;
    }
    
    projectsContainer.innerHTML = ''; // Clear before rendering
    filteredProjects.forEach(project => renderProjects(project, projectsContainer));
}

// Render interactive pie chart
function renderPieChart(projectsGiven) {
    if (!projectsGiven.length) return;

    let rolledData = d3.rollups(
        projectsGiven,
        v => v.length,
        d => d.year
    );

    let data = rolledData.map(([year, count]) => ({
        value: count,
        label: year
    }));

    let svg = d3.select("#projects-pie-plot");
    svg.selectAll("*").remove();

    const width = 100, height = 100, radius = 50;
    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);
    let pie = d3.pie().value(d => d.value);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    let arcData = pie(data);

    let paths = svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("transform", "translate(50,50)")
        .attr("class", (_, i) => (selectedIndex === i ? "selected" : ""))
        .style("cursor", "pointer") // Indicate clickability
        .on("mouseover", function () {
            svg.classed("has-hover", true);
        })
        .on("mouseout", function () {
            svg.classed("has-hover", false);
        })
        .on("click", function (_, i) {
            selectedIndex = selectedIndex === i ? -1 : i;
            updateSelection(data);
        });

    svg.selectAll("text")
        .data(arcData)
        .enter()
        .append("text")
        .attr("transform", d => {
            let [x, y] = arcGenerator.centroid(d);
            return `translate(${x + 50},${y + 50})`;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "4px")
        .attr("fill", "white")
        .text(d => d.data.label);

    // Create legend
    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    data.forEach((d, idx) => {
        let item = legend.append("li")
            .attr("style", `--color:${colorScale(idx)}`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
            .attr("class", idx === selectedIndex ? "selected" : "")
            .on("click", () => {
                selectedIndex = selectedIndex === idx ? -1 : idx;
                updateSelection(data);
            });
    });
}

// Update selected wedge and filter projects
function updateSelection(data) {
    console.log("Selected index:", selectedIndex); // Debugging log

    let svg = d3.select("#projects-pie-plot");

    // Update the pie chart slice classes based on selection
    svg.selectAll("path").attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));
    
    // Update the legend selection
    d3.select(".legend").selectAll("li").attr("class", (_, idx) => (selectedIndex === idx ? "selected" : ""));

    let filteredProjects;

    if (selectedIndex === -1) {
        console.log("Resetting to all projects.");
        filteredProjects = projects; // Use the global projects list
    } else {
        // Get the year associated with the selected slice
        let selectedYear = data[selectedIndex].label;
        console.log("Filtering projects for year:", selectedYear); // Debugging log

        // Filter projects based on the selected year
        filteredProjects = projects.filter(p => String(p.year) === String(selectedYear));
        console.log("Filtered projects count:", filteredProjects.length); // Debugging log
    }

    // Render the filtered projects and update pie chart accordingly
    renderFilteredProjects(filteredProjects); // Pass filtered projects here
    renderPieChart(filteredProjects); // Re-render pie chart with filtered data
}

// Search bar event listener
const searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    query = event.target.value.toLowerCase();

    let filteredProjects = projects.filter(project => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query);
    });

    renderFilteredProjects(filteredProjects); // Pass filtered projects to render
    renderPieChart(filteredProjects); // Re-render pie chart with filtered data
});

// Load projects on page load
loadProjects();
