/*
*********************************************************
Apex Class Name    : TestDataFactory
Created Date       : Feburary 20, 2024
@description       : This class contains helper methods for creating test data within all test classes in this org,
@author            : William L. Roach-Barrette
*********************************************************
*/
@isTest
public class TestDataFactory {
  /* Generates a specific number of Accounts designed to be paired with
   * Job__c and Experience__c objects.
   * @param numAccounts the number of Accounts to generate
   * @return a list of Accounts
   */
  public static List<Account> generateJobAccounts(Integer numAccounts) {
    List<Account> accts = new List<Account>();
    for (Integer i = 0; i < numAccounts; i++) {
      Account a = new Account(
        Name = getRandomName(10),
        Phone = getRandomPhoneNumber(),
        Site = getRandomWebsite()
      );
      accts.add(a);
    }

    insert accts;
    return accts;
  }

  /* Generates numJobs number of Job__c objects per Account passed as input
   *@param numJobs the number of jobs to generate
   *@param accounts the list of accounts you want jobs created for
   *@return a list of jobs
   */
  public static List<Job__c> generateJobs(
    Integer numjobs,
    List<Account> accounts
  ) {
    List<Job__c> jobs = new List<Job__c>();

    for (Account acct : accounts) {
      for (Integer i = 0; i < numJobs; i++) {
        Date startDate = getRandomDate(2000, 2020);
        jobs.add(
          new Job__c(
            Name = getRandomName(10),
            Company__c = acct.Id,
            Remote_Work__c = getRandomBoolean(),
            Start_Date__c = startDate,
            End_Date__c = getRandomDate(startDate.year(), Date.Today().year())
          )
        );
      }
    }
    insert jobs;
    return jobs;
  }

  /* Generates numExp number of Experience__c objects per Job__c passed as input
   *@param numExps number of experiences you want generated per job object
   *@param jobs list of Job__c objects you want to asscoiate Experiences__c with
   */
  public static List<Experience__c> generateExperiences(
    Integer numExps,
    List<Job__c> jobs
  ) {
    //Return List of experiences
    List<Experience__c> experiences = new List<Experience__c>();

    //Get all Experience RecordTypeIds
    List<String> experienceRecordTypeIds = new List<String>();

    for (RecordType rt : [
      SELECT Id, Name
      FROM RecordType
      WHERE SObjectType = 'Experience__c'
    ]) {
      experienceRecordTypeIds.add(rt.Id);
    }

    //Get all the Experience Skill PickList values
    List<String> allSkillOptions = new List<String>();

    Schema.DescribeFieldResult fieldResult = Experience__c.Skills__c.getDescribe();

    for (Schema.PicklistEntry fieldEntry : fieldResult.getPicklistValues()) {
      allSkillOptions.add(fieldEntry.getLabel());
    }

    for (Job__c job : jobs) {
      for (Integer i = 0; i < numExps; i++) {
        Date startDate = getRandomDate(2000, 2020);

        experiences.add(
          new Experience__c(
            RecordTypeId = experienceRecordTypeIds[
              getRandomNumber(0, experienceRecordTypeIds.size())
            ],
            Name = getRandomName(12),
            Start_Date__c = startDate,
            End_Date__c = getRandomDate(startDate.year(), Date.Today().year()),
            Job__c = job.id,
            Skills__c = allSkillOptions[
              getRandomNumber(0, allSkillOptions.size())
            ],
            Description__c = 'this is a test exp'
          )
        );
      }
    }

    insert experiences;
    return experiences;
  }

  /* Generates a string with an upper case letter at the beginning
   * and the rest of the string with a lower case letter
   * @param nameLength the length of the name to be generated
   * @return a string of the generated name
   */
  public static String getRandomName(Integer nameLength) {
    //we want to generate names with only one uppercase character
    String ucChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    //lowercase characters for the rest of the name
    String lcChars = 'abcdefghijklmnopqrstuvwxyz';

    //start the name with an uppercase character
    String randStr =
      '' + ucChars.subString(getRandomNumber(0, ucChars.length()));

    //create the rest of the name by running through the lowercase characters
    /* while (randStr.length() < nameLength - 1) {
      randStr += lcChars.subString(getRandomNumber(0, lcChars.length()));
    }*/

    return randStr;
  }

  /*Generates a string that is a legal US phone number
   *@return a string of the generated phone number
   */
  public static String getRandomPhoneNumber() {
    // Generate a random area code
    Integer areaCode = getRandomNumber(100, 999);

    // Generate a random prefix
    Integer prefix = getRandomNumber(100, 999);

    // Generate a random line number
    Integer lineNumber = getRandomNumber(1000, 9999);

    // Return the phone number as a string
    return (areaCode + '-' + prefix + '-' + lineNumber);
  }

  /*Generates passable URL
   *@return a string of the generated website
   */
  public static String getRandomWebsite() {
    String website = 'https://' + getRandomName(9) + '.com';
    return website;
  }

  /*Generates random boolean value
   *@return a random boolean value
   */
  public static Boolean getRandomBoolean() {
    Integer randomNumber = Math.round(Math.random() * 100);
    return randomNumber >= 50;
  }

  /* Generates a random number betwewen two specified points
   * @param min the minimum number to be generated
   * @param max the maximum number to be generated
   * @return a random integer between min and max
   */
  public static Integer getRandomNumber(Integer min, Integer max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  /* Generates a Date sometime between the two supplied years
   * @param startYear the minnium year to generate
   * @param endYear the maxium year to generate
   * @return a random date between the two years
   */
  public static Date getRandomDate(Integer startYear, Integer endYear) {
    Date d = Date.newInstance(
      getRandomNumber(startYear, endYear),
      getRandomNumber(1, 12),
      getRandomNumber(1, 28)
    );
    return d;
  }

  /* All methods found below this line were written for
   *the express use of completing salesforce trailheads
   */
  public static List<Account> createAccountsWithOpps(
    Integer numAccts,
    Integer numOppsPerAcct
  ) {
    List<Account> accts = new List<Account>();
    for (Integer i = 0; i < numAccts; i++) {
      Account a = new Account(Name = 'TestAccount' + i);
      accts.add(a);
    }
    insert accts;
    List<Opportunity> opps = new List<Opportunity>();
    for (Integer j = 0; j < numAccts; j++) {
      Account acct = accts[j];
      // For each account just inserted, add opportunities
      for (Integer k = 0; k < numOppsPerAcct; k++) {
        opps.add(
          new Opportunity(
            Name = acct.Name + ' Opportunity ' + k,
            StageName = 'Prospecting',
            CloseDate = System.today().addMonths(1),
            AccountId = acct.Id
          )
        );
      }
    }
    // Insert all opportunities for all accounts.
    insert opps;
    return accts;
  }
}