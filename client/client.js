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

Meteor.startup(function() {

    skel
        .breakpoints({
            xlarge: '(max-width: 1680px)',
            large:  '(max-width: 1280px)',
            medium: '(max-width: 980px)',
            small:  '(max-width: 736px)',
            xsmall: '(max-width: 480px)'
        });

    var $body = $('body'),
        $header = $('#header');

    // Mobile?
    if (skel.vars.mobile)
        $body.addClass('is-mobile');
    else
        skel
            .on('-medium !medium', function() {
                $body.removeClass('is-mobile');
            })
            .on('+medium', function() {
                $body.addClass('is-mobile');
            });

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
        $.prioritize(
            '.important\\28 medium\\29',
            skel.breakpoint('medium').active
        );
    });

    $('.scrolly')
        .scrolly({
            speed:  1500,
            offset: $header.outerHeight()
        });

});