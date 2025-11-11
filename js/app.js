// Global variables
let allJournals = [];
let filteredJournals = [];
let currentPage = 1;
let perPage = 20;

// Load JSON data
async function loadData() {
  try {
    const response = await fetch("data/db_jurnal.json");
    const jsonData = await response.json();

    allJournals = jsonData;
    filteredJournals = [...allJournals];

    initializeApp();
  } catch (error) {
    console.error("Error loading JSON:", error);
    document.getElementById("loading").innerHTML = `
      <div class="text-center text-red-600">
        <i class="fas fa-exclamation-circle text-6xl mb-4"></i>
        <h3 class="text-2xl font-bold mb-2">Error Loading Data</h3>
        <p>Gagal memuat data jurnal. Pastikan file db_jurnal.json ada di folder data/</p>
      </div>
    `;
  }
}

// Initialize app
function initializeApp() {
  updateStatistics();
  populateFieldFilter();
  renderJournals();
  setupEventListeners();

  document.getElementById("loading").style.display = "none";
}

// Update statistics
function updateStatistics() {
  const totalJournals = allJournals.length;
  const totalS5 = allJournals.filter((j) => j.Sinta === "S5").length;
  const totalS6 = allJournals.filter((j) => j.Sinta === "S6").length;
  const totalScopus = allJournals.filter((j) => {
    const scopus = (j.Scopus || "").toLowerCase();
    return scopus !== "blm_scopus" && scopus !== "" && scopus !== "-";
  }).length;

  document.getElementById("totalJournals").textContent = totalJournals;
  document.getElementById("totalS5").textContent = totalS5;
  document.getElementById("totalS6").textContent = totalS6;
  document.getElementById("totalScopus").textContent = totalScopus;
}

// Populate field filter
function populateFieldFilter() {
  const fields = [
    ...new Set(allJournals.map((j) => j["Bidang Ilmu"]).filter((f) => f)),
  ].sort();
  const fieldSelect = document.getElementById("fieldFilter");

  fields.forEach((field) => {
    const option = document.createElement("option");
    option.value = field;
    option.textContent = field;
    fieldSelect.appendChild(option);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Search input with debounce
  let searchTimeout;
  document.getElementById("searchInput").addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentPage = 1;
      applyFilters();
    }, 500);
  });

  // Filter selects
  document.getElementById("sintaFilter").addEventListener("change", () => {
    currentPage = 1;
    applyFilters();
  });

  document.getElementById("scopusFilter").addEventListener("change", () => {
    currentPage = 1;
    applyFilters();
  });

  document.getElementById("fieldFilter").addEventListener("change", () => {
    currentPage = 1;
    applyFilters();
  });

  // Per page select
  document
    .getElementById("perPageSelect")
    .addEventListener("change", function () {
      perPage = parseInt(this.value);
      currentPage = 1;
      renderJournals();
    });
}

