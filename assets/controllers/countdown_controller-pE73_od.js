import { Controller } from '@hotwired/stimulus';

/*
 * Keeps "N days to go" / "tomorrow" / "tonight" current on a static page.
 * Days = ceil((start - now) / 1 day), matching the server-side countdown filter.
 */
export default class extends Controller {
    static values = { start: String };

    connect() {
        const days = Math.ceil((new Date(this.startValue) - new Date()) / 864e5);
        this.element.textContent = days > 1 ? `${days} days to go` : days === 1 ? 'tomorrow' : 'tonight';
    }
}
