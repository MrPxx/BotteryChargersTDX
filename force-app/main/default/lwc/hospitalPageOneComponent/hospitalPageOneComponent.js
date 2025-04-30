import { LightningElement, track } from 'lwc';
import basePath from '@salesforce/resourceUrl/hospitalAssets';

export default class HospitalPageOneComponent extends LightningElement {
    // imageUrls = [
    //     `${basePath}/image1.jpg`,
    //     `${basePath}/image2.jpg`,
    //     `${basePath}/image3.jpg`,
    //     `${basePath}/image4.jpg`,
    //     `${basePath}/image5.jpg`
    // ];
    @track allImages = [];
    @track currentIndex = 0;

    connectedCallback() {
        this.allImages = [
        `${basePath}/image1.jpg`,
        `${basePath}/image2.jpg`,
        `${basePath}/image3.jpg`,
        `${basePath}/image4.jpg`,
        `${basePath}/image5.jpg`
        ];
    }

    get visibleImages() {
        if (!this.allImages || this.allImages.length === 0) {
            return [];
        }

        const isMobile = window.innerWidth <= 768;
        const count = isMobile ? 1 : 2;
        return this.allImages.slice(this.currentIndex, this.currentIndex + count);
    }

    handleNext() {
        const isMobile = window.innerWidth <= 768;
        const maxIndex = this.allImages.length - (isMobile ? 1 : 2);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        }
    }

    handlePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    // Touch swipe for mobile
    touchStartX;

    handleTouchStart(evt) {
        this.touchStartX = evt.changedTouches[0].screenX;
    }

    handleTouchEnd(evt) {
        const endX = evt.changedTouches[0].screenX;
        const delta = endX - this.touchStartX;

        if (Math.abs(delta) > 50) {
            if (delta > 0) {
                this.handlePrev();
            } else {
                this.handleNext();
            }
        }
    }
}