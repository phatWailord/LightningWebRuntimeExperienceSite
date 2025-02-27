public with sharing class ExperienceTriggerHandler {
    private boolean m_isExecuting = false;
    private integer BatchSize = 0;
    public static boolean IsFromBachJob ;
    public static boolean isFromUploadAPI=false;
    
    public ExperienceTriggerHandler(boolean isExecuting, integer size)
    {
        m_isExecuting = isExecuting;
        BatchSize = size;
    }
    public void onBeforeInsert(List<Experience__c> newExperiences)
    {
        

    }
    public void onAfterInsert(List<Experience__c> newExperiences)
    {
        system.debug('Experience Trigger On After Insert');
        //Recaculate the Skills on the Job__c Object
        Set<Id> jobids = ExperienceHelper.getJobIds(newExperiences);
        ExperienceHelper.updateJobSkills(jobIds);
    }
    public void onAfterUpdate( List<Experience__c> newExperiences, List<Experience__c> oldExperiences, Map<ID, Experience__c> newExperienceMap , Map<ID, Experience__c> oldExperienceMap )
    {
        system.debug('Experience Trigger On After Update');
        //Recaculate the Skills on the Job__c Object
        Set<Id> jobids = ExperienceHelper.getJobIds(newExperiences);
        ExperienceHelper.updateJobSkills(jobIds);
        
    }
    public void onBeforeUpdate( List<Experience__c> newExperiences, List<Experience__c> oldExperiences, Map<ID, Experience__c> newExperienceMap , Map<ID, Experience__c> oldExperienceMap )
    {
        system.debug('Experience Trigger On Before Update');
    }

    @future 
    public static void onAfterUpdateAsync(Set<ID> newExperienceIDs)
    {

    }      
    public boolean isTriggerContext
    {
        get{ return m_isExecuting;}
    }
    
    public boolean isVisualforcePageContext
    {
        get{ return !IsTriggerContext;}
    }
    
    public boolean isWebServiceContext
    {
        get{ return !IsTriggerContext;}
    }
    
    public boolean isExecuteAnonymousContext
    {
        get{ return !IsTriggerContext;}
    }
}