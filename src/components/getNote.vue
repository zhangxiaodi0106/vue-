<template>
  <div id="getNote">
    
    <div class="listNote">
        <div v-for="(item,index) in notes" :key=index class="note">
            <p>{{item.name}}</p>
            <p>{{item.job}}</p>
            <p>{{item.stime}}~{{item.etime}}</p>
            <router-link :to="{name: 'checkNote', params: {name:item.name,job:item.job,stime:item.stime,etime:item.etime,reason:item.reason,id:item.id }}">查看</router-link>
        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
var obj=JSON.parse(sessionStorage.getItem('User'));
export default {
    data(){
        return{
           notes:JSON.parse(sessionStorage.getItem('Notes')),
          
        }
    },
    created(){
        this.getNote();
    },
    methods:{
        getNote(){
            axios.get('/api/demo/listnotes',{
                params:{},
                headers:{BearerToken:obj.token,'Authorization':localStorage.getItem('Authorization')},
            }).then(resp => {
                    console.log(resp);
                    //this.notes=resp.data;
                    if (resp) {
                        //alert('获取成功');
                        sessionStorage.setItem('Notes', JSON.stringify(resp));
                        //console.log(JSON.parse(sessionStorage.getItem('Notes')));
                        this.$emit('sendNote',resp);
                    } else if (resp.status == "400") {
                        alert(resp.data.data);
                    }
                }).catch(error => {
                alert('未知错误');
                console.log(error); 
            });
            },
    }
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
