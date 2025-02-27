public with sharing class ResumeExperienceController {

    

    @AuraEnabled(cacheable=true)
    public static List<Job__c> getAllJobs(){
        System.debug('method called');
        return [SELECT Id, Company_Name__c, Current_Full_Time_Position__c, Description__c, Duration__c, Icon__c, Name, End_Date__c, Skills__c, Start_Date__c, Job_Location__c, Remote_Work__c, 
        (SELECT Id, Company__c, Description__c, Duration__c,Job_Title__c, Name, End_Date__c, Job__c, RecordTypeId, Skills__c, Start_Date__c FROM Experiences__r  ORDER BY Start_Date__c DESC) 
        FROM Job__c   ORDER BY Start_Date__c DESC];
    }
   
}