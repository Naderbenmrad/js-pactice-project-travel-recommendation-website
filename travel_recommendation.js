document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const headerOffset = nav.offsetHeight;
    document.querySelectorAll('section[id]').forEach(sec => { sec.style.scrollMarginTop = `${headerOffset + 10}px`; });
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', `#${id}`);
        }
    }));
    window.addEventListener('popstate', () => {
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    let travelData = {};
    fetch('./travel_recommendation_api.json')
        .then(res => { if (!res.ok) throw new Error(res.statusText); return res.json(); })
        .then(data => travelData = data)
        .catch(err => console.error('Error loading data:', err));

    const searchInput = document.getElementById('searchInput');
    const btnClear = document.getElementById('btnClear');
    const btnSearch = document.getElementById('btnSearch');

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    document.body.appendChild(resultsContainer);

    const clearResults = () => { resultsContainer.innerHTML = ''; };

    btnClear.addEventListener('click', () => {
        searchInput.value = '';
        clearResults();
        searchInput.focus();
    });

    btnSearch.addEventListener('click', () => {
        const q = searchInput.value.trim().toLowerCase();
        clearResults();
        if (!q) return;
        let items = [];
        if (['beach','beaches'].includes(q)) items = travelData.beaches.slice(0,2);
        else if (['temple','temples'].includes(q)) items = travelData.temples.slice(0,2);
        else if (['country','countries'].includes(q)) items = travelData.countries.slice(0,2).map(c => ({ name: c.name, imageUrl: c.cities[0].imageUrl, description: `Discover ${c.name}` }));
        else { resultsContainer.textContent = 'Enter "beach", "temple", or "country".'; return; }
        items.forEach(i => {
            const c = document.createElement('div');
            c.className = 'recommendation-card';
            c.innerHTML = `<img src="${i.imageUrl}" alt="${i.name}"><h3>${i.name}</h3><p>${i.description}</p>`;
            resultsContainer.appendChild(c);
        });
    });

    document.addEventListener('click', (e) => {
        const path = e.composedPath();
        if (!path.includes(resultsContainer) && e.target !== searchInput && e.target !== btnSearch) {
            clearResults();
        }
    });
});


function thankyou() {
    alert("Thank you for your message!");
    document.getElementById("contactForm").reset();
}