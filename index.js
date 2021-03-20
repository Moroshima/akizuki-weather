/*获取天气的Ajax请求主体函数*/
function ajaxGet(cityName)
{
$.ajax    //获取城市对应ID
    ({
        url:`https://geoapi.qweather.com/v2/city/lookup?location=${cityName}&key=58be365a356d42e2ae0fc80432bb426e`,
        type:"get",
        success:function(data)
        {
            console.log(data);
            if(data.code==200)
            {
                var uid=data.location[0].id;
                //console.log(uid);
                document.getElementById("locationName").innerHTML=`${data.location[0].name}`;

                $.ajax    //通过城市对应ID查询未来7天的天气
                ({
                    url:`https://api.qweather.com/v7/weather/15d?location=${uid}&key=f8567439d3d14b34a3b282fa0c673c4b`,
                    type:"get",
                    success:function(weather)
                    {
                        console.log(weather);
                        leftMainBlockPut(weather);
                        rightMainBlockPut(weather);
                    },
                    error:function(error)
                    {
                        console.log(error);
                    }
                });

                $.ajax    //通过城市对应ID查询未来24小时的天气
                ({
                    url:`https://api.qweather.com/v7/weather/24h?location=${uid}&key=f8567439d3d14b34a3b282fa0c673c4b`,
                    type:"get",
                    success:function(perHour)
                    {
                        console.log(perHour);
                        bottomRefresh(perHour);
                        loadToChart(perHour);
                    },
                    error:function(error)
                    {
                        console.log(error);
                    }
                });

                $.ajax    //获取实时天气
                ({
                    url:`https://api.qweather.com/v7/weather/now?location=${uid}&key=f8567439d3d14b34a3b282fa0c673c4b`,
                    type:"get",
                    success:function(weather)
                    {
                        console.log(weather);
                        nowLoad(weather);
                        changePic(weather);
                    },
                    error:function(error)
                    {
                        console.log(error);
                    }
                });
            }
            else if(data.code==400){
                alert("您尚未输入任何内容！");
            }
            else if(data.code==404){
                alert("请检查您输入的地址是否正确！")
            }
        },
        error:function(error)
        {
            console.log(error);
        }
    });
}

/*将输入的日期利用基姆拉尔森计算公式转化为星期*/
function CaculateWeekDay(y,m,d)
{
    if(m==1) m=13;
    if(m==2) m=14;
    var week=(d+2*m+3*(m+1)/5+y+y/4-y/100+y/400)%7;
    //console.log(week);
    var weekstr="";
        switch(Math.round(week))
        {
            case 0: weekstr="星期日"; break;
            case 1: weekstr="星期一"; break;
            case 2: weekstr="星期二"; break;
            case 3: weekstr="星期三"; break;
            case 4: weekstr="星期四"; break;
            case 5: weekstr="星期五"; break;
            case 6: weekstr="星期六"; break;
            case 7: weekstr="星期日"; break;
        }
    //console.log(weekstr);
    return weekstr;
}