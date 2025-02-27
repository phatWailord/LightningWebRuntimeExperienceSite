import { LightningElement } from 'lwc';
import IMAGES from '@salesforce/resourceUrl/PortfolioImages'

export default class PortfolioHero extends LightningElement {

    imageURL = IMAGES + '/hero.jpeg';

}