// Apply filters
function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const sintaFilter = document.getElementById("sintaFilter").value;
  const scopusFilter = document.getElementById("scopusFilter").value;
  const fieldFilter = document.getElementById("fieldFilter").value;

  filteredJournals = allJournals.filter((journal) => {
    // Search filter
    if (searchTerm) {
      const searchableText = [
        journal["Nama Jurnal"] || "",
        journal["Singkatan Nama Jurnal"] || "",
        journal.Penerbit || "",
        journal["Bidang Ilmu"] || "",
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // SINTA filter
    if (sintaFilter !== "all" && journal.Sinta !== sintaFilter) {
      return false;
    }

    // Scopus filter
    if (scopusFilter !== "all") {
      const scopus = (journal.Scopus || "").toLowerCase();
      const isIndexed =
        scopus !== "blm_scopus" && scopus !== "" && scopus !== "-";

      if (scopusFilter === "indexed" && !isIndexed) {
        return false;
      }
      if (scopusFilter === "not_indexed" && isIndexed) {
        return false;
      }
    }

    // Field filter
    if (fieldFilter !== "all" && journal["Bidang Ilmu"] !== fieldFilter) {
      return false;
    }

    return true;
  });

  renderJournals();
}

// Render journals
function renderJournals() {
  const journalsList = document.getElementById("journalsList");
  const noResults = document.getElementById("noResults");
  const pagination = document.getElementById("pagination");

  // Calculate pagination
  const totalPages = Math.ceil(filteredJournals.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredJournals.length);
  const journalsToShow = filteredJournals.slice(startIndex, endIndex);

  // Update counts
  document.getElementById("showingCount").textContent = journalsToShow.length;
  document.getElementById("totalCount").textContent = filteredJournals.length;
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;

  // Show/hide elements
  if (filteredJournals.length === 0) {
    journalsList.innerHTML = "";
    noResults.classList.remove("hidden");
    pagination.classList.add("hidden");
    return;
  }

  noResults.classList.add("hidden");
  pagination.classList.remove("hidden");

  // Render journals
  journalsList.innerHTML = journalsToShow
    .map((journal) => createJournalCard(journal))
    .join("");

  // Update pagination buttons
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Create journal card
function createJournalCard(journal) {
  const scopus = (journal.Scopus || "").toLowerCase();
  const isIndexed = scopus !== "blm_scopus" && scopus !== "" && scopus !== "-";
  const sintaBadgeClass = journal.Sinta === "S5" ? "badge-s5" : "badge-s6";

  return `
        <div class="bg-white rounded-lg shadow-lg p-6 card-hover">
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div class="flex-1">
                    <div class="flex items-start space-x-4">
                        <div class="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                            <i class="fas fa-journal-whills text-purple-600 text-2xl"></i>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">${
                              journal["Nama Jurnal"] || "-"
                            }</h3>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span class="badge ${sintaBadgeClass}">SINTA ${
    journal.Sinta || "-"
  }</span>
                                ${
                                  isIndexed
                                    ? '<span class="badge badge-scopus"><i class="fas fa-globe mr-1"></i>Scopus</span>'
                                    : ""
                                }
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-bookmark w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">Singkatan:</span>
                                    <span>${
                                      journal["Singkatan Nama Jurnal"] || "-"
                                    }</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-building w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">Penerbit:</span>
                                    <span>${journal.Penerbit || "-"}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-flask w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">Bidang:</span>
                                    <span>${
                                      journal["Bidang Ilmu"] || "-"
                                    }</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-map-marker-alt w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">Kota:</span>
                                    <span>${
                                      journal["Kota Terbit"] || "-"
                                    }</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-barcode w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">ISSN:</span>
                                    <span>${journal.ISSN || "-"}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-digital-tachograph w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">E-ISSN:</span>
                                    <span>${journal["E ISSN"] || "-"}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-calendar-alt w-5 text-purple-500"></i>
                                    <span class="font-semibold mr-2">Masa Aktif:</span>
                                    <span>${
                                      journal["Masa aktif Sinta"] || "-"
                                    }</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <i class="fas fa-link w-5 text-purple-500"></i>
                                    ${
                                      journal["Link Jurnal"]
                                        ? `<a href="${journal["Link Jurnal"]}" target="_blank" class="text-purple-600 hover:text-purple-800 font-semibold">
                                            Kunjungi Website <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                                        </a>`
                                        : "<span>-</span>"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Pagination functions
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderJournals();
  }
}

function nextPage() {
  const totalPages = Math.ceil(filteredJournals.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderJournals();
  }
}

// Reset filters
function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("sintaFilter").value = "all";
  document.getElementById("scopusFilter").value = "all";
  document.getElementById("fieldFilter").value = "all";
  currentPage = 1;

  filteredJournals = [...allJournals];
  renderJournals();
}

// Export functions
function exportData(format) {
  if (format === "csv") {
    exportCSV();
  } else if (format === "json") {
    exportJSON();
  }
}

function exportCSV() {
  const csv = Papa.unparse(filteredJournals);
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `jurnal_export_${getTimestamp()}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportJSON() {
  const json = JSON.stringify(filteredJournals, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `jurnal_export_${getTimestamp()}.json`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getTimestamp() {
  const now = new Date();
  return (
    now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    "_" +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  );
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}

// Initialize on load
document.addEventListener("DOMContentLoaded", loadData);
