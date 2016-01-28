BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowOriginForAll("https://connect.facebook.net/");
BrowserPolicy.content.allowOriginForAll("https://code.jquery.com/");

// Deny all client-side updates on the Signatures collection
Signatures.deny({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    }
});

// Deny all client-side updates to user documents
Meteor.users.deny({
    update: function() { return true; }
});

Meteor.publish("signatures", function() {
    return Signatures.find();
});

Meteor.publish("currentUserData", function() {
    return Meteor.users.find({ _id: this.userId });
});

// When you create yourself as a user, you automatically "sign" the petition
Accounts.onCreateUser(function(options, user) {
    if (!user.services.facebook) {
        throw new Error("Only Facebook login is allowed.");
    }

    Signatures.insert({
        createdAt:            new Date(),
        owner:                Meteor.userId(),
        first_name:           user.services.facebook.first_name,
        last_name:            user.services.facebook.last_name,
        gender:               user.services.facebook.gender,
        facebook_profile_url: user.services.facebook.link,
        email:                user.services.facebook.email
    });

    return user;
});