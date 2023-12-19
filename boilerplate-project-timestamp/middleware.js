const { parse } = require("dotenv");

const parseDate=function(req,res,next){
    const {date}=req.params;
    if(!date){
        const dt=new Date();
        const UTCdate=dt.toUTCString(); 
        const timestamp=dt.getTime();
        const djson={unix: timestamp, utc: UTCdate};
        res.json(djson);
        next();
    }

    let dt=new Date(date);
    if(!dt.getTime()){
        dt=new Date(parseInt(date));
    }
    if(!dt.getTime()){
        res.json({error : "Invalid Date"});
        next();
    }
    const UTCdate=dt.toUTCString(); 
    const timestamp=dt.getTime();
    const djson={unix: timestamp, utc: UTCdate};
    res.json(djson);
    next();
};

module.exports=parseDate;