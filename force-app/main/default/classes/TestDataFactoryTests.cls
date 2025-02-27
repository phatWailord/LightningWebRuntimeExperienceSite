/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 *
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@isTest
public class TestDataFactoryTests {
  @isTest
  static void getRandomNumberTest() {
    Integer minnium = 0;
    Integer maxium = 1000;
    Test.startTest();
    Integer test1 = TestDataFactory.getRandomNumber(minnium, maxium);
    Integer test2 = TestDataFactory.getRandomNumber(minnium, maxium);
    Integer test3 = TestDataFactory.getRandomNumber(minnium, maxium);
    Test.stopTest();
    System.assert(
      test1 >= minnium && test1 <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test1
    );
    System.assert(
      test2 >= minnium && test1 <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test2
    );
    System.assert(
      test3 >= minnium && test1 <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test3
    );
  }

  @isTest
  static void getRandomDateTest() {
    Integer minnium = 2000;
    Integer maxium = 2024;
    Test.startTest();
    Date test1 = TestDataFactory.getRandomDate(minnium, maxium);
    Date test2 = TestDataFactory.getRandomDate(minnium, maxium);
    Date test3 = TestDataFactory.getRandomDate(minnium, maxium);
    Test.stopTest();
    System.assert(
      test1.year() >= minnium && test1.year() <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test1
    );
    System.assert(
      test2.year() >= minnium && test1.year() <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test2
    );
    System.assert(
      test3.year() >= minnium && test1.year() <= maxium,
      'test1 not inside proper min (' +
        minnium +
        ') max (' +
        maxium +
        ') bounds: ' +
        test3
    );
  }

  @isTest
  static void getRandomWebsiteTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void getRandomBooleanTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void getRandomPhoneNumberTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void getRandomNameTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void generateJobAccountsTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void generateJobsTest() {
    // TO DO: implement unit test
  }

  @isTest
  static void generateExperiencesTest() {
    // TO DO: implement unit test
  }
}