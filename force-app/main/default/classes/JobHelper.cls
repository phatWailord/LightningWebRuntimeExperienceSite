public with sharing class JobHelper {
    public static Boolean isCurrentlyEmployed(){
        List<Job__c> experiences = [SELECT ID FROM Job__c WHERE End_Date__c = null];
        Boolean returnVar = false;
        if(experiences.size() == 0){
            returnVar = true;
        }
        return returnVar;
    }

}