window.search_indexes = null;
window.index_data = null;
hljs.initHighlightingOnLoad();

$(function () {
    // var htmlWidth = $('html').css('width');
    // htmlWidth = htmlWidth.substr(0, htmlWidth.length - 2);
    if (window.devicePixelRatio <=1 ) {
        $('html').css({ 'font-size': '14px' })
        // if (Number.parseInt(htmlWidth) > 1440) {
        //     $('html').css({ 'font-size': '14px' })
        // } else if (Number.parseInt(htmlWidth) > 2550) {
        //     $('html').css({ 'font-size': '16px' })
        // }else {
        //     $('html').css({ 'font-size': '12px' })
        // }
    }  

    $('#main-menu').metisMenu({ toggle: true });

    // $.getJSON("/search/search_index.json", function(data){
    //     if (data != null){
    //         window.index_data=data.docs;
    //         window.search_indexes = lunr(function () {

    //             this.field('title')
    //             this.field('body')
    //             this.ref('id')
    //             for (const key in data.docs) { 
    //                     const element = data.docs[key];
    //                     this.add({title:element.title,body:element.text,id:element.location}); 
    //             } 
    //           });

    //     }
    // });

    $('#searchbox').on('shown.bs.popover', function (e) {
        // do something…
    })

    $('#mkdocs-search-query').popover({ html: true, title: "查询结果", trigger: "manual", content: '<div></div>', placement: "bottom", template: '<div class="popover search_result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"><lable></lable></h3><div class="popover-body" id="mkdocs-search-results"></div></div>' })
    // $('#searchbox').on("input propertychange",function(e){  
    // });
    $('#mkdocs-search-query').on("focus", function () {

        //$("<div>"+$("#searchbox").val()+'</div>').appendTo($('#seach_result'));
        $('#mkdocs-search-query').popover('show')
    });

    $('#btn-set-big').on('click', function () {
        $('html').css({ 'font-size': '16px' })

    });
    $('#btn-set-normal').on('click', function () {
        $('html').css({ 'font-size': '14px' })

    });
    $('#btn-set-small').on('click', function () {
        $('html').css({ 'font-size': '12px' })
    });
    $('#mkdocs-search-query').on("blur", function () {
        var div = document.getElementById("mkdocs-search-results");
        var x = event.clientX;
        var y = event.clientY;
        var divx1 = div.offsetLeft;
        var divy1 = div.offsetTop;
        var divx2 = div.offsetLeft + div.offsetWidth;
        var divy2 = div.offsetTop + div.offsetHeight;
        if (!(x < divx1 || x > divx2 || y < divy1 || y > divy2)) {
            return;
        }
        $('#mkdocs-search-query').popover('hide')
    });
});