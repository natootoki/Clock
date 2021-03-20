let canvas = document.getElementById('stage');
let ctx = canvas.getContext('2d');

let time = new Date();
let second = time.getUTCSeconds();
let minute = time.getUTCMinutes();
let hour = time.getHours();

let clock = {
    x:0,
    y:0,
    r:128,
    dot_r:100,
    smallDot:2,
    largeDot:4,
    mainDot:8,
    color:"#FFFFFF",
    secondHand_r:100,
    minuteHand_r:95,
    hourHand_r:60,
    secondHand_angle:2*Math.PI/60*second,
    minuteHand_angle:2*Math.PI/60*(minute+second/60),
    hourHand_angle:2*Math.PI/12*(hour+minute/60)
}

document.body.style.overflow = "hidden";

const loop = () => {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    ctx.fillStyle="#FCD7A1";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    clock.x=window.innerWidth/2;
    clock.y=window.innerHeight/2;
    time = new Date();
    second = time.getSeconds();
    minute = time.getMinutes();
    hour = time.getHours();
    clock.secondHand_angle=2*Math.PI/60*second;
    clock.minuteHand_angle=2*Math.PI/60*(minute+second/60);
    clock.hourHand_angle=2*Math.PI/12*(hour+minute/60+second/3600);

    ctx.fillStyle=clock.color;
    ctx.arc(clock.x,clock.y, clock.r, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
    ctx.fill();
    ctx.fillStyle="#000000";
    for(i=0;i<60;i++){
        ctx.beginPath();
        if(i%60==0){
            ctx.arc(clock.x+clock.dot_r*Math.sin(2*Math.PI/60*i),clock.y-clock.dot_r*Math.cos(2*Math.PI/60*i),
            clock.mainDot, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        }else if(i%5==0){
            ctx.arc(clock.x+clock.dot_r*Math.sin(2*Math.PI/60*i),clock.y-clock.dot_r*Math.cos(2*Math.PI/60*i),
            clock.largeDot, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        }else{
            ctx.arc(clock.x+clock.dot_r*Math.sin(2*Math.PI/60*i),clock.y-clock.dot_r*Math.cos(2*Math.PI/60*i),
            clock.smallDot, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
        }
        ctx.fill();
    }

    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.moveTo(clock.x,clock.y);
    ctx.lineTo(clock.x+clock.secondHand_r*Math.sin(clock.secondHand_angle),
    clock.y-clock.secondHand_r*Math.cos(clock.secondHand_angle));
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clock.x,clock.y);
    ctx.lineTo(clock.x+clock.minuteHand_r*Math.sin(clock.minuteHand_angle),
    clock.y-clock.minuteHand_r*Math.cos(clock.minuteHand_angle));
    ctx.lineWidth=4;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clock.x,clock.y);
    ctx.lineTo(clock.x+clock.hourHand_r*Math.sin(clock.hourHand_angle),
    clock.y-clock.hourHand_r*Math.cos(clock.hourHand_angle));
    ctx.lineWidth=6;
    ctx.stroke();

    window.requestAnimationFrame(loop);
}

loop();