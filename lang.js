const translations = {
    en: {
        welcome: "Welcome to the Main Page",
        inventory: "Inventory Management",
        sales: "Sales Tracking",
        customers: "Customer Management",
        manage: "Manage",
        language: "Language",
        description: "This is your central hub for managing inventory, sales, customers, and other administrative tasks.",
        prototype: "This is a prototype version of the platform. Some features may not be fully functional."
    },
    sw: {
        welcome: "Karibu kwenye Ukurasa Kuu",
        inventory: "Usimamizi wa Bidhaa",
        sales: "Ufuatiliaji wa Mauzo",
        customers: "Usimamizi wa Wateja",
        manage: "Simamia",
        language: "Lugha",
        description: "Hii ni sehemu yako kuu ya kusimamia bidhaa, mauzo, wateja, na kazi zingine za kiutawala.",
        prototype: "Hii ni toleo la mfano wa jukwaa. Baadhi ya vipengele vinaweza kuwa havifanyi kazi kikamilifu."
    }
};

function setLanguage(language) {
    localStorage.setItem('language', language);
    translatePage(language);
}

function translatePage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key] || key;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const language = localStorage.getItem('language') || 'en';
    translatePage(language);
});
