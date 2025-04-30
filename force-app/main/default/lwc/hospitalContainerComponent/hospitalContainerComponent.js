import { LightningElement, track } from 'lwc';

export default class HospitalContainerComponent extends LightningElement {
    @track selectedPageId = '1'; // default to page 1

    handlePageChange(event) {
        this.selectedPageId = event.detail.pageId;
    }
}