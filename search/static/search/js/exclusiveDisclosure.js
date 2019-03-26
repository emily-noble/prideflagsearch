"use strict";

(()=>{
    class ExclusiveDisclosure extends PFS.Disclosure {
        constructor(toggleElement, contentCallback, disclosureGroup = "default") {
            super(toggleElement, contentCallback);
            
            this.disclosureGroup = disclosureGroup;
            
            document.addEventListener("PFS.ExclusiveDisclosure.hide." + this.disclosureGroup, () => {
                super.hide();
            });
        }
        
        toggle() {
            if (!this.isShown()) {
                const event = new CustomEvent("PFS.ExclusiveDisclosure.hide." + this.disclosureGroup);
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