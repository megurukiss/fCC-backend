
const parseDate=function(req,res,next){
    const {date}=req.params;
    if(!date){
        const dt=new Date();
        const UTCdate=dt.toUTCString(); 
        const timestamp=dt.getTime();
        const djson={unix: timestamp, utc: UTCdate};
        return res.json(djson);
        
    }

    let dt=new Date(date);
    if(!dt.getTime()){
        dt=new Date(parseInt(date));
    }
    if(!dt.getTime()){
        return res.json({error : "Invalid Date"});
    }
    const UTCdate=dt.toUTCString(); 
    const timestamp=dt.getTime();
    const djson={unix: timestamp, utc: UTCdate};
    return res.json(djson);
};

module.exports=parseDate;