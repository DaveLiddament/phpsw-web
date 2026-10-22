import { Controller } from '@hotwired/stimulus';

/* Speakers page: filter tiles by name as you type. */
export default class extends Controller {
    static targets = ['query', 'tile', 'count'];

    filter() {
        const query = this.queryTarget.value.trim().toLowerCase();
        let shown = 0;
        this.tileTargets.forEach((tile) => {
            const match = !query || tile.dataset.search.includes(query);
            tile.classList.toggle('is-hidden', !match);
            shown += match ? 1 : 0;
        });
        this.countTarget.textContent = `${shown} speaker${shown === 1 ? '' : 's'}`;
    }
}
