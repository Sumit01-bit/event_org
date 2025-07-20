// Sample data
const events = [
    {
        id: 1,
        title: "Tech Hackathon 2024",
        category: "hackathon",
        date: "2024-03-15",
        image: "https://picsum.photos/400/300?random=1",
        description: "Join us for a 24-hour coding challenge!",
        college: "Tech University",
        participants: 120
    },
    {
        id: 2,
        title: "AI Workshop",
        category: "workshop",
        date: "2024-03-20",
        image: "https://picsum.photos/400/300?random=2",
        description: "Learn about the latest AI technologies",
        college: "Innovation College",
        participants: 75
    },
    {
        id: 3,
        title: "Future of Tech Seminar",
        category: "seminar",
        date: "2024-03-25",
        image: "https://picsum.photos/400/300?random=3",
        description: "Industry experts discuss tech trends",
        college: "Digital Institute",
        participants: 200
    },
    {
        id: 4,
        title: "Gaming Tournament 2024",
        category: "gaming",
        date: "2024-04-01",
        image: "https://picsum.photos/400/300?random=4",
        description: "Compete in various esports tournaments",
        college: "Gaming Academy",
        participants: 150
    },
    {
        id: 5,
        title: "Research Conference",
        category: "conference",
        date: "2024-04-05",
        image: "https://picsum.photos/400/300?random=5",
        description: "Annual research presentation conference",
        college: "Research University",
        participants: 180
    },
    {
        id: 6,
        title: "Startup Exhibition",
        category: "exhibition",
        date: "2024-04-10",
        image: "https://picsum.photos/400/300?random=6",
        description: "Showcase your innovative startup ideas",
        college: "Business School",
        participants: 90
    },
    {
        id: 7,
        title: "Web Development Workshop",
        category: "workshop",
        date: "2024-04-15",
        image: "https://picsum.photos/400/300?random=7",
        description: "Learn modern web development techniques",
        college: "Code Academy",
        participants: 100
    },
    {
        id: 8,
        title: "Mathematics Competition",
        category: "competition",
        date: "2024-04-20",
        image: "https://picsum.photos/400/300?random=8",
        description: "Test your mathematical skills",
        college: "Math Institute",
        participants: 130
    },
    {
        id: 9,
        title: "Industry Networking Event",
        category: "networking",
        date: "2024-04-25",
        image: "https://picsum.photos/400/300?random=9",
        description: "Connect with industry professionals",
        college: "Business Network Institute",
        participants: 160
    },
    {
        id: 10,
        title: "Mobile App Hackathon",
        category: "hackathon",
        date: "2024-05-01",
        image: "https://picsum.photos/400/300?random=10",
        description: "Create innovative mobile applications",
        college: "Mobile Tech University",
        participants: 110
    },
    {
        id: 11,
        title: "Academic Writing Seminar",
        category: "academic",
        date: "2024-05-05",
        image: "https://picsum.photos/400/300?random=11",
        description: "Improve your academic writing skills",
        college: "Literature College",
        participants: 85
    },
    {
        id: 12,
        title: "Robotics Exhibition",
        category: "exhibition",
        date: "2024-05-10",
        image: "https://picsum.photos/400/300?random=12",
        description: "Showcase of cutting-edge robotics projects",
        college: "Robotics Institute",
        participants: 140
    },
    {
        id: 13,
        title: "Data Science Workshop",
        category: "workshop",
        date: "2024-05-15",
        image: "https://picsum.photos/400/300?random=13",
        description: "Learn data analysis and visualization",
        college: "Data Analytics School",
        participants: 95
    },
    {
        id: 14,
        title: "Design Competition",
        category: "competition",
        date: "2024-05-20",
        image: "https://picsum.photos/400/300?random=14",
        description: "Showcase your creative design skills",
        college: "Design Academy",
        participants: 170
    },
    {
        id: 15,
        title: "Cybersecurity Conference",
        category: "conference",
        date: "2024-05-25",
        image: "https://picsum.photos/400/300?random=15",
        description: "Learn about the latest in cybersecurity",
        college: "Security Institute",
        participants: 190
    }
    // {
    //     id: 16,
    //     title: "Project Exibition",
    //     category: "21-02-2024",
    //     // image: ""
    //     description: "Learn about the latest in cyber security",
    //     college: "JECRC college of engineering",
    //     participants: 50
    // }
];

const leaderboard = [
    { name: "John Doe", points: 1200, events: 15 },
    { name: "Jane Smith", points: 980, events: 12 },
    { name: "Alex Johnson", points: 850, events: 10 }
];

// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const recommendationsGrid = document.getElementById('recommendationsGrid');
const leaderboardList = document.getElementById('leaderboardList');
const searchInput = document.getElementById('searchEvents');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Event Listeners
searchInput.addEventListener('input', filterEvents);
categoryFilter.addEventListener('change', filterEvents);
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Initialize the app
function init() {
    displayEvents(events);
    displayRecommendations();
    displayLeaderboard();
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

// Display Events
function displayEvents(eventsToShow) {
    eventsGrid.innerHTML = eventsToShow.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <div class="date">${formatDate(event.date)}</div>
            <p>${event.description}</p>
            <button onclick="showEventDetails(${event.id})">Learn More</button>
        </div>
    `).join('');
}

// Filter Events
function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    displayEvents(filteredEvents);
}

// Display Recommendations
function displayRecommendations() {
    // Simple recommendation algorithm based on participation numbers
    const recommendedEvents = [...events]
        .sort((a, b) => b.participants - a.participants)
        .slice(0, 2);
    
    recommendationsGrid.innerHTML = recommendedEvents.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <div class="date">${formatDate(event.date)}</div>
            <p>${event.description}</p>
            <button onclick="showEventDetails(${event.id})">Learn More</button>
        </div>
    `).join('');
}

// Display Leaderboard
function displayLeaderboard() {
    leaderboardList.innerHTML = leaderboard.map((user, index) => `
        <div class="leaderboard-item">
            <span class="rank">#${index + 1}</span>
            <div>
                <h3>${user.name}</h3>
                <p>${user.points} points • ${user.events} events</p>
            </div>
        </div>
    `).join('');
}

// Show Event Details
function showEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    modalContent.innerHTML = `
        <h2>${event.title}</h2>
        <img src="${event.image}" alt="${event.title}" style="width: 100%; max-height: 300px; object-fit: cover; margin: 1rem 0;">
        <p><strong>Date:</strong> ${formatDate(event.date)}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>College:</strong> ${event.college}</p>
        <p><strong>Participants:</strong> ${event.participants}</p>
        <p>${event.description}</p>
        <button onclick="registerForEvent(${event.id})" style="margin-top: 1rem;">Register Now</button>
    `;
    
    modal.style.display = 'block';
}

// Register for Event
function registerForEvent(eventId) {
    alert('Registration feature coming soon!');
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize the app
init();