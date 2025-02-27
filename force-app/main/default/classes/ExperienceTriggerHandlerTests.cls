@IsTest
public with sharing class ExperienceTriggerHandlerTests {
  @isTest
  static void makeData() {
    List<Account> accts = TestDataFactory.createJobAccounts(5);
      
      for(Account account :accts){
          System.debug(account);
      }
  }
    
  
}