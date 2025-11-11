// Global variables
let allJournals = [];

// Chart colors
const colors = {
  purple: "#667eea",
  blue: "#3b82f6",
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
  pink: "#ec4899",
  indigo: "#6366f1",
  teal: "#14b8a6",
  orange: "#f97316",
  cyan: "#06b6d4",
};

const chartColors = [
  colors.purple,
  colors.blue,
  colors.green,
  colors.yellow,
  colors.red,
  colors.pink,
  colors.indigo,
  colors.teal,
  colors.orange,
  colors.cyan,
];

// Load JSON data
async function loadData() {
  try {
    const response = await fetch("data/db_jurnal.json");
    const jsonData = await response.json();

    allJournals = jsonData;
    initializeAnalytics();
  } catch (error) {
    console.error("Error loading JSON:", error);
    document.getElementById("loading").innerHTML = `
      <div class="text-center text-red-600">
        <i class="fas fa-exclamation-circle text-6xl mb-4"></i>
        <h3 class="text-2xl font-bold mb-2">Error Loading Data</h3>
        <p>Gagal memuat data jurnal.</p>
      </div>
    `;
  }
}

// Initialize analytics
function initializeAnalytics() {
  updateStatistics();
  createCharts();

  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "block";
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

  const publishers = new Set(
    allJournals.map((j) => j.Penerbit).filter((p) => p && p !== "-")
  );
  const fields = new Set(
    allJournals.map((j) => j["Bidang Ilmu"]).filter((f) => f && f !== "-")
  );

  document.getElementById("statTotal").textContent = totalJournals;
  document.getElementById("statS5").textContent = totalS5;
  document.getElementById("statS6").textContent = totalS6;
  document.getElementById("statScopus").textContent = totalScopus;
  document.getElementById("statPublishers").textContent = publishers.size;
  document.getElementById("statFields").textContent = fields.size;
}

// Create all charts
function createCharts() {
  createSintaChart();
  createScopusChart();
  createFieldChart();
  createCityChart();
  createPublisherChart();
}

// SINTA Accreditation Chart
function createSintaChart() {
  const ctx = document.getElementById("sintaChart").getContext("2d");

  const s5Count = allJournals.filter((j) => j.Sinta === "S5").length;
  const s6Count = allJournals.filter((j) => j.Sinta === "S6").length;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["S5", "S6"],
      datasets: [
        {
          data: [s5Count, s6Count],
          backgroundColor: [colors.yellow, colors.blue],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14, weight: "bold" },
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

// Scopus Status Chart
function createScopusChart() {
  const ctx = document.getElementById("scopusChart").getContext("2d");

  const indexed = allJournals.filter((j) => {
    const scopus = (j.Scopus || "").toLowerCase();
    return scopus !== "blm_scopus" && scopus !== "" && scopus !== "-";
  }).length;

  const notIndexed = allJournals.length - indexed;

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Terindeks Scopus", "Belum Terindeks"],
      datasets: [
        {
          data: [indexed, notIndexed],
          backgroundColor: [colors.green, colors.red],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14, weight: "bold" },
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

// Top 10 Fields Chart
function createFieldChart() {
  const ctx = document.getElementById("fieldChart").getContext("2d");

  // Count by field
  const fieldCounts = {};
  allJournals.forEach((j) => {
    const field = j["Bidang Ilmu"];
    if (field && field !== "-") {
      fieldCounts[field] = (fieldCounts[field] || 0) + 1;
    }
  });

  // Get top 10
  const sorted = Object.entries(fieldCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map((x) => x[0]);
  const data = sorted.map((x) => x[1]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jumlah Jurnal",
          data: data,
          backgroundColor: colors.purple,
          borderColor: colors.purple,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Jumlah: ${context.parsed.y} jurnal`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
        },
        x: {
          ticks: {
            font: { size: 11 },
            maxRotation: 45,
            minRotation: 45,
          },
        },
      },
    },
  });
}

// Top 10 Cities Chart
function createCityChart() {
  const ctx = document.getElementById("cityChart").getContext("2d");

  // Count by city
  const cityCounts = {};
  allJournals.forEach((j) => {
    const city = j["Kota Terbit"];
    if (city && city !== "-") {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
  });

  // Get top 10
  const sorted = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map((x) => x[0]);
  const data = sorted.map((x) => x[1]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jumlah Jurnal",
          data: data,
          backgroundColor: colors.blue,
          borderColor: colors.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Jumlah: ${context.parsed.x} jurnal`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
        },
        y: {
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

// Top 10 Publishers Chart
function createPublisherChart() {
  const ctx = document.getElementById("publisherChart").getContext("2d");

  // Count by publisher
  const publisherCounts = {};
  allJournals.forEach((j) => {
    const publisher = j.Penerbit;
    if (publisher && publisher !== "-") {
      publisherCounts[publisher] = (publisherCounts[publisher] || 0) + 1;
    }
  });

  // Get top 10
  const sorted = Object.entries(publisherCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map((x) => x[0]);
  const data = sorted.map((x) => x[1]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jumlah Jurnal",
          data: data,
          backgroundColor: chartColors.slice(0, 10),
          borderColor: chartColors.slice(0, 10),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Jumlah: ${context.parsed.y} jurnal`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
        },
        x: {
          ticks: {
            font: { size: 10 },
            maxRotation: 45,
            minRotation: 45,
          },
        },
      },
    },
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", loadData);
