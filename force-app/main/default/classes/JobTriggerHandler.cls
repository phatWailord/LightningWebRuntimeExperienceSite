public with sharing class JobTriggerHandler {
    private boolean m_isExecuting = false;
    private integer BatchSize = 0;
    public static boolean IsFromBachJob ;
    public static boolean isFromUploadAPI=false;
    
    public JobTriggerHandler(boolean isExecuting, integer size)
    {
        m_isExecuting = isExecuting;
        BatchSize = size;
    }
    public void OnBeforeInsert(List<Job__c> newJobs)
    {
        Boolean isCurrentlyEmployed = JobHelper.isCurrentlyEmployed();
        for(Job__c exp :newJobs){
            if(exp.End_Date__c == null && isCurrentlyEmployed){
                exp.adderror('Warning, End Date cannot be blank, please add end date to existing job(s) first.');

            }
        }

    }
    public void OnAfterInsert(List<Job__c> newJobs)
    {
        system.debug('Job Trigger On After Insert');
    }
    public void OnAfterUpdate( List<Job__c> newJobs, List<Job__c> oldJobs, Map<ID, Job__c> newJobMap , Map<ID, Job__c> oldJobMap )
    {
        system.debug('Job Trigger On After Update');
        
    }
    public void OnBeforeUpdate( List<Job__c> newJobs, List<Job__c> oldJobs, Map<ID, Job__c> newJobMap , Map<ID, Job__c> oldJobMap )
    {
        system.debug('Job Trigger On Before Update');
    }

    @future 
    public static void OnAfterUpdateAsync(Set<ID> newJobIDs)
    {

    }      
    public boolean IsTriggerContext
    {
        get{ return m_isExecuting;}
    }
    
    public boolean IsVisualforcePageContext
    {
        get{ return !IsTriggerContext;}
    }
    
    public boolean IsWebServiceContext
    {
        get{ return !IsTriggerContext;}
    }
    
    public boolean IsExecuteAnonymousContext
    {
        get{ return !IsTriggerContext;}
    }
}