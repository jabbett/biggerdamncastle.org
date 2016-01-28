// Replace logged-in template with something more appropriate
Template['loggedIn'].replaces('_loginButtonsLoggedInSingleLogoutButton');

// Get all the signatures
Meteor.subscribe("signatures");
// Show the current user his details
Meteor.subscribe("currentUserData");

Template.body.helpers({
    signatures: function() {
        return Signatures.find({}, { sort: { createdAt: -1 } });
    },

    total: function() {
        return Signatures.find().count();
    }
});

Template.signature.helpers({
    name: function() {
        return this.first_name + " " + this.last_name;
    },

    dateSigned: function() {
        return this.createdAt.relative();
    }
});