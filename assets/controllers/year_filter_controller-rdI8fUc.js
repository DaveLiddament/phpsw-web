import { Controller } from '@hotwired/stimulus';

/*
 * Events page: the year chips filter to one year (without JS they jump to it).
 * Also opens the meeting named in the URL hash, e.g. /events#2019-10-level-up.
 */
export default class extends Controller {
    static targets = ['group'];

    connect() {
        const params = new URLSearchParams(window.location.search);
        this.apply(params.get('year') || 'all');

        const id = decodeURIComponent(window.location.hash.slice(1));
        const row = id ? document.getElementById(id) : null;
        if (row && row.tagName === 'DETAILS') {
            row.open = true;
            row.scrollIntoView();
        }
    }

    pick(event) {
        event.preventDefault();
        const year = event.currentTarget.dataset.value || 'all';
        this.apply(year);
        const url = year === 'all' ? window.location.pathname : `${window.location.pathname}?year=${year}`;
        history.replaceState(null, '', url);
    }

    apply(year) {
        this.groupTargets.forEach((group) => group.classList.toggle('is-hidden', year !== 'all' && group.dataset.year !== String(year)));
        this.element.querySelectorAll('.a-chip').forEach((chip) => {
            const active = (chip.dataset.value || 'all') === String(year);
            chip.classList.toggle('a-chip--active', active);
            active ? chip.setAttribute('aria-current', 'true') : chip.removeAttribute('aria-current');
        });
    }
}
