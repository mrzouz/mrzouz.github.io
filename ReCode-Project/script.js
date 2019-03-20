let timeOfDay;

const keepRunning = () =>{
    let date = new Date();
    let month = date.getMonth();
    let today = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes(); 
    let seconds = date.getSeconds();
    timeOfDay = hours;
// calc remining days to first May. -- today is considered 0
const daysfunc = () =>{
    const yearDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    let days = 0;
    let test=month;
    while ( test < 4){
       days +=yearDays[test];
       test++;
    }
    if (month < 4){
       let daysLeft = days - today;
       return daysLeft;
    } else if (month === 4){
        return 'May is finally Here and the fun is about to start!!';
    } else {
        return 'this counter has served its noble mission';
    }
}
//calc remaining time until tomorrow.
const timefunc = () =>{
    let h = 23 - hours;
    let m = 59 - minutes;
    let s = 59 - seconds;
    h<10?h='0'+h:h;
    m<10?m='0'+m:m;
    s<10?s='0'+s:s;
    return `${h}:${m}:${s}`
}
//change output based on days remaining.
if(typeof(daysfunc())=== 'number'){
    document.querySelector('.timer').textContent = `${daysfunc()} Days and ${timefunc()}  left until May`;
    } else{
      document.querySelector('.timer').textContent = daysfunc();
    }
//restart after 1 sec to keep refreshing.    

}

setInterval(keepRunning, 1000);

keepRunning();

// change background by time
const bgByTime=()=>{
    document.querySelector('.dynamic').classList.remove('morning');
    document.querySelector('.dynamic').classList.remove('sunset');
    document.querySelector('.dynamic').classList.remove('evening');
    document.querySelector('.dynamic').classList.remove('night');

    if (timeOfDay >=7 && timeOfDay<=17){
        document.querySelector('.dynamic').classList.add('morning');
    } else if(timeOfDay >=18 && timeOfDay<=19){
        document.querySelector('.dynamic').classList.add('sunset');
    } else if(timeOfDay >=20 && timeOfDay<=21){
        document.querySelector('.dynamic').classList.add('evening');
    } else {
        document.querySelector('.dynamic').classList.add('night');
    }    
}
setInterval(bgByTime, 1000*60*60);
bgByTime();





//toggle btn functionality.
document.querySelector('.btn-toggle').addEventListener('click', function(){
    //remove to ensure no duplicates.
    document.querySelector('.dynamic').classList.remove('morning');
    document.querySelector('.dynamic').classList.remove('sunset');
    document.querySelector('.dynamic').classList.remove('evening');
    document.querySelector('.dynamic').classList.remove('night');
    //start the changes with setTimeout for waiting.
    document.querySelector('.dynamic').classList.add('morning');
    //first callback wait
    setTimeout(function()
    {
    document.querySelector('.dynamic').classList.remove('morning');
    document.querySelector('.dynamic').classList.add('sunset');
    //second callback wait
        setTimeout(function()
        {
            document.querySelector('.dynamic').classList.remove('sunset');
            document.querySelector('.dynamic').classList.add('evening');
            //third callback wait
            setTimeout(function()
            {
                document.querySelector('.dynamic').classList.remove('evening');
                document.querySelector('.dynamic').classList.add('night');
                //fourth callback wait with time
                setTimeout(bgByTime, 3000);
                //time for third
            }, 3000);
        //time for second
        }, 3000);
        //time for first
    }, 3000);
});


