import { LightningElement, wire, track } from "lwc";
import IMAGES from "@salesforce/resourceUrl/PortfolioImages";

import JOB_OBJECT from "@salesforce/schema/Job__c";
import JOB_ID_FIELD from "@salesforce/schema/Job__c.Id";
import JOB_TITLE_FIELD from "@salesforce/schema/Job__c.Name";
import JOB_DESCRIPTION_FIELD from "@salesforce/schema/Job__c.Description__c";
import JOB_START_DATE_FIELD from "@salesforce/schema/Job__c.Start_Date__c";
import JOB_END_DATE_FIELD from "@salesforce/schema/Job__c.End_Date__c";
import JOB_REMOTE_WORK_FIELD from "@salesforce/schema/Job__c.Remote_Work__c";
import JOB_LOCATION_FIELD from "@salesforce/schema/Job__c.Job_Location__c";
import JOB_SKILLS_FIELD from "@salesforce/schema/Job__c.Skills__c";

import EXPERIENCE_OBJECT from "@salesforce/schema/Experience__c";
import EXPERIENCE_ID_FIELD from "@salesforce/schema/Experience__c.Id";
import EXPERIENCE_COMPANY_FIELD from "@salesforce/schema/Experience__c.Company__c";
import EXPERIENCE_DESCRIPTION_FIELD from "@salesforce/schema/Experience__c.Description__c";
import EXPERIENCE_DURATION_FIELD from "@salesforce/schema/Experience__c.Duration__c";
import EXPERIENCE_END_DATE_FIELD from "@salesforce/schema/Experience__c.End_Date__c";
import EXPERIENCE_TITLE_FIELD from "@salesforce/schema/Experience__c.Name";
import EXPERIENCE_JOB_ID_FIELD from "@salesforce/schema/Experience__c.Job__c";
import EXPERIENCE_RECORD_TYPE_ID_FIELD from "@salesforce/schema/Experience__c.RecordTypeId";
import EXPERIENCE_SKILLS_FIELD from "@salesforce/schema/Experience__c.Skills__c";
import EXPERIENCE_START_DATE_FIELD from "@salesforce/schema/Experience__c.Start_Date__c";

import getAllJobs from "@salesforce/apex/ResumeExperienceController.getAllJobs";

export default class ResumeViewMainLWR extends LightningElement {
  imageURL = IMAGES + "/TMobile.png";
  @track allJobsFormatted = [];
  @track allJobsMasterList = [];
  @track searchString = "";

  @wire(getAllJobs)
  allJobs({ error, data }) {
    if (data) {
      data.forEach((item, index) => {
        var temporaryItem = Object.assign({}, item);
        // console.log('Item: ', JSON.stringify(temporaryItem.Skills__c));
        console.log("job desc: ", item.Description__c);
        const skillsArray = item.Skills__c.split(";").sort();
        temporaryItem.Skills__c = skillsArray;
        temporaryItem.Icon__c = IMAGES + temporaryItem.Icon__c;
        this.allJobsFormatted.push(temporaryItem);
        this.allJobsMasterList.push(temporaryItem);
      });

      //console.log('all data: ', JSON.stringify(this.allJobsFormatted[0]));
    } else {
      console.log("something went wrong");
      console.log("this is an error: ", JSON.stringify(error));
    }
  }

  //This method handles all the text input entered by the user using the lightning-input
  handleTextSearch(event) {
    this.searchString = event.target.value;
    this.handleSearch();
  }

  //When someone clicks on a skill-tag, the corresponding skill is added to the searchbar
  handleSkillTagSearch(event) {
    console.log("you clicked a skill tag: " + event.detail);
    if (this.searchString == "") {
      this.searchString = event.detail;
    } else {
      this.searchString += " " + event.detail;
    }
    console.log("search string: " + this.searchString);

    this.handleSearch();
  }

  //This method is triggered anytime someone clicks on a skill-tag or modifies the contents of the searchbar
  handleSearch() {
    if (
      this.searchString == null ||
      this.searchString == "" ||
      this.searchString == undefined
    ) {
      console.log("resetting values");
      this.allJobsFormatted = this.allJobsMasterList;
    } else {
      const splitSearchString = this.searchString.split(" ");
      this.allJobsFormatted = [];
      for (var str of splitSearchString) {
        console.log("search string: ", str);

        for (var job of this.allJobsMasterList) {
          //if the job matches based on title, company name, or skill
          if (
            job.Skills__c.includes(str) ||
            job.Company_Name__c.includes(str) ||
            job.Name.includes(str)
          ) {
            //make temp job so you can manipulate its values independent of search
            var tempJob = Object.assign({}, job);

            //zero out the skills and the experiences
            tempJob.Skills__c = [];
            tempJob.Experiences__r = [];

            //loop through the experiences and add relevant ones to the list, add all skills to the list as well
            for (var exp of job.Experiences__r) {
              if (
                exp.Description__c.includes(str) ||
                exp.Name.includes(str) ||
                exp.Skills__c.includes(str) ||
                exp.Company__c.includes(str) ||
                exp.Job_Title__c.includes(str)
              ) {
                console.log("Found a match at job level");
                tempJob.Experiences__r.push(exp);
                console.log("Pushed an exp");
                tempJob.Skills__c.push(...exp.Skills__c.split(";"));
                console.log("pushed some skills");
              }
            }

            //remove duplicates from skills
            console.log("De-duped some skills");
            tempJob.Skills__c = [...new Set(tempJob.Skills__c)].sort();

            this.allJobsFormatted.push(tempJob);
            console.log("pushed a job");
          }

          //we want to check each Experience to make sure that there isn't anything there that could match
          else {
            //create a boolean value that we use to determine whether or not to add the job at the end
            var addTheJob = false;
            //make temp job so you can manipulate its values independent of search
            var tempJob = Object.assign({}, job);

            //zero out the skills and the experiences
            tempJob.Skills__c = [];
            tempJob.Experiences__r = [];

            for (var exp of job.Experiences__r) {
              if (
                exp.Description__c.includes(str) ||
                exp.Name.includes(str) ||
                exp.Skills__c.includes(str)
              ) {
                console.log("Found a match at the exp level");
                tempJob.Experiences__r.push(exp);
                tempJob.Skills__c.push(...exp.Skills__c.split(";"));
                addTheJob = true;
              }
            }

            //remove duplicates from skills
            tempJob.Skills__c = [...new Set(tempJob.Skills__c)].sort();

            if (addTheJob) {
              this.allJobsFormatted.push(tempJob);
            }
          }
        }
      }
    }
    this.allJobsFormatted = this.allJobsFormatted.sort();
  }
}