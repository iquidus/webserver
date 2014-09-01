var assert = require('assert');
var async = require('async');
var database = require('./database');

exports.index = function(req, res, next) {
    var user = req.user;
    assert(user.admin);

    database.getSiteStats(function(err, results) {
        if (err)
            return next(new Error('Unable to get site stats: ' + err));

        res.render('stats', {user: user, stats: results});
    });
};

exports.cleanGames = function(req, res) {
    var user = req.user;
    assert(user.admin);

    database.cleanGames(function(err, result){
        if (err) {
            console.error('[INTERNAL_ERROR] unable to clean games got ' + err);
            return res.render('error');
        }
        res.send('Cleaned ' + result + ' games...');
    });
};

exports.giveAway = function(req, res) {
    var user = req.user;
    assert(user.admin);

    res.render('giveaway', {user: user});
};

exports.giveAwayHandle = function(req, res, next) {
    var user = req.user;
    assert(user.admin);

    var giveAwayUsers = req.body.users.split(/\s+/);
    var bits = parseFloat(req.body.bits);

    if (!Number.isFinite(bits) || bits <= 0)
        return next(new Error('problem with bits...'));

    var satoshis = Math.round(bits * 100);

    database.addRawGiveaway(giveAwayUsers, satoshis , function(err, ret) {
        if (err) return res.redirect('/aDm1n-giveaway?err=' + err);

        res.redirect('/aDm1n-giveaway?m=Done');

    });
};