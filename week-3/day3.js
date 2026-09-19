$(document).ready(function(){
    $("#btn").click(function(){
        let div = $("#box");
        div.animate({top:"20vh", left:"70vw", width:"80px", height:"80px", backgroundColor:"teal"}, 1000);
        div.animate({top:"50vh", left:"20vw", width:"150px", height:"150px", backgroundColor:"orange"}, 3000);
        div.animate({top:"75vh", left:"60vw", width:"60px", height:"60px", backgroundColor:"pink"}, 3000);
        div.animate({top:"15vh", left:"10vw", width:"180px", height:"180px", backgroundColor:"navy"}, 1000);
        div.animate({top:"40vh", left:"75vw", width:"70px", height:"70px", backgroundColor:"lime"}, 3000);
        div.animate({top:"10vh", left:"5vw", width:"200px", height:"200px", backgroundColor:"crimson"}, 3000);
    });
});