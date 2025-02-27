import { LightningElement } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/PortfolioImages'

export default class SkillCards extends LightningElement {
    adminImageURL = IMAGES + '/workExperience.jpeg';
    trainingImageURL = IMAGES + '/techDemos.jpeg';
    serviceImageURL = IMAGES + '/aboutMe.jpeg';
}