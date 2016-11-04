/**
 * Created by dell on 16-8-1.
 */
$(document).ready(function(){

    a();

});
function t(){
    $('#t').submit(function () {
        //code goes here
        return false;
    });
}
function q(){
    var a=$("#s").html();
    var c = JSON.parse(a);
    return c;
}
function a(){
    var add = q();
    for(var i=add.length-1;i>=0;i--){
        var number = Number(add[i].count);
        var num=$("#"+(i)+" .amount").val(number)
        bind_add_reduce(i,num);
    }
}
function bind_add_reduce(i){
    $("#"+(i)+" .reduce_count, #"+(i)+" .add_count").click(function (event){
        var num=(event.target.className== "add_count")? 1:-1;
        var counts=$("#"+i+" .amount").val();
        var number=Number(counts)+num;
        if(number>0){
            $("#"+i+" .amount").val(number);
        }
        if(number==0){
            $("#"+i+" .amount").val(number);
        }
    });
}
$(function(){
    //展示层
    function showLayer(id){
        var layer = $('#'+id),
            layerwrap = layer.find('.hw-layer-wrap');
        layer.fadeIn();
        //屏幕居中
        layerwrap.css({
            'margin-top': -layerwrap.outerHeight()/2
        });
    }
    //隐藏层
    function hideLayer(){
        $('.hw-overlay').fadeOut();
    }
    $('.hwLayer-ok,.hwLayer-cancel,.hwLayer-close').on('click', function() {
        hideLayer();
    });

    //触发弹出层
    $('.show-layer').on('click',  function() {
        var layerid = $(this).data('show-layer');
        showLayer(layerid);
    });

    //点击或者触控弹出层外的半透明遮罩层，关闭弹出层
    $('.hw-overlay').on('click',  function(event) {
        if (event.target == this){
            //hideLayer()
        }
    });

    //按ESC键关闭弹出层
    $(document).keyup(function(event) {
        if (event.keyCode == 27) {
            playHome();
        }
    });
});
/*function del_row(i){
        $("#"+i+" .delate_button").click(function (){
            $("#"+i+"").remove();
        })

}*/

/*var xmlhttp;

function loadXMLDoc()
{
    xmlhttp=null;
    if (window.XMLHttpRequest)
    {// code for IE7, Firefox, Mozilla, etc.
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {// code for IE5, IE6
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null)
    {
        xmlhttp.onreadystatechange=onResponse;
        xmlhttp.open("GET",/example/xmle/cd_catalog.xml,true);
        xmlhttp.send(null);
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
}

function onResponse()
{
    if(xmlhttp.readyState!=4) return;
    if(xmlhttp.status!=200)
    {
        alert("Problem retrieving XML data");
        return;
    }

    txt="<table border='1'>";
    x=xmlhttp.responseXML.documentElement.getElementsByTagName("CD");
    for (i=0;i<x.length;i++)
    {
        txt=txt + "<tr>";
        xx=x[i].getElementsByTagName("TITLE");
        {
            try
            {
                txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
            }
            catch (er)
            {
                txt=txt + "<td> </td>";
            }
        }
        xx=x[i].getElementsByTagName("ARTIST");
        {
            try
            {
                txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
            }
            catch (er)
            {
                txt=txt + "<td> </td>";
            }
        }
        txt=txt + "</tr>";
    }
    txt=txt + "</table>";
    document.getElementById('copy').innerHTML=txt;
}*/

