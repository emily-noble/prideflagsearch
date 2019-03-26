"use strict";

(() => {
    class ExclusiveDisclosure extends PFS.Disclosure {
        constructor(toggleElement, contentCallback, disclosureGroup = "default") {
            super(toggleElement, contentCallback);

            this.disclosureEventName = "PFS.ExclusiveDisclosure.hide." + disclosureGroup;

            document.addEventListener(this.disclosureEventName, () => {
                super.hide()
            });
        }

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