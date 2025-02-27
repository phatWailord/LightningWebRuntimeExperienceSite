import { LightningElement, wire, api } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/PortfolioImages';
import {CurrentPageReference} from 'lightning/navigation';

export default class AboutMe extends LightningElement {

    @wire(CurrentPageReference)
    currentPageRef;

    

    aboutMeImageURL = IMAGES + '/aboutMeHeadShot.JPG';
}