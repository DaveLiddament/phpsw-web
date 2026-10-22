import { Controller } from '@hotwired/stimulus';

/*
 * Talks page: filter tiles by search text and topic. The state lives in the
 * URL (?q=&topic=) so filtered views can be linked to, e.g. from a talk's topic.
 */
export default class extends Controller {
    static targets = ['query', 'tile', 'count', 'empty'];

    connect() {
        const params = new URLSearchParams(window.location.search);
        this.topic = params.get('topic') || '';
        this.queryTarget.value = params.get('q') || '';
        this.filter();
    }

    pick(event) {
        event.preventDefault();
        this.topic = event.currentTarget.dataset.value || '';
        this.filter();
    }

    filter() {
        const query = this.queryTarget.value.trim().toLowerCase();
        let shown = 0;
        this.tileTargets.forEach((tile) => {
            const match = (!this.topic || tile.dataset.topic === this.topic) && (!query || tile.dataset.search.includes(query));
            tile.classList.toggle('is-hidden', !match);
            shown += match ? 1 : 0;
        });
        this.countTarget.textContent = `${shown} talk${shown === 1 ? '' : 's'}`;
        this.emptyTarget.hidden = shown > 0;

        this.element.querySelectorAll('.a-chip').forEach((chip) => {
            const active = (chip.dataset.value || '') === this.topic;
            chip.classList.toggle('a-chip--active', active);
            active ? chip.setAttribute('aria-current', 'true') : chip.removeAttribute('aria-current');
        });

        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (this.topic) params.set('topic', this.topic);
        const search = params.toString();
        history.replaceState(null, '', window.location.pathname + (search ? `?${search}` : ''));
    }
}
