import { Controller } from '@hotwired/stimulus';

/*
 * Site header: the skin picker. Sets <html data-theme> (themes.css) and
 * remembers the choice; base.html.twig re-applies it before first paint.
 * A ?theme=… link (e.g. /?theme=swiss) picks a skin and remembers it too.
 */
const KEY = 'phpsw-theme';
const DEFAULT = 'handbill';

export default class extends Controller {
    static targets = ['select'];

    connect() {
        this.selectTarget.value = document.documentElement.dataset.theme || DEFAULT;
        if (!this.selectTarget.value) {
            // A saved or linked skin that doesn't exist: fall back to the default.
            this.selectTarget.value = DEFAULT;
            this.change();
        } else if (new URLSearchParams(window.location.search).has('theme')) {
            this.change();
        }
        this.element.hidden = false;
    }

    change() {
        const theme = this.selectTarget.value;
        const root = document.documentElement;
        theme === DEFAULT ? delete root.dataset.theme : (root.dataset.theme = theme);
        try {
            theme === DEFAULT ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, theme);
        } catch (e) {
            // Storage blocked (private mode etc.): the skin just won't be remembered.
        }
    }
}
