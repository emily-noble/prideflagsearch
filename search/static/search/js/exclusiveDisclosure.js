"use strict";

(() => {
    /**
     * An exclsive disclosure element.
     * Only one ExclusiveDisclosure can be open at a time.
     * @extends PFS.Disclosure
     */
    class ExclusiveDisclosure extends PFS.Disclosure {
        /**
         * Create a Disclosure.
         * @param {DOMElement} toggleElement - The element controlling the disclosure.
         * @param {Function} contentCallback - The function to call to get the disclosure's content.
         * @param {string} disclosureGroup - An optional group name for the exclusive disclosure.
         *      Only exclusive disclosures with the same group name will be mutually exclusive.
         */
        constructor(toggleElement, contentCallback, disclosureGroup = "default") {
            super(toggleElement, contentCallback);

            this.disclosureEventName = "PFS.ExclusiveDisclosure.hide." + disclosureGroup;

            document.addEventListener(this.disclosureEventName, () => {
                super.hide()
            });
        }

        /*
         * @inheritDoc
         */
        toggle() {
            if (!this.isShown()) {
                const event = new CustomEvent(this.disclosureEventName);
                document.dispatchEvent(event);

                super.show();
            } else {
                super.hide();
            }
        }
    }

    window.PFS = window.PFS || {};
    window.PFS.ExclusiveDisclosure = ExclusiveDisclosure;
})();