import http from 'http';
http.get('http://127.0.0.1:4000/health',(res)=>{
    if(res.statusCode === 200){
         console.log("server is running successfully");
         process.exit(0)
    }
    else{
      console.log("server is not running successfully");
      process.exit(1);
    }

});