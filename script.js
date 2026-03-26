
document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const knob = toggleBtn?.querySelector('span');
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');
    const mobileToggle = document.getElementById('mobile-theme-toggle');
    const mobileKnob = mobileToggle?.querySelector('span');
    const mobileSun = document.getElementById('mobile-sun-icon');
    const mobileMoon = document.getElementById('mobile-moon-icon');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isDarkNow = !document.documentElement.classList.contains('dark');
            
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

            // Move the knob
            if (mobileKnob) {
                mobileKnob.style.transform = isDarkNow ? 'translateX(20px)' : 'translateX(0)';
            }

            // Toggle icons with small delay for smooth animation
            setTimeout(() => {
                mobileSun?.classList.toggle('hidden');
                mobileMoon?.classList.toggle('hidden');
            }, 80);
        });
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        if (isDark) {
            html.classList.add('dark');
            if (knob) knob.style.transform = 'translateX(28px)';
            sun?.classList.add('hidden');
            moon?.classList.remove('hidden');
        } else {
            html.classList.remove('dark');
            if (knob) knob.style.transform = 'translateX(0)';
            sun?.classList.remove('hidden');
            moon?.classList.add('hidden');
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDarkNow = !html.classList.contains('dark');

            html.classList.toggle('dark');
            localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');

            if (knob) {
                knob.style.transform = isDarkNow ? 'translateX(28px)' : 'translateX(0)';
            }

            setTimeout(() => {
                sun?.classList.toggle('hidden');
                moon?.classList.toggle('hidden');
            }, 80);
        });
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.getElementById('hamburger');
    const closeIcon = document.getElementById('close-icon');

    function openSidebar() {
        if (sidebar) sidebar.classList.remove('translate-x-full');
        if (overlay) overlay.classList.remove('hidden');
        if (hamburger) hamburger.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.add('translate-x-full');
        if (overlay) overlay.classList.add('hidden');
        if (hamburger) hamburger.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            if (sidebar && sidebar.classList.contains('translate-x-full')) {
                openSidebar();
            } else {
                closeSidebar();
            }
        });
    }

    if (overlay) overlay.addEventListener('click', closeSidebar);

    const closeSidebarBtn = document.getElementById('close-sidebar');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    document.querySelectorAll('#mobile-sidebar a').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeSidebar();
        }
    });

    initTheme();
});