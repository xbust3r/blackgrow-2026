class Tabs {
    constructor(container) {
        this.container = container;
        this.tablist = container.querySelector('[role="tablist"]');
        this.tabs = Array.from(container.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));

        if (!this.tabs.length || !this.panels.length) return;

        this.tabs.forEach((tab) => {
            tab.addEventListener('click', () => this.activateTab(tab));
            tab.addEventListener('keydown', (event) => this.onKeydown(event, tab));
        });
    }

    activateTab(selectedTab) {
        this.tabs.forEach((tab) => {
            const isSelected = tab === selectedTab;
            tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            tab.tabIndex = isSelected ? 0 : -1;

            if (isSelected) {
                tab.classList.add('text-brand', 'border-brand');
                tab.classList.remove('text-ink', 'border-transparent');
            } else {
                tab.classList.remove('text-brand', 'border-brand');
                tab.classList.add('text-ink', 'border-transparent');
            }

            const panelId = tab.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.hidden = !isSelected;
            }
        });
    }

    onKeydown(event, currentTab) {
        const index = this.tabs.indexOf(currentTab);
        let newIndex;

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = (index + 1) % this.tabs.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = (index - 1 + this.tabs.length) % this.tabs.length;
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = this.tabs.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        const nextTab = this.tabs[newIndex];
        this.activateTab(nextTab);
        nextTab.focus();
    }
}

const initTabs = () => {
    document
        .querySelectorAll('.js-tabs')
        .forEach((container) => new Tabs(container));
};

initTabs();

export default Tabs;
