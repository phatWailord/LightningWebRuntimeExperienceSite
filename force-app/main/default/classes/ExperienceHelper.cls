public with sharing class ExperienceHelper {


    public static Set<Id> getJobIds(List<Experience__c> exps){
        Set<Id> jobIds = new Set<Id>();

        for(Experience__c exp :exps){
            jobIds.add(exp.Job__c);
        }
        return jobIds;

    }

    public static void updateJobSkills(Set<Id> jobIds){
        List<Job__c> jobs = [SELECT Id, Skills__c, (SELECT ID, Skills__c FROM Experiences__r) FROM Job__c WHERE Id IN :jobIds WITH SECURITY_ENFORCED];

        for(Job__c job :jobs){
            Set<String> tempskills = new Set<String>();

            for(Experience__c exp :job.Experiences__r){
                tempskills.addAll(exp.Skills__c.split(';'));
            }
            job.Skills__c = String.join(tempSkills, ';');
        }
            update jobs;

    }
  


}