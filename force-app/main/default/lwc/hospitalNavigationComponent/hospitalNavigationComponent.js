import { LightningElement, track } from 'lwc';

export default class HospitalNavigationComponent extends LightningElement {
    @track allItems = [
        { label: 'Home', id: 'home' },
        { label: 'Book an Appointment', id: 'func1' },
        { label: 'View my Appointments', id: 'func2' },
        { label: 'Our Doctors', id: 'func3' },
        { label: 'Insurance', id: 'func4' },
        { label: 'About Us', id: 'aboutus' },
        { label: 'Contact Us', id: 'contactus' }
    ];

    @track activePageId = 'home'; // ✅ default active page
    @track isMobileView = false;
    @track mobileMenuOpen = false;
    renderedOnce = false;

    connectedCallback() {
        this.isMobileView = window.innerWidth <= 768;
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    renderedCallback() {
        if (!this.isMobileView) {
            this.calculateVisibility(); // always recalculate
        }
    }

    get firstItem() {
        return this.allItems.length ? this.allItems[0] : {};
    }

    get remainingMobileItems() {
        return this.allItems.slice(1);
    }

    handleResize() {
        this.isMobileView = window.innerWidth <= 768;
        this.renderedOnce = false;
    }

    handleClick(event) {
        event.preventDefault();
        const pageId = event.target.dataset.id;
        this.activePageId = pageId;

        this.dispatchEvent(new CustomEvent('pagechange', {
            detail: { pageId }
        }));

        // Update active state in desktop links (manual DOM)
        if (!this.isMobileView) {
            const container = this.template.querySelector('[data-container]');
            if (container) {
                [...container.querySelectorAll('.nav-item')].forEach(link => {
                    link.classList.toggle('active', link.dataset.id === pageId);
                });
            }
        }
    }

    calculateVisibility() {
        if (this.isMobileView) return;

        const container = this.template.querySelector('[data-container]');
        if (!container) return;

        container.innerHTML = '';
        let totalWidth = 0;
        const containerMax = container.offsetWidth - 100;

        const visibleItems = [];
        const overflowItems = [];

        this.allItems.forEach((item) => {
            const el = document.createElement('a');
            el.textContent = item.label;
            el.href = '#';
            el.className = 'nav-item';
            el.dataset.id = item.id;
            el.onclick = this.handleClick.bind(this);
            container.appendChild(el);

            const width = el.offsetWidth + 16;
            totalWidth += width;

            if (totalWidth < containerMax) {
                visibleItems.push(item);
            } else {
                overflowItems.push(item);
            }
        });

        container.innerHTML = '';

        visibleItems.forEach(item => {
            const el = document.createElement('a');
            el.textContent = item.label;
            el.href = '#';
            el.dataset.id = item.id;
            el.className = 'nav-item' + (item.id === this.activePageId ? ' active' : '');
            el.onclick = this.handleClick.bind(this);
            container.appendChild(el);
        });

        if (overflowItems.length) {
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';

            const toggle = document.createElement('button');
            toggle.className = 'nav-item dropdown-toggle';
            toggle.textContent = 'More';

            const menu = document.createElement('div');
            menu.className = 'dropdown-menu';

            overflowItems.forEach(item => {
                const el = document.createElement('a');
                el.textContent = item.label;
                el.href = '#';
                el.dataset.id = item.id;
                el.className = 'dropdown-item';
                el.onclick = this.handleClick.bind(this);
                if (item.id === this.activePageId) {
                    el.classList.add('active');
                }
                menu.appendChild(el);
            });

            toggle.onclick = () => menu.classList.toggle('show');
            dropdown.appendChild(toggle);
            dropdown.appendChild(menu);
            container.appendChild(dropdown);
        }
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }
    itemClass(id) {
        return `nav-item ${this.activePageId === id ? 'active' : ''}`;
    }
}