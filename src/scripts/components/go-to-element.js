class GoToElementLink {
    constructor(link) {
        link.addEventListener('click', this.goToTarget);
    }

    goToTarget(event) {
        const targetUrl = event.currentTarget.href.split('#')[1];
        const target = document.querySelector(`#${targetUrl}`);
        target.tabIndex = -1;
        target.focus();
    }
}

let links = document.querySelectorAll('[href^="#"]:not([href="#"])');

links.forEach((link) => new GoToElementLink(link));