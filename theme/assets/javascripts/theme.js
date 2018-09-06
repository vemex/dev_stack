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

    $('#mkdocs-search-query').popover({html:true,title:"查询结果",trigger:"manual",content:'<div></div>',placement:"bottom",template:'<div class="popover search_result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"><lable></lable></h3><div class="popover-body" id="mkdocs-search-results"></div></div>'})
    // $('#searchbox').on("input propertychange",function(e){  
    // });
    $('#mkdocs-search-query').on("focus",function(){
        
       //$("<div>"+$("#searchbox").val()+'</div>').appendTo($('#seach_result'));
        $('#mkdocs-search-query').popover('show')
    });
    $('#mkdocs-search-query').on("blur",function(){
         $('#mkdocs-search-query').popover('hide') 
    });
    hljs.initHighlightingOnLoad();
});