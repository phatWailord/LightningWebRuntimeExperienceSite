public with sharing class ResumePDFHelper {
  public List<Job__c> allJobs { get; set; }
  public Map<Job__c, List<Experience__c>> allJobsMap { get; set; }
  public List<String> allSkills { get; set; }
  public List<Job__c> allJobsShort { get; set; }
  public Map<Job__c, List<Experience__c>> allJobsMapShort { get; set; }
  public List<String> allSkillsShort { get; set; }

  public ResumePDFHelper() {
    allJobs = [
      SELECT
        Id,
        Company_Name__c,
        Current_Full_Time_Position__c,
        Description__c,
        Duration__c,
        Icon__c,
        Name,
        End_Date__c,
        Skills__c,
        Start_Date__c,
        Job_Location__c,
        Remote_Work__c,
        Formatted_Start_Date__c,
        Formatted_End_Date__c,
        (
          SELECT
            Id,
            Company__c,
            Description__c,
            Duration__c,
            Job_Title__c,
            Name,
            End_Date__c,
            Job__c,
            RecordTypeId,
            Skills__c,
            Start_Date__c
          FROM Experiences__r
          ORDER BY Start_Date__c DESC
          LIMIT 5
        )
      FROM Job__c
      ORDER BY Start_Date__c DESC
    ];
    allJobsMap = new Map<Job__c, List<Experience__c>>();
    allJobsShort = new List<Job__c>();
    allJobsMapShort = new Map<Job__c, List<Experience__c>>();
    allSkillsShort = new List<String>();
    Set<String> tempAllSkills = new Set<String>();
    Set<String> tempAllSkillsShort = new Set<String>();
    Integer i = 0;

    for (Job__c job : allJobs) {
      tempAllSkills.addAll(job.Skills__c.split(';'));

      allJobsMap.put(job, job.Experiences__r);
      if (i < 3) {
        List<Experience__c> shortExps = new List<Experience__c>();
        Job__c tempjob = job;
        for (Integer j = 0; (j < 3 && j < job.Experiences__r.size()); j++) {
          shortExps.add(job.Experiences__r[j]);
          tempAllSkillsShort.addAll(job.Skills__c.split(';'));
        }
        allJobsShort.add(job);
        allJobsMapShort.put(job, shortExps);
        i++;
      }
    }
    allSkills = new List<String>(tempAllSkills);
    allSkills.sort();
    allSkillsShort = new List<String>(tempAllSkillsShort);
    allSkillsShort.sort();
  }

  @AuraEnabled
  public static Blob generateOnePagePDF() {
    PageReference pdfPage = new PageReference('/apex/ResumeOnePagePDF');
    Blob pdfBlob = pdfPage.getContentAsPDF();
    return pdfBlob;
  }
}