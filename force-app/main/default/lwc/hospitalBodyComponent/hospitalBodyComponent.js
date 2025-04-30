import { LightningElement, api } from 'lwc';
//import headerImage from '@salesforce/resourceUrl/HealthcareImages';

export default class HospitalBodyComponent extends LightningElement {
    //serviceImageUrl = headerImage;

    /*@api hospitalName = 'Infinity HealthCare';
    @api welcomeText = 'At Infinity HealthCare Hospitals, we strive to offer exceptional medical services across all specialties. Our world-class doctors, advanced facilities, and compassionate staff ensure you and your family get the care you deserve.';

    @api services = [
        '24/7 Emergency Care',
        'Cardiology',
        'Orthopedics',
        'Pediatrics',
        'Neurology'
    ];
    @api reasons = [
        'Expert Specialists',
        'Modern Infrastructure',
        'Patient-Centered Approach',
        'Affordable Care'
  ];*/
  @api selectedPageId;

  get pageId() {
    return this.selectedPageId || '1'; // ✅ fallback to Page 1
}
    get isPage1() { return this.selectedPageId === '1'; }
    get isPage2() { return this.selectedPageId === '2'; }
    get isPage3() { return this.selectedPageId === '3'; }
    get isPage4() { return this.selectedPageId === '4'; }
    get isPage5() { return this.selectedPageId === '5'; }
    get isPage6() { return this.selectedPageId === '6'; }
}