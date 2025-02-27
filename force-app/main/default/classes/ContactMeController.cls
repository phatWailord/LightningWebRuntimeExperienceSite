global class ContactMeController {

    @AuraEnabled
    public static void createLead(String firstName, String lastName, 
                                    String company, String email, String description) {
        Lead lead = new Lead();

        lead.firstName = firstName;
        lead.lastName = lastName;
        lead.Company = company;
        lead.Email = email;
        lead.Description = description;

        insert lead;                
    }
}