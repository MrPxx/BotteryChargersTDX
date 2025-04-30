import { LightningElement } from 'lwc';

export default class RefreshButtonBeta extends LightningElement {
    refreshPage() {
        window.location.reload(); // Force a full page reload
    }
}