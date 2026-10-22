import { Controller } from '@hotwired/stimulus';

/*
 * "Previously": shows three tiles and moves on by three every 5s, with a fade.
 * Pauses on hover/focus and never runs with prefers-reduced-motion.
 */
export default class extends Controller {
    static targets = ['tile'];
    static values = { interval: { type: Number, default: 5000 }, perPage: { type: Number, default: 3 } };

    connect() {
        this.offset = 0;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.show();
        this.resume();
    }

    disconnect() {
        this.pause();
    }

    pause() {
        clearInterval(this.timer);
        this.timer = null;
    }

    resume() {
        if (this.reducedMotion || this.timer || this.tileTargets.length <= this.perPageValue) {
            return;
        }
        this.timer = setInterval(() => this.step(), this.intervalValue);
    }

    step() {
        this.element.classList.add('is-fading');
        setTimeout(() => {
            this.offset = (this.offset + this.perPageValue) % this.tileTargets.length;
            this.show();
            this.element.classList.remove('is-fading');
        }, 300);
    }

    show() {
        const count = this.tileTargets.length;
        const visible = new Set([...Array(this.perPageValue).keys()].map((i) => (this.offset + i) % count));
        this.tileTargets.forEach((tile, index) => tile.classList.toggle('is-hidden', !visible.has(index)));
    }
}
