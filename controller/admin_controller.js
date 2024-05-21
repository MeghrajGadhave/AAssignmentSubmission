const AdminDB = require('../models/admin');
const bcrypt = require('bcrypt');

//create admin [for future use]
module.exports.createAdmin =async function(req,res){
    try{
        let {email,password,confirmPassword} = req.body;
        
        //password and confirm password match
        if(password != confirmPassword){
            req.flash('error',"password and confirm password not match");
            // console.log('password and confirm password not match');
            return res.redirect('back');
        }

        let admin = await AdminDB.find({});

        //check any entry already created in db then just back only one admin in db 
        if(admin.length>0){
            req.flash('error',"Only one admin allow in system");
            return res.redirect('/signin');
        }

        //encript password using bcrypt
        req.body.password = await bcrypt.hash(password,10);
    
        //create new admin
        admin = await AdminDB.create(req.body);
        
        // notification
        req.flash('success','Admin create successfully')

        return res.redirect('/signin');
    }
    catch(err){
        console.log(err);
        req.flash('error','Internal Server Error')
        return res.redirect('back');
    }
}

