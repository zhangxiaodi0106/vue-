<template>
  <div id="successNote">
      <div class="listNote">
        <div v-for="(item,index) in successNotes" :key=index class="note">
            <p>{{item.name}}</p>
            <p>{{item.job}}</p>
            <p>{{item.stime}}~{{item.etime}}</p>
            <router-link :to="{name: 'checkNote', params: {name:item.name,job:item.job,stime:item.stime,etime:item.etime,reason:item.reason,id:item.id }}">查看</router-link>
        </div>
    </div>
  </div>
</template>
<script>
var objNotes=JSON.parse(sessionStorage.getItem('Notes'));
//console.log(objNotes);
    export default{
        name: 'successNote',
        data(){
            return{
                successNotes:[],
            }
        },
        created(){
           this.allNote();
       },
        methods:{
            allNote(){
                var j=0;
                //console.log(datas);
                for( var i=0;i<objNotes.length;i++){
                    if(objNotes[i].result=='审核通过'){
                       //this.successNotes[j]=objNotes[i];
                        this.$set(this.successNotes, j, objNotes[i]);//可以相应到页面
                        //console.log(this.successNotes[j]);
                        j++;
                    }
                    
                }
                console.log(this.successNotes);
            }
        },


    }
</script>

<style scoped>
.note {
    line-height: 45px;
    font-size: 18px;
    margin: 0 auto;
    border-bottom: darkgrey 1px solid;
    padding-top: 0px;
    text-align: left;
}
.note p,a {
    display: inline;
    padding:0px 20px 0px 10px;
    position: relative;
    top: 9px;
}
.note a{
    float: right;
}
</style>
