window.search_indexes=null;
window.index_data=null;
$(function () {
    $('#main-menu').metisMenu({ toggle: true}); 

    $.getJSON("/search/search_index.json", function(data){
        if (data != null){
            window.index_data=data.docs;
            window.search_indexes = lunr(function () {
             
                this.field('title')
                this.field('body')
                this.ref('id')
                for (const key in data.docs) { 
                        const element = data.docs[key];
                        this.add({title:element.title,body:element.text,id:element.location}); 
                } 
              });
             
        }
    });

    $('#searchbox').on('shown.bs.popover', function (e) {
        // do something…
      })

    $('#searchbox').popover({html:true,title:"查询结果",trigger:"manual",placement:"bottom",template:'<div class="popover search_result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"><lable></lable></h3><div class="popover-body" id="seach_result"></div></div>'})
    $('#searchbox').on("input propertychange",function(e){ 
       $('#seach_result').empty();
       $("<div>"+$("#searchbox").val()+'</div>').appendTo($('#seach_result'));
    });
    $('#searchbox').on("focus",function(){
        
       $("<div>"+$("#searchbox").val()+'</div>').appendTo($('#seach_result'));
        $('#searchbox').popover('show')
    });
    $('#searchbox').on("blur",function(){
         $('#searchbox').popover('hide') 
    })
});