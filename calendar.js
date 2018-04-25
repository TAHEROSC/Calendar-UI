var datepicker_ui_control = function(options){
    /*
     * Variables accessible
     * in the class
     */
    var currentDate;
    var currentYear;
    var currentDay;
    var currentDayNumber;
    var currentMonth;
    var weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthsName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var weekLetters = ["S","M","T","W","Th","F","S"];
    var startDate = "";
    var startCtrl;
    var endDate = "";
    var endCtrl;
    var step = 0;
    var minDate;
    var maxDate;
    var vars = {
        myVar  : 'original Value'
    };
 
    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;
 
    /*
     * Constructor
     */
    this.construct = function(options){

        minDate = new Date(options.minDate);
        maxDate = new Date(options.maxDate);

        currentDate = new Date();
        currentYear = new Date().getFullYear();
        currentDay = new Date().getDay();
        currentDayNumber = new Date().getDate();
        currentMonth = new Date().getMonth();

        $.extend(vars , options);
        $("body").append("<div class='datepicker_background'></div>");
        $(".datepicker_background").append($('<div>', {class: 'datepicker_wrapper'}));
        $(".datepicker_wrapper").append($('<div>', {class: 'datepicker_top_wrapper'}));
        // CLOSE BUTTON
        $(".datepicker_wrapper").append($('<div>', {class: 'datepicker_close_button'}));
        $(".datepicker_close_button").html("x");

        $(".datepicker_top_wrapper").append($('<div>', {class: 'datepicker_year'}));

        $(".datepicker_year").append($('<select class="datepicker_year_input">'));
        var tmpyear = currentYear+50;
        for (var yi = 0; yi < 100; yi++)
        {
             $(".datepicker_year_input").append($('<option>', {value: tmpyear, text: tmpyear, class: "select-items"}));
             tmpyear--;
        }
        $(".datepicker_year_input").change(function(){
            currentYear = $(this).val();
            changeMonth(currentYear,currentMonth);
        });

        $(".datepicker_top_wrapper").append($('<div>', {class: 'datepicker_day_wrapper'}));
        $(".datepicker_day_wrapper").append($('<div>', {class: 'datepicker_day_name'}));

        $(".datepicker_day_name").html(weekDay[currentDay]);

        $(".datepicker_day_wrapper").append($('<div>', {class: 'datepicker_day_number'}));
        $(".datepicker_day_number").html(currentDayNumber);

        $(".datepicker_wrapper").append($('<div>', {class: 'datepicker_month_wrapper'}));
        /* LEFT MONTH SELECTOR */
        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_month_left_selector'}));
        $(".datepicker_month_left_selector").html("<span class='month_select_control'><</span>");
        $(".datepicker_month_left_selector").click(function (){
            currentMonth--;
            changeMonth(currentYear,currentMonth);
        });

        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_month_name'}));
        $(".datepicker_month_name").html(monthsName[currentMonth]);
        /* RIGHT MONTH SELECTOR */
        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_month_right_selector'}));
        $(".datepicker_month_right_selector").html("<span class='month_select_control'>></span>");
        $(".datepicker_month_right_selector").click(function (){
            currentMonth++;
            changeMonth(currentYear,currentMonth);
        });

        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_month_days_wrapper'}));
        
        for(var i=0;i<weekLetters.length;i++){
            var classTmpName = weekLetters[i] + "_calendar_day";
            $(".datepicker_month_days_wrapper").append($('<div>', {class: classTmpName}));
            $("."+classTmpName).html(weekLetters[i]);
            $("."+classTmpName).addClass("datepicker_month_week_day")
        }


        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_month_days_numbers_wrapper'}));
        changeMonth(currentYear, currentMonth);

        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_start_date'}));
        $(".datepicker_start_date").html("<span class='date_title'>Start Date:</span>");

        $(".datepicker_month_wrapper").append($('<div>', {class: 'datepicker_end_date'}));
        $(".datepicker_end_date").html("<span class='date_title'>End Date:</span>");

    };


    var changeMonth = function(year,month){
        updateDate(new Date(year,month,currentDay));
        $(".datepicker_month_days_numbers_wrapper").empty();
        $(".datepicker_month_name").html(monthsName[currentMonth]);
        var firstDay = new Date(year, month, 1).getDay();
        var lastDay = new Date(year, month + 1, 0).getDate();
        var start = false;
        var dayOfMonth = 1;
        for(var i=0; i<35;i++){
            $(".datepicker_month_days_numbers_wrapper").append($('<div>', {class: 'datepicker_month_day_control', id : "day_"+i}));
            if(firstDay == i || start==true){
                $("#day_"+i).html("<span class='day_selector' data-badge='"+dayOfMonth+"'>" + dayOfMonth + "</span>");
                var dateTmp = new Date(year, month, dayOfMonth);
                $("#day_"+i).prop("data",dateTmp);
                start=true;
                if(dayOfMonth == lastDay){ dayOfMonth=0; start=false; }
                dayOfMonth++;
            }
        }
        //  DAY OF THE MONTH HANDLER
        $(".datepicker_month_day_control").click(function(){ 
            updateDate(new Date($(this).prop("data")));
            selectDate(new Date($(this).prop("data")),this);
        });
    };

     /*
     * This function update date
     */
    var updateDate = function(tmpDate){

        if(tmpDate > minDate & tmpDate < maxDate){
            currentYear = tmpDate.getFullYear();
            currentMonth = tmpDate.getMonth();
            currentDay = tmpDate.getDay();
            currentDayNumber = tmpDate.getDate();

            $(".datepicker_day_name").html(weekDay[currentDay]);
            $(".datepicker_day_number").html(currentDayNumber);
            $(".datepicker_year_input").val(currentYear);
        }
    };

    var selectDate = function(tmpDate , day){
        if(step == 0){
            $(startCtrl).removeClass("active");
            startDate = tmpDate;
            startCtrl = $(day);
              $(".datepicker_start_date").html("<span class='date_title'>Start Date:</span> "+tmpDate.toDateString());
        }else if(step == 1){
            $(endCtrl).removeClass("active");
            endDate = tmpDate;
            endCtrl = $(day);
            $(".datepicker_end_date").html("<span class='date_title'>End Date:</span> "+tmpDate.toDateString());
        }
        $(day).addClass("active");
        step++;
        if (step == 2) { step=0;};
    };
 
    /*
     * Public method
     * Can be called outside class
     */
    this.myPublicMethod = function(){
        console.log(vars.myVar);
 
        myPrivateMethod();
    };
 
    /*
     * Private method
     * Can only be called inside class
     */
    var myPrivateMethod = function() {
        console.log('accessed private method');
    };
 
 
    /*
     * Pass options when class instantiated
     */
    this.construct(options);

}