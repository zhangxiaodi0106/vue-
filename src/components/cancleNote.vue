<template>
  <button class="addNote" @click.prevent="cancleNote">删除</button>
</template>
<script>
import axios from "axios";
var obj=JSON.parse(sessionStorage.getItem('User'));
export default{
    props:['id'],
    data(){
        return{
            noteId:this.id,
        }
    },
    methods:{
        cancleNote(){
            //alert(this.id);
            axios.get('/api/demo/destory/'+this.id,{
                params:{},
                headers:{BearerToken:obj.token,'Authorization':localStorage.getItem('Authorization')},
            }).then(resp => {
                    if (resp.status == "1") {
                        alert('删除成功');
                    } 
                    else  {
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

</style>
