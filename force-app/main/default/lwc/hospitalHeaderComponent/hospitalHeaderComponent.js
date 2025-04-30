import { LightningElement, api } from 'lwc';
//import headerImage from '@salesforce/resourceUrl/HealthcareImages';


export default class HospitalSiteHeader extends LightningElement {
    //headerImageUrl = headerImage;
    @api hospitalFirstName = 'Infinity';
    @api hospitalMiddleName = 'HealthCare';
    @api hospitalLastName = 'Hospital';
    @api tagline = 'Committed to your health and well-being';
